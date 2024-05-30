import { z } from "zod";

export const MailSchema = z.object({
  name: z.string().min(5, { message: "Name is too short" }),
  phone: z
    .string()
    .min(5, { message: "Too  short it's cannot be phone number" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(3, { message: "To short" }),
  comment: z.string().optional(),
  region: z.string().optional(),
});

// TODO: create regexp for phone numbers

export type MailForm = z.infer<typeof MailSchema>;
