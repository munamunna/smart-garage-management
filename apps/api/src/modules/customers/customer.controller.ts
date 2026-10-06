import type { Request, Response, NextFunction } from "express";
import {
  createCustomerSchema,
  updateCustomerSchema,
} from "./customer.schema.js";
import {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deactivateCustomer,
} from "./customer.service.js";

export async function createCustomerController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const input = createCustomerSchema.parse(req.body);

    const customer = await createCustomer(input);

    res.status(201).json({
      success: true,
      message: "Customer created successfully",
      data: customer,
    });
  } catch (error) {
    next(error);
  }
}

export async function getCustomersController(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const customers = await getCustomers();

    res.status(200).json({
      success: true,
      data: customers,
    });
  } catch (error) {
    next(error);
  }
}

export async function getCustomerByIdController(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) {
  try {
    const customer = await getCustomerById(req.params.id);

    res.status(200).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateCustomerController(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) {
  try {
    const input = updateCustomerSchema.parse(req.body);

    const customer = await updateCustomer(
      req.params.id,
      input,
    );

    res.status(200).json({
      success: true,
      message: "Customer updated successfully",
      data: customer,
    });
  } catch (error) {
    next(error);
  }
}

export async function deactivateCustomerController(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) {
  try {
    const customer = await deactivateCustomer(req.params.id);

    res.status(200).json({
      success: true,
      message: "Customer deactivated successfully",
      data: customer,
    });
  } catch (error) {
    next(error);
  }
}