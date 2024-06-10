"use server";
import { sql } from "@vercel/postgres";
import { Categories, Groups } from "./types";
import { GroupsForm } from "./schema";

export async function getAllGroups() {
  try {
    const request = await sql<Groups>`SELECT * FROM groups`;
    return request.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong on getting groups");
  }
}

export async function getGroupById(id: number) {
  try {
    const request = await sql<Groups>`SELECT * FROM groups
                                      WHERE id=${id}
                                      `;
    return request.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong on getting group");
  }
}

export async function getCategorizedGroups(category: Categories) {
  try {
    const request = await sql<Groups>`SELECT * FROM groups
                                      WHERE category=${category}
                                      `;
    return request.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong on getting group");
  }
}

export async function createGroup(formData: GroupsForm) {
  try {
    const formattedData = Object.values(formData);
    const queryText = `
    INSERT INTO groups (
      title_ru,
      title_ua,
      title_pl,
      title_en,
      description_ru,
      description_ua,
      description_pl,
      description_en,
      price_range,
      posts_id,
      category,
      created_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW())
  `;
    await sql.query(queryText, formattedData);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create new group");
  }
}

export async function updateGroup(formData: GroupsForm, id: number) {
  try {
    const formattedData: (string | number | number[])[] =
      Object.values(formData);
    formattedData.push(id);
    const queryText = `
        UPDATE groups
        SET
          title_ru = COALESCE($1, title_ru),
          title_ua = COALESCE($2, title_ua),
          title_pl = COALESCE($3, title_pl),
          title_en = COALESCE($4, title_en),
          description_ru = COALESCE($5, description_ru),
          description_ua = COALESCE($6, description_ua),
          description_pl = COALESCE($7, description_pl),
          description_en = COALESCE($8, description_en),
          price_range = COALESCE($9, price_range),
          posts_id = COALESCE($10, posts_id),
          category = COALESCE($11, posts_id),
        WHERE id = $12
        RETURNING *
      `;
    await sql.query(queryText, formattedData);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update group");
  }
}

export async function deleteGroup(id: number) {
  try {
    await sql`
                DELETE FROM groups
                WHERE id=${id}
                `;
  } catch (error) {
    console.error(error);
    throw new Error("Failed deleting group");
  }
}
