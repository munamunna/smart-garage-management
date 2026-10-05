import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { authConfig } from "../config/auth.js";
import { User } from "../modules/auth/auth.model.js";
import { AppError } from "../utils/app-error.js";

interface JwtPayload {
  sub: string;
  role: string;
}

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export async function authenticate(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction,
) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new AppError("Authentication required", 401);
    }

    const [scheme, token] = authorization.split(" ");

    if (scheme !== "Bearer" || !token) {
      throw new AppError("Invalid authorization header", 401);
    }

    let payload: JwtPayload;

    try {
      payload = jwt.verify(token, authConfig.jwtSecret) as JwtPayload;
    } catch {
      throw new AppError("Invalid or expired token", 401);
    }

    if (!payload.sub) {
      throw new AppError("Invalid authentication token", 401);
    }

    const user = await User.findById(payload.sub);

    if (!user) {
      throw new AppError("User no longer exists", 401);
    }

    if (!user.isActive) {
      throw new AppError("Your account is inactive", 401);
    }

    req.user = {
      id: user._id.toString(),
      role: user.role,
    };

    next();
  } catch (error) {
    next(error);
  }
}