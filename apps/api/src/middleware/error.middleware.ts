import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/app-error.js";

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.error(error);

  if (error instanceof ZodError) {
    const errors: Record<string, string> = {};

    for (const issue of error.issues) {
      const field = issue.path.join(".");

      if (!errors[field]) {
        errors[field] = issue.message;
      }
    }

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
}