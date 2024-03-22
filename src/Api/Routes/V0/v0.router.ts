import { Router, Request, Response } from "express";
import { userRoutes } from "./User/user.routes";
import { planRoutes } from "./Plan/plan.routes";
import { churchRoutes } from "./Church/church.routes";
import { reportRoutes } from "./Reports/report.routes";
export const v0Router = Router();

/**
 * V0 Default route
 */
v0Router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello, World" });
});

/**
 * Redirect to user router to access all methods
 */
v0Router.use("/Users", userRoutes);
v0Router.use("/Plans", planRoutes);
v0Router.use("/Church", churchRoutes);
v0Router.use("/Reports", reportRoutes);

