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

churchRoutes.get("/Single/:id", churchController.findOne);
churchRoutes.get("/Member/:id", churchController.findSingleMember);
churchRoutes.get("/Admins/:id", churchController.findChurchAdmins);
churchRoutes.get("/Members/:id", churchController.findMembers);


churchRoutes.post("/Activate", churchController.activate);
churchRoutes.post("/Delete", churchController.delete);
churchRoutes.post("/Filter", churchController.filter);
churchRoutes.post("/UpdatePlan", churchController.updatePlan);
churchRoutes.post("/UpdateDatePlan", churchController.updateDateplan);
churchRoutes.get("/List", churchController.findAll);
