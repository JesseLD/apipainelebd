/**
 * @RouteFile User routes
 */

import { Router } from "express";
import { churchController } from "../../../Controllers/Church/church.controller";

/**
 * @Middleware User validation middleware to validate the request body
 */

export const churchRoutes = Router();

/**
 * @Routes User CRUD routes
 */

churchRoutes.get("/:id", churchController.findOne);
churchRoutes.get("/Member/:id", churchController.findSingleMember);
churchRoutes.get("/Admins/:id", churchController.findChurchAdmins);
churchRoutes.get("/Members/:id", churchController.findMembers);
