import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

/**
 * This file can be used as a template to validate the request body of any request
 */

/**
 * @Middleware User validation middleware to validate the request body
 */
export const validateCreatePlan = [
  body("name").isString().withMessage("Invalid name"),
  body("price").isNumeric().withMessage("Invalid price"),
  body("duration").isNumeric().withMessage("Invalid duration"),

  /**
   * Request validation and intervention
   */
  (req: Request, res: Response, next: NextFunction) => {
    /**
     * @errors shoud be the result of error validation
     * @ErrorArray shoud be the errors Array to response
     */
    const errors = validationResult(req);
    const ErrorArray: string[] = [];

    if (!errors.isEmpty()) {
      errors.array().forEach((error) => {
        ErrorArray.push(error.msg);
      });
      return res.status(400).json({ errors: ErrorArray });
    }

    /**
     * if no Errors the middleware will allow the acess
     */
    next();
  },
];

/**
 * @Middleware User validation middleware to validate the request body
 * @param id Shouw be privided an valid id
 * @param email Should be provided an email
 * @param password Should be provided a password
 */
export const validateUpdatePlan = [
  body("id").exists().isNumeric().withMessage("id is required"),
  body("name").isString().withMessage("Invalid name"),
  body("price").isNumeric().withMessage("Invalid price"),
  body("duration").isNumeric().withMessage("Invalid duration"),

  /**
   * Request validation and intervention
   */
  (req: Request, res: Response, next: NextFunction) => {
    /**
     * @errors shoud be the result of error validation
     * @ErrorArray shoud be the errors Array to response
     */
    const errors = validationResult(req);
    const ErrorArray: string[] = [];

    if (!errors.isEmpty()) {
      errors.array().forEach((error) => {
        ErrorArray.push(error.msg);
      });
      return res.status(400).json({ errors: ErrorArray });
    }

    /**
     * if no Errors the middleware will allow the acess
     */
    next();
  },
];
