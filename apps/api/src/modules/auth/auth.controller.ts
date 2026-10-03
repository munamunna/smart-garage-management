import { Request, Response, NextFunction } from "express";
import { loginUser, registerUser } from "./auth.service.js";
import { User } from "./auth.model.js";
import { AppError } from "../../utils/app-error.js";
import { AuthenticatedRequest } from "../../middleware/auth.middleware.js";

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

  export async function getCurrentUser(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const user = await User.findById(req.user?.id);
  
      if (!user) {
        throw new AppError("User not found", 404);
      }
  
      return res.status(200).json({
        success: true,
        data: {
          id: user._id.toString(),
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          role: user.role,
          isActive: user.isActive,
        },
      });
    } catch (error) {
      next(error);
    }
  }