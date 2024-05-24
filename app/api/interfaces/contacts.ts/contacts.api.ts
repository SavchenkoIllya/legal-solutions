"use server";
import { sql } from "@vercel/postgres";
import { Contacts } from "./types";
import { ContactsForm } from "./schema";

export async function getContacts() {
  try {
    const request = await sql<Contacts>`SELECT * FROM contacts`;
    return request.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong on getting users");
  }
}

export async function createContacts(formData: ContactsForm) {
  try {
    const { work_hours, email, telephone, telegram, whatsapp } = formData;
    await sql`
                INSERT INTO contacts (work_hours, email, telephone, telegram, whatsapp)
                VALUES(${work_hours}, ${email}, ${telephone} , ${telegram} , ${whatsapp})
            `;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to registrate new user");
  }
}
