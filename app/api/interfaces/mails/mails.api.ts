"use server";
import { sql } from "@vercel/postgres";
import { IsReadStates, Mail } from "./types";
import { MailForm } from "./schema";
import { Resend } from "resend";
import { MailDuplicateEmailTemplate } from "@/app/emails/mailDuplicate";
import { convertChatIds, sendParsedDataToChats } from "./utils";

export async function getMails() {
  try {
    const request = await sql<Mail>`SELECT * FROM mails
                                    ORDER BY created_at DESC`;
    return request.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong on getting users");
  }
}


const resend = new Resend(process.env.RESEND_API_KEY);

export async function createMail(formData: MailForm) {
  try {
    const { name, phone, email, comment, region } = formData;

    await sql`
    INSERT INTO mails (name, phone, email, comment, region)
    VALUES(${name}, ${phone}, ${email} , ${comment} , ${region})
    `;

    try {
      await resend.emails.send({
        from: "Pro Legal Solutions <onboarding@resend.dev>",
        to: ["legal.solutions.dev@gmail.com"],
        subject: "Hello world",
        text: "",
        react: MailDuplicateEmailTemplate({
          name: String(formData.name),
          phone: String(formData.phone),
          email: String(formData.email),
          comment: String(formData.comment),
          region: String(formData.region),
        }),
      });
    } catch (error) {
      console.log(error);
    }

    const tgIds = await getChatIds()

    await sendParsedDataToChats(formData, convertChatIds(tgIds));
    
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create mail");
  }
}

export async function getChatIds() {
  try {
    const response = await sql<{ chat_id: string }>`SELECT chat_id FROM telegram_admins`
    return response.rows
  } catch (error) {
    throw new Error("Failed getting chat ids");
  }
}

export async function changeMailStatus(id: number, newStatus: IsReadStates) {
  try {
    await sql`UPDATE mails
              SET is_read=${newStatus}
              WHERE id=${id}
              `;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to change mail status");
  }
}

export async function deleteMail(id: number) {
  try {
    await sql`DELETE FROM mails
              WHERE id=${id}
              `;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete mail");
  }
}

// TODO: rename
const orderMapper = (relevance: string, mailStatus: string) => {
  let orderClause = '';

  if (mailStatus) {
    orderClause += `
    CASE 
      WHEN is_read = '${mailStatus}' THEN 1
      WHEN is_read = 'read' THEN 2
      WHEN is_read = 'unread' THEN 3
      WHEN is_read = 'in process' THEN 4
      ELSE 5
    END, `
  }

  switch (relevance) {
    case "ASC":
      orderClause += `created_at ASC`;
      break;
    case "DESC":
      orderClause += `created_at DESC`;
      break;
    default:
      orderClause += `created_at DESC`;
  }

  return orderClause;
}

export async function searchMail(
  searchParams: string,
  startDate: string,
  endDate: string,
  relevance: string,
  mailStatus: string
) {
  try {
    const searchStartDate = new Date(startDate)
      .toISOString()
      .replace("T", " ")
      .slice(0, 19);
    const searchEndDate = new Date(endDate)
      .toISOString()
      .replace("T", " ")
      .slice(0, 19);

    const query = `
    SELECT * FROM mails
    WHERE
        (name::TEXT ILIKE '%' || $1 || '%' OR
        phone::TEXT ILIKE '%' || $1 || '%' OR
        email::TEXT ILIKE '%' || $1 || '%' OR
        comment::TEXT ILIKE '%' || $1 || '%' OR
        region::TEXT ILIKE '%' || $1 || '%')
        AND created_at BETWEEN $2 AND $3
    ORDER BY ${orderMapper(relevance, mailStatus)};
`;
    const request = await sql.query(query, [searchParams, searchStartDate, searchEndDate])

    return request.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Failed finding mail");
  }
}

