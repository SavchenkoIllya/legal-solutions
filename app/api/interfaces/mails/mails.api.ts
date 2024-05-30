"use server";
import { sql } from "@vercel/postgres";
import { Mail } from "./types";
import { MailForm } from "./schema";

export async function getMails() {
  try {
    const request = await sql<Mail>`SELECT * FROM mails`;
    return request.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong on getting users");
  }
}

export async function createMail(formData: MailForm) {
  try {
    const { name, phone, email, comment, region } = formData;
    await sql`
                INSERT INTO mails (name, phone, email, comment, region)
                VALUES(${name}, ${phone}, ${email} , ${comment} , ${region})
            `;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to registrate new user");
  }
}
