import { z } from "zod";

export const LoginSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string(),
  })
  .strict();

export type LoginUserDTO = z.infer<typeof LoginSchema>;
