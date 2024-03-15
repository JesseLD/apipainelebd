/**
 * Express configuration file
 */
import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import "express-async-errors";
import { routes } from "../Api/Routes/index.routes";

/**
 * Express configuration using CORS, JSON and URL encoded to allow the server to parse JSON and URL encoded data
 */
const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Error handling middleware
 */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  return res.status(500).json({ error: "Internal Server Error" });
});

/**
 * Routes redirection to index.routes.ts File
 */
app.use(routes);

export default app;
