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

export async function updateContacts(formData: Partial<ContactsForm>) {
  try {
    const { work_hours, email, telephone, telegram, whatsapp } = formData;

    let updateFields = [];
    let values = [];

    if (work_hours !== undefined) {
      updateFields.push("work_hours = $1");
      values.push(work_hours);
    }
    if (email !== undefined) {
      updateFields.push("email = $2");
      values.push(email);
    }
    if (telephone !== undefined) {
      updateFields.push("telephone = $3");
      values.push(telephone);
    }
    if (telegram !== undefined) {
      updateFields.push("telegram = $4");
      values.push(telegram);
    }
    if (whatsapp !== undefined) {
      updateFields.push("whatsapp = $5");
      values.push(whatsapp);
    }

    if (updateFields.length > 0) {
      const setClause = updateFields.join(", ");
      const query = `
          UPDATE contacts
          SET ${setClause}
          WHERE id = 1
      `;

      await sql.query(query, values);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update user");
  }
}
