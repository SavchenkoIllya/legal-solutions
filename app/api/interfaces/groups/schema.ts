import { z } from "zod";

export const GroupsSchema = z.object({
  title_ru: z.string().min(3, { message: "Too short for title" }),
  title_ua: z.string().optional(),
  title_pl: z.string().optional(),
  title_en: z.string().optional(),
  description_ru: z.string().optional(),
  description_ua: z.string().optional(),
  description_pl: z.string().optional(),
  description_en: z.string().optional(),
  price_range: z.string().optional(),
  posts_id: z.array(z.number()).min(1),
  category: z.enum(['private', 'business']).default('private'),
});

export type GroupsForm = z.infer<typeof GroupsSchema>;
