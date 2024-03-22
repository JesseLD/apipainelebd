/**
 * @RouteFile User routes
 */

import { Router } from "express";
import { reportController } from "../../../Controllers/Report/report.controller";

/**
 * @Middleware User validation middleware to validate the request body
 */


export const reportRoutes = Router();

/**
 * @Routes Report routes
 */


/**
 * @Church
 */
reportRoutes.get("/Church", reportController.getChurchesByYear);
reportRoutes.get("/Church/States", reportController.getStates);
reportRoutes.get("/Church/Activation", reportController.getChurchesByState);

