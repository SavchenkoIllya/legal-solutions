"use server";
import { sql } from "@vercel/postgres";
import { Carousel } from "./types";
import { CarouselForm } from "./schema";

export async function getCarousels() {
  try {
    const request = await sql<Carousel>`SELECT * FROM carousel`;
    return request.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong on getting carousel data");
  }
}

export async function getCarouselById(id: number) {
  try {
    const request = await sql<Carousel>`SELECT * FROM carousel
                                        WHERE id=${id}
                                        `;
    return request.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong on getting carousel data");
  }
}

export async function createCarousel(formData: CarouselForm) {
  try {
    const {
      dev_name,
      title_en,
      title_pl,
      title_ru,
      title_ua,
      description_en,
      description_pl,
      description_ru,
      description_ua,
      image_src,
    } = formData;
    await sql`
                INSERT INTO carousel (dev_name, title_en, title_pl, title_ru, title_ua, description_en, description_pl, description_ru, description_ua, image_src)
                VALUES(${dev_name}, ${title_en || ""}, ${title_pl || ""} , ${
      title_ru || ""
    } , ${title_ua || ""}, ${description_en || ""}, ${description_pl || ""}, ${
      description_ru || ""
    }, ${description_ua || ""}, ${image_src})
              `;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create new carousel");
  }
}

export async function updateCarousel(
  formData: Partial<CarouselForm>,
  id: number
) {
  try {
    const {
      dev_name,
      title_en,
      title_pl,
      title_ru,
      title_ua,
      description_en,
      description_pl,
      description_ru,
      description_ua,
      image_src,
    } = formData;

    await sql`
                UPDATE carousel
                SET dev_name = ${dev_name},
                title_en = ${title_en},
                title_pl = ${title_pl},
                title_ru = ${title_ru},
                title_ua = ${title_ua},
                description_en = ${description_en},
                description_pl = ${description_pl},
                description_ru = ${description_ru},
                description_ua = ${description_ua},
                image_src = ${image_src}
                WHERE id = ${id};
              `;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update carousel");
  }
}

export async function deleteCarousel(id: number) {
  try {
    await sql`
              DELETE FROM carousel
              WHERE id=${id}
              `;
  } catch (error) {
    console.error(error);
    throw new Error("Failed deleting carousel");
  }
}
