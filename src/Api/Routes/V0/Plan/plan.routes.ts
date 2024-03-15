/**
 * @RouteFile User routes
 */

import { Router } from "express";
import { userController } from "../../../Controllers/User/users.controller";
import { planController } from "../../../Controllers/Plan/plan.controller";

/**
 * @Middleware User validation middleware to validate the request body
 */

import {
  validateCreatePlan,
  validateUpdatePlan,
} from "../../../Services/Plan/plan.validate";

export const planRoutes = Router();

/**
 * @Routes User CRUD routes
 */

planRoutes.get("/List", planController.findAll);

planRoutes.post("/New", validateCreatePlan, planController.create);

planRoutes.put("/Update", validateUpdatePlan, planController.update);

planRoutes.delete("/Delete/:id", planController.delete);
