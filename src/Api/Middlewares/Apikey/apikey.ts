let allowAcess = true;
import { config } from "../../../Config/config";
import { Request, Response, NextFunction } from "express";

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns A middleware to validate the apikey
 */
const apikey = (req: Request, res: Response, next: NextFunction) => {
  /**
   *
   * Get the apikey from the headers
   */
  const Auth = req.headers.authorization;

  /**
   * Check if the apikey is valid
   */
  Auth == config.apiKey ? (allowAcess = true) : (allowAcess = false);

  if (allowAcess) {
    return next();
  }
  res.status(401).json({ message: "Not allowed" });
};

export { apikey };
