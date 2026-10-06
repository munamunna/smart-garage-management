import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./modules/auth/auth.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import customerRoutes from "./modules/customers/customer.routes.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Smart Garage API is running",
  });
});

app.use("/api/auth", authRoutes);


app.use("/api/customers", customerRoutes);
app.use(errorHandler);

export default app;