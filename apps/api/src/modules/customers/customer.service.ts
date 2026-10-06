import { CustomerModel } from "./customer.model.js";
import {
  CreateCustomerInput,
  UpdateCustomerInput,
} from "./customer.schema.js";
import { AppError } from "../../utils/app-error.js";

export async function createCustomer(input: CreateCustomerInput) {
  const customer = await CustomerModel.create(input);

  return customer;
}

export async function getCustomers() {
  return CustomerModel.find({ isActive: true })
    .sort({ createdAt: -1 })
    .lean();
}

export async function getCustomerById(id: string) {
  const customer = await CustomerModel.findOne({
    _id: id,
    isActive: true,
  }).lean();

  if (!customer) {
    throw new AppError("Customer not found", 404);
  }

  return customer;
}

export async function updateCustomer(
  id: string,
  input: UpdateCustomerInput,
) {
  const customer = await CustomerModel.findOneAndUpdate(
    {
      _id: id,
      isActive: true,
    },
    input,
    {
      new: true,
      runValidators: true,
    },
  ).lean();

  if (!customer) {
    throw new AppError("Customer not found", 404);
  }

  return customer;
}

export async function deactivateCustomer(id: string) {
  const customer = await CustomerModel.findOneAndUpdate(
    {
      _id: id,
      isActive: true,
    },
    {
      isActive: false,
    },
    {
      new: true,
    },
  ).lean();

  if (!customer) {
    throw new AppError("Customer not found", 404);
  }

  return customer;
}