import { z } from "zod";

const addressSchema = z.object({
  street: z.string().trim().max(200).optional(),
  city: z.string().trim().max(100).optional(),
  state: z.string().trim().max(100).optional(),
  country: z.string().trim().max(100).optional(),
  postalCode: z.string().trim().max(20).optional(),
});

export const createCustomerSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(100),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .max(100),

  email: z
    .string()
    .trim()
    .email("Please provide a valid email address")
    .optional(),

  phone: z
    .string()
    .trim()
    .min(7, "Phone number is too short")
    .max(20, "Phone number is too long"),

  alternatePhone: z
    .string()
    .trim()
    .min(7, "Alternate phone number is too short")
    .max(20, "Alternate phone number is too long")
    .optional(),

  customerType: z
    .enum(["INDIVIDUAL", "BUSINESS"])
    .default("INDIVIDUAL"),

  companyName: z
    .string()
    .trim()
    .max(200)
    .optional(),

  address: addressSchema.optional(),

  notes: z
    .string()
    .trim()
    .max(2000)
    .optional(),
});

export const updateCustomerSchema = createCustomerSchema
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: "At least one field is required",
    },
  );

export type CreateCustomerInput = z.infer<
  typeof createCustomerSchema
>;

export type UpdateCustomerInput = z.infer<
  typeof updateCustomerSchema
>;