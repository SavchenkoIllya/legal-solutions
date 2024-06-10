import { z } from "zod";

export const PostsSchema = z.object({
  title_ru: z.string().min(5, { message: "Please fill at least this field" }),
  title_ua: z.string().optional(),
  title_pl: z.string().optional(),
  title_en: z.string().optional(),
  description_ru: z.string().optional(),
  description_ua: z.string().optional(),
  description_pl: z.string().optional(),
  description_en: z.string().optional(),
  seo_pl: z.string().optional(),
  seo_ru: z.string().optional(),
  seo_ua: z.string().optional(),
  seo_en: z.string().optional(),
  is_published: z.boolean(),
  price_range: z.string().optional(),
});

export type PostsForm = z.infer<typeof PostsSchema>;
