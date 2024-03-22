/**
 * @RouteFile User routes
 */

import { Router } from "express";
import { userController } from "../../../Controllers/User/users.controller";

/**
 * @Middleware User validation middleware to validate the request body
 */

import {
  validateCreateUser,
  validateUpdateUser,
} from "../../../Services/User/user.validate";

export const userRoutes = Router();

/**
 * @Routes User CRUD routes
 */

/**
 *
 * @get /Users Should Return all users
 */
userRoutes.get("/", userController.findAll);

/**
 *
 * @get /Users/1 Should Return a single user
 * @param id Should be provided an id
 */
userRoutes.get("/:id", userController.findOne);

/**
 *
 * @post /Users Should Create a user
 */
userRoutes.post("/", validateCreateUser, userController.create);

/**
 *
 * @put /Users Should Upadate a single user
 */
// userRoutes.put("/", validateUpdateUser, userController.update);

/**
 *
 * @delete /Users/1 Should Delete a single user
 * @param id Should be provided an id
 */
userRoutes.delete("/:id", userController.delete);
