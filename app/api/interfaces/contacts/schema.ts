import { z } from "zod";

export const ContactsSchema = z.object({
  work_hours: z.string().min(1, { message: "Shouldn't be empty" }),
  telephone: z
    .string()
    .min(5, { message: "Too  short it's cannot be phone number" }),
  email: z
    .string()
    .email({ message: "It's isn't email" })
    .min(3, { message: "To short" }),
  telegram: z.string(),
  instagram: z.string(),
  whatsapp: z.string(),
});

export type ContactsForm = z.infer<typeof ContactsSchema>;
