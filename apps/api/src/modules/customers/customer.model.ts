import { Schema, model, type InferSchemaType } from "mongoose";

const addressSchema = new Schema(
  {
    street: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
      default: "UAE",
    },
    postalCode: {
      type: String,
      trim: true,
    },
  },
  { _id: false },
);

const customerSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    alternatePhone: {
      type: String,
      trim: true,
    },

    customerType: {
      type: String,
      enum: ["INDIVIDUAL", "BUSINESS"],
      default: "INDIVIDUAL",
      required: true,
    },

    companyName: {
      type: String,
      trim: true,
    },

    address: {
      type: addressSchema,
    },

    notes: {
      type: String,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

customerSchema.index({ phone: 1 });
customerSchema.index({ email: 1 });
customerSchema.index({ lastName: 1, firstName: 1 });

export type Customer = InferSchemaType<typeof customerSchema>;

export const CustomerModel = model<Customer>("Customer", customerSchema);