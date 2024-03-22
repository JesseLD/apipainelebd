import { Request, Response } from "express";
import { CreatePlanDTO } from "../../Controllers/Plan/dto/createPlan.dto";
import { UpdatePlanDTO } from "../../Controllers/Plan/dto/updatePlan.dto";

import { PlanService } from "../../Services/Plan/plan.service";

/**
 *
 * Calling the user service instance
 */
const planService = new PlanService();

/**
 *
 * User controller class
 */
class PlanController {
  /**
   *
   * @param res Should Return all users
   * @returns Array of users
   */
  async findAll(req: Request, res: Response) {
    return res.json(await planService.findAll());
  }

  /**
   *
   * @param res Should Return a sinlge user
   * @returns An Object of a single user
   */
  async findOne(req: Request, res: Response) {
    return res.json(await planService.findOne(req.params.id));
  }

  /**
   *
   * @param req Should be provided a name and email and be validated with createUserDTO types
   * @param res Should Create a user
   * @returns An Object of the created user
   */
  async create(req: Request, res: Response) {
    const { name, price, duration, description, maxStudents, maxBranches } =
      req.body;
    // const createUserDTO = new CreateUserDTO(name, email);
    const createPlanDTO = new CreatePlanDTO(
      name,
      price,
      duration,
      description,
      maxStudents,
      maxBranches
    );
    const response = await planService.create(createPlanDTO);
    return res.status(response.status).json({
      message: response.message,
      status: response.status,
    });
  }

  /**
   *
   * @param req Should be provided a name, email, id and be validated with updateUserDTO types
   * @param res Should Upadate a single user
   * @returns An Object of the created user
   */
  async update(req: Request, res: Response) {
    const { id, name, price, duration, description, maxStudents, maxBranches } =
      req.body;
    const updatePlanDTO = new UpdatePlanDTO(
      id,
      name,
      price,
      duration,
      description,
      maxStudents,
      maxBranches
    );
    const response = await planService.update(updatePlanDTO);
    return res.status(response.status).json({
      message: response.message,
      status: response.status,
    });
  }

  /**
   *
   * @param req Should be provided an id
   * @param res Should Delete a single user
   * @returns An a Message to indicate success
   */
  async delete(req: Request, res: Response) {
    const response = await planService.delete(Number.parseInt(req.params.id));
    return res.status(response.status).json({
      message: response.message,
      status: response.status,
    });
  }
}

/**
 * Exporting a instance of UserController
 */
export const planController = new PlanController();
