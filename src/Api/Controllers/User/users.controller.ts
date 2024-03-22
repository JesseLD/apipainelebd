import { Request, Response } from "express";
import { UserService } from "../../Services/User/user.service";
import { CreateUserDTO } from "./dto/createUser.dto";
import { UpdateUserDTO } from "./dto/updateUser.dto";

/**
 *
 * Calling the user service instance
 */
const userService = new UserService();

/**
 *
 * User controller class
 */
class UserController {
  /**
   *
   * @param res Should Return all users
   * @returns Array of users
   */
  async findAll(req: Request, res: Response) {
    return res.json(await userService.findAll());
  }

  /**
   *
   * @param res Should Return a sinlge user
   * @returns An Object of a single user
   */
  async findOne(req: Request, res: Response) {
    return res.json(await userService.findOne(req.params.id));
  }

  /**
   *
   * @param req Should be provided a name and email and be validated with createUserDTO types
   * @param res Should Create a user
   * @returns An Object of the created user
   */
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const createUserDTO = new CreateUserDTO(name, email,password);
    return res.json(await userService.create(createUserDTO));
  }

  /**
   *
   * @param req Should be provided a name, email, id and be validated with updateUserDTO types
   * @param res Should Upadate a single user
   * @returns An Object of the created user
   */
  // async update(req: Request, res: Response) {
  //   const { id, name, email } = req.body;
  //   const updateUserDTO = new UpdateUserDTO(name, email);
  //   return res.json(await userService.update(updateUserDTO));
  // }

  /**
   *
   * @param req Should be provided an id
   * @param res Should Delete a single user
   * @returns An a Message to indicate success
   */
  async delete(req: Request, res: Response) {
    return res.json(await userService.delete(req.params.id));
  }
}

/**
 * Exporting a instance of UserController
 */
export const userController = new UserController();
