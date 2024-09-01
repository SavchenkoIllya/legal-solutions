import { z } from "zod";

const passwordRequirements = `Requirements:\n
    At least 8 characters long.\n
    Contains at least one uppercase letter.\n
    Contains at least one lowercase letter.\n
    Contains at least one digit.\n
    Contains at least one special character (e.g., !@#$%^&*).`;

const passwordRegex = new RegExp(
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
);

export const UserLoginSchema = z.object({
  email: z.coerce
    .string()
    .email({ message: "please enter email" })
    .min(5, { message: "To short email" }),
  password: z
    .string()
    .regex(passwordRegex, { message: passwordRequirements })
    .min(5, { message: "Too short password" }),
});

export type UserLoginForm = z.infer<typeof UserLoginSchema>;

export const UserSchema = z.object({
  email: z.coerce
    .string()
    .email({ message: "please enter email" })
    .min(5, { message: "To short email" }),
  password: z
    .string()
    .regex(passwordRegex, { message: passwordRequirements })
    .min(5, { message: "Too short password" }),
  id: z.number().optional(),
  name: z.string().min(5, { message: "Your name cannot be so short" }),
});

export type UserForm = z.infer<typeof UserSchema>;

export const UserSchemaWithoutPassword = z.object({
  email: z.coerce
    .string()
    .email({ message: "please enter email" })
    .min(5, { message: "To short email" }),
  id: z.number().optional(),
  name: z.string().min(5, { message: "Your name cannot be so short" }),
});

export type UpdateUserForm = z.infer<typeof UserSchemaWithoutPassword>;

// TODO:
//      - optimize this functionality using destructuring
// const createValidationSchema = (additionalFields: Record<string, z.ZodType<any>>) => {
//   return z.object({
//     ...additionalFields,
//     email: z.coerce.string().email({ message: "please enter email" }).min(5, { message: "To short email" }),
//     password: z.string().regex(passwordRegex, { message: passwordRequirements }).min(5, { message: "Too short password" }),
//   });
// };
// export const UserSchema = createValidationSchema({
//   id: z.number().optional(),
//   name: z.string().min(5, { message: "Your name cannot be so short" }),
// });
// export type UserForm = z.infer<typeof UserSchema>;
// export const UserLoginSchema = createValidationSchema({});
// export type UserLoginForm = z.infer<typeof UserLoginSchema>;
