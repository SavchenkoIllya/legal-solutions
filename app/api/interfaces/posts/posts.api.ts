"use server";
import { sql } from "@vercel/postgres";
import { Post } from "./types";
import { PostsForm } from "./schema";

export async function getPosts() {
  try {
    const request = await sql<Post>`SELECT * FROM posts`;
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
    throw new Error("Something went wrong on getting post");
  }
}

export async function createCarousel(formData: PostsForm) {
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
    } = formData;
    await sql`
            INSERT INTO posts (title_ru, title_en, title_pl, title_ua, description_en, description_pl, description_ru, description_ua, seo_ru, seo_en, seo_pl, seo_ua, is_published, created_at)
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
                   NOW())
            `;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create new carousel");
  }
}

export async function updatePost(formData: Partial<PostsForm>, id: number) {
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
      is_published,
      seo_ru,
      seo_en,
      seo_pl,
      seo_ua,
    } = formData;
    await sql`
            UPDATE posts SET title_ru = ${title_ru},
                             title_en = ${title_en || ""},
                             title_pl = ${title_pl || ""},
                             title_ua = ${title_ua || ""},
                             description_en = ${description_en || ""},
                             description_pl = ${description_pl || ""},
                             description_ru = ${description_ru || ""},
                             description_ua = ${description_ua || ""},
                             seo_ru = ${seo_ru || ""},
                             seo_en = ${seo_en || ""},
                             seo_pl = ${seo_pl || ""},
                             seo_ua = ${seo_ua || ""},
                             is_published = ${is_published},
                             updated_at = NOW()
                             WHERE id = ${id};
            `;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update carousel");
  }
}

export async function deletePost(id: number) {
  try {
    await sql`
              DELETE FROM posts
              WHERE id=${id}
              `;
  } catch (error) {
    console.error(error);
    throw new Error("Failed deleting post");
  }
}
