import { Request, Response, NextFunction } from "express";
import { loginUser, registerUser } from "./auth.service.js";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = await registerUser(req.body);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export async function login(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await loginUser(req.body);
  
      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }