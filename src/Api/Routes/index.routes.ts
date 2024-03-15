/**
 * Main router for the API
 */

import { Router, Request, Response } from "express";
import { v0Router } from "./V0/v0.router";
import { apikey } from "../Middlewares/Apikey/apikey";

export const routes = Router();

/**
 * Default route
 */
routes.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello, World" });
});

/**
 * Redirect to v0 router
 * Apikey middleware is used to validate the apikey
 */
routes.use("/v0", apikey, v0Router);

/**
 * 404 Error if route not found
 */
routes.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Not Found", status: 404 });
});
