import type { SignOptions } from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error("JWT_SECRET is not defined");
}

export const authConfig: {
  jwtSecret: string;
  jwtExpiresIn: SignOptions["expiresIn"];
} = {
  jwtSecret,
  jwtExpiresIn: "1d",
};