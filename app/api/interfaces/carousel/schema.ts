import { z } from "zod";

export const CarouselSchema = z.object({
  image_src: z.string().min(4, { message: "to short for link" }),
  dev_name: z.string().min(3, { message: "To short for a name of entity" }),
  title_ru: z.string().optional(),
  title_ua: z.string().optional(),
  title_pl: z.string().optional(),
  title_en: z.string().optional(),
  description_ru: z.string().optional(),
  description_ua: z.string().optional(),
  description_pl: z.string().optional(),
  description_en: z.string().optional(),
});

export type CarouselForm = z.infer<typeof CarouselSchema>;
