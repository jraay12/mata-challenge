import { z } from "zod";
import { Role } from "../../domain/entities/value-objects/Roles";

export const CreateUserSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .max(100, "Name cannot exceed 100 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.nativeEnum(Role).optional(),
  })
  .strict();

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;
