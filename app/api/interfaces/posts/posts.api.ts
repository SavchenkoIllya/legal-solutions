"use server";
import { sql } from "@vercel/postgres";
import { Post } from "./types";
import { PostsForm } from "./schema";
// import { auth } from "@/app/api/auth/[...nextauth]/route";
import { auth } from "../../auth/[...nextauth]/auth";
import { getUserOnAuth } from "../users/users.api";
import { Categories } from "../groups/types";

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
    const queryText = `SELECT * FROM groups WHERE id = ANY($1::int[])`;
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
            INSERT INTO posts (title_ru, title_en, title_pl, title_ua, description_en, description_pl, description_ru, description_ua, seo_ru, seo_en, seo_pl, seo_ua, is_published, price-range, category, author_id, created_at)
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
                   ${price_range}
                   ${category}
                   ${user.id},
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
      price_range,
      seo_ru,
      seo_en,
      seo_pl,
      seo_ua,
      category,
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
                             price_range = ${price_range},
                             category = ${category}
                             updated_at = NOW()
                             WHERE id = ${id};
            `;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update carousel");
  }
}

export async function deletePost(id: number) {
  // FIXME: on delete post we have to find all groups that includes this posts and remove from them

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
