"use server";
import { sql } from "@vercel/postgres";
import { Post } from "./types";
import { PostsForm } from "./schema";
import { auth } from "../../auth/auth";
import { getUserOnAuth } from "../users/users.api";
import { Categories } from "../groups/types";

export async function getPosts() {
  try {
    const request = await sql<Post>`SELECT * FROM posts`
    return request.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong on getting posts");
  }
}

export async function getPostById(id: number) {
  try {
    const request = await sql<Post>`SELECT * FROM posts
                                    WHERE id=${id}
                                    `;
    return request.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong on getting post by id");
  }
}

export async function getPostsByCategory(category: Categories) {
  try {
    const request =
      await sql<Post>`SELECT id, title_ru, title_ua, title_en, title_pl, price_range, is_published
                                    FROM posts
                                    WHERE category=${category} AND is_published = true`;
    return request.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong on getting post by categories");
  }
}

export async function getRequestedPosts(ids: number[]) {
  try {
    const queryText = `SELECT * FROM posts WHERE id = ANY($1::int[])`;
    const res = await sql.query(queryText, [ids]);
    return res.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong on getting posts");
  }
}

export async function createPost(formData: PostsForm) {
  try {
    const {
      title_ru,
      title_en,
      title_pl,
      title_ua,
      description_ru,
      description_en,
      description_pl,
      description_ua,
      seo_ru,
      seo_en,
      seo_pl,
      seo_ua,
      is_published,
      price_range,
      category,
    } = formData;
    const session = await auth();


    if (!session?.user?.email) {
      throw new Error("You are not authorized");
    }
    const user = await getUserOnAuth(session?.user?.email);

    await sql`
            INSERT INTO posts (title_ru, title_en, title_pl, title_ua, description_en, description_pl, description_ru, description_ua, seo_ru, seo_en, seo_pl, seo_ua, is_published, price_range, category, author_id, created_at)
            VALUES(${title_ru},
                   ${title_en || ""},
                   ${title_pl || ""},
                   ${title_ua || ""},
                   ${description_en || ""},
                   ${description_pl || ""},
                   ${description_ru || ""},
                   ${description_ua || ""},
                   ${seo_ru || ""},
                   ${seo_en || ""},
                   ${seo_pl || ""},
                   ${seo_ua || ""},
                   ${is_published},
                   ${price_range},
                   ${category},
                   ${user.id},
                   NOW())
            `;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create new post");
  }
}

export async function updatePost(formData: PostsForm, id: number) {
  try {
    const formattedData: (string | boolean | number)[] =
      [...Object.values(formData), id];

      

    const queryText = `
            UPDATE posts
            SET
              title_ru = COALESCE($1, title_ru),
              title_ua = COALESCE($2, title_ua),
              title_pl = COALESCE($3, title_pl),
              title_en = COALESCE($4, title_en),
              description_ru = COALESCE($5, description_ru),
              description_ua = COALESCE($6, description_ua),
              description_pl = COALESCE($7, description_pl),
              description_en = COALESCE($8, description_en),
              created_at = COALESCE($9, created_at),
              updated_at = NOW(),
              seo_ru = COALESCE($10, seo_ru),
              seo_en = COALESCE($11, seo_en),
              seo_pl = COALESCE($12, seo_pl),
              seo_ua = COALESCE($13, seo_ua),
              price_range = COALESCE($14, price_range),
              category = COALESCE($15, category),
              is_published = COALESCE($16, is_published)
            WHERE id = ($17);
          `;
    await sql.query(queryText, formattedData);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update posts");
  }
}

export async function changeIsPublished(id: number) {
  try {
    await sql`UPDATE posts
              SET is_published = NOT is_published
              WHERE id = ${id}
              RETURNING is_published;`.then((res) => console.log(res));
  } catch (error) {
    console.error(error)
    throw new Error("Failed to change is_published value")
  }
}

export async function deletePost(id: number) {
  // FIXME: on delete post we have to find all groups that includes this posts and remove from them
  try {
    await sql`
              DELETE FROM posts
              WHERE id=${id}
              `.then(async () => {
      await sql`
                                        UPDATE groups
                                        SET posts_id = ARRAY_REMOVE(posts_id, ${id})
                                        WHERE ${id} = ANY(posts_id);
                                        `;
    }).catch(console.log);
  } catch (error) {
    console.error(error);
    throw new Error("Failed deleting post");
  }
}
