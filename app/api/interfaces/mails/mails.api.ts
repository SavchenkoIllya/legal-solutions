"use server";
import { sql } from "@vercel/postgres";
import { Mail } from "./types";
import { MailForm } from "./schema";
import { Resend } from "resend";
import { MailDuplicateEmailTemplate } from "@/app/emails/mailDuplicate";
import { sendParsedDataToChats } from "./utils";

export async function getMails() {
  try {
    const request = await sql<Mail>`SELECT * FROM mails`;
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
    throw new Error("Failed to registrate new user");
  }
}
