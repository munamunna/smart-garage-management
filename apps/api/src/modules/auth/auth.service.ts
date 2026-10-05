import bcrypt from "bcrypt";
import { User, UserRole } from "./auth.model.js";
import jwt from "jsonwebtoken";
import {
  registerUserSchema,
  RegisterUserInput,
  loginUserSchema,
  LoginUserInput,
} from "./auth.schema.js";
import { authConfig } from "../../config/auth.js";
import { AppError } from "../../utils/app-error.js";

const SALT_ROUNDS = 12;

export async function registerUser(input: RegisterUserInput) {
  const validatedData = registerUserSchema.parse(input);

  const existingUser = await User.findOne({
    email: validatedData.email,
  });

  if (existingUser) {
    throw new Error("A user with this email already exists");
  }

  const passwordHash = await bcrypt.hash(
    validatedData.password,
    SALT_ROUNDS,
  );

  /*
   * Important:
   * A public registration request must NOT be able
   * to create an administrative account.
   *
   * Until we build an admin user-management flow,
   * newly registered users get SERVICE_ADVISOR.
   */
  const role: UserRole = "SERVICE_ADVISOR";

  const user = await User.create({
    firstName: validatedData.firstName,
    lastName: validatedData.lastName,
    email: validatedData.email,
    phone: validatedData.phone,
    passwordHash,
    role,
    isActive: true,
  });

  return {
    id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    role: user.role,
    isActive: user.isActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export async function loginUser(input: LoginUserInput) {
    const validatedData = loginUserSchema.parse(input);
  
    const user = await User.findOne({
      email: validatedData.email,
    }).select("+passwordHash");
  
    if (!user) {
        throw new AppError("Invalid email or password", 401);
    }
  
    if (!user.isActive) {
        throw new AppError("Your account is inactive", 401);
    }
  
    const passwordMatches = await bcrypt.compare(
      validatedData.password,
      user.passwordHash,
    );
  
    if (!passwordMatches) {
        throw new AppError("Invalid email or password", 401);
    }
  
    const token = jwt.sign(
      {
        sub: user._id.toString(),
        role: user.role,
      },
      authConfig.jwtSecret,
      {
        expiresIn: authConfig.jwtExpiresIn,
      },
    );
  
    return {
      token,
      user: {
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isActive: user.isActive,
      },
    };
  }