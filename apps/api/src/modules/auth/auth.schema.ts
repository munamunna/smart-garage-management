import { z } from "zod";

export const registerUserSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters"),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not exceed 50 characters"),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please provide a valid email address"),

  phone: z
    .string()
    .trim()
    .min(7, "Phone number is too short")
    .max(20, "Phone number is too long")
    .optional(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must not exceed 100 characters"),

  role: z
    .enum([
      "SUPER_ADMIN",
      "GARAGE_ADMIN",
      "MANAGER",
      "SERVICE_ADVISOR",
      "TECHNICIAN",
      "ACCOUNTANT",
    ])
    .optional(),
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;