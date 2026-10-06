import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/permission.middleware.js";
import { PERMISSIONS } from "../auth/permissions.js";

import {
  createCustomerController,
  getCustomersController,
  getCustomerByIdController,
  updateCustomerController,
  deactivateCustomerController,
} from "./customer.controller.js";

const router = Router();

router.use(authenticate);

router.get(
  "/",
  authorize(PERMISSIONS.CUSTOMERS_READ),
  getCustomersController,
);

router.post(
  "/",
  authorize(PERMISSIONS.CUSTOMERS_CREATE),
  createCustomerController,
);

router.get(
  "/:id",
  authorize(PERMISSIONS.CUSTOMERS_READ),
  getCustomerByIdController,
);

router.patch(
  "/:id",
  authorize(PERMISSIONS.CUSTOMERS_EDIT),
  updateCustomerController,
);

router.delete(
  "/:id",
  authorize(PERMISSIONS.CUSTOMERS_DELETE),
  deactivateCustomerController,
);

export default router;