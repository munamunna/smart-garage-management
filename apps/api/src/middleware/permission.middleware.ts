import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "./auth.middleware.js";
import { ROLE_PERMISSIONS } from "../modules/auth/role-permissions.js";
import { Permission } from "../modules/auth/permissions.js";
import { AppError } from "../utils/app-error.js";

export function authorize(...requiredPermissions: Permission[]) {
  return (
    req: AuthenticatedRequest,
    _res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.user) {
        throw new AppError("Authentication required", 401);
      }

      const userPermissions =
        ROLE_PERMISSIONS[req.user.role] ?? [];

      const hasPermission = requiredPermissions.every(
        (permission) => userPermissions.includes(permission),
      );

      if (!hasPermission) {
        throw new AppError("You do not have permission to perform this action", 403);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}