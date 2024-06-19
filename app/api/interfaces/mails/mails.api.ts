"use server";
import { sql } from "@vercel/postgres";
import { IsReadStates, Mail } from "./types";
import { MailForm } from "./schema";
import { Resend } from "resend";
import { MailDuplicateEmailTemplate } from "@/app/emails/mailDuplicate";
import { sendParsedDataToChats } from "./utils";

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

    await sendParsedDataToChats(formData);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create mail");
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

export async function searchMail(
  searchParams: string,
  startDate: string,
  endDate: string
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
    const request = await sql<Mail>`SELECT *
                                    FROM mails
                                    WHERE
                                        (name::TEXT ILIKE '%' || ${searchParams} || '%' OR
                                        phone::TEXT ILIKE '%' || ${searchParams} || '%' OR
                                        email::TEXT ILIKE '%' || ${searchParams} || '%' OR
                                        comment::TEXT ILIKE '%' || ${searchParams} || '%' OR
                                        region::TEXT ILIKE '%' || ${searchParams} || '%') AND
                                        created_at BETWEEN ${searchStartDate} AND ${searchEndDate}
                                    ORDER BY created_at DESC;
                                    `;
    return request.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Failed finding mail");
  }
}
