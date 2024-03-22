import { CreatePlanDTO } from "../../Controllers/Plan/dto/createPlan.dto";
import { UpdatePlanDTO } from "../../Controllers/Plan/dto/updatePlan.dto";
import prisma from "../../Database/prisma";

/**
 *
 * Plan service class
 */

export class PlanService {
  private response = {
    message: "Plan created successfully",
    status: 200,
  };
  async findAll() {
    try {
      const plans = await prisma.plans.findMany();
      return plans;
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  async findOne(id: string) {
    try {
      const plans = await prisma.plans.findUnique({
        where: {
          id: Number.parseInt(id),
        },
      });
      return plans;
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  async create(createPlanDTO: CreatePlanDTO) {
    try {
      await prisma.plans.create({
        data: {
          name: createPlanDTO.name,
          price: createPlanDTO.price,
          duration: createPlanDTO.duration,
          description: createPlanDTO.description,
          maxStudents: createPlanDTO.maxStudents,
          maxBranches: createPlanDTO.maxBranches,
        },
      });
      return this.response;
    } catch (e) {
      console.log(e);
      this.response.message = "An error occured";
      this.response.status = 500;
      return this.response;
    }
  }

  async update(updatePlanDTO: UpdatePlanDTO) {
    try {
      await prisma.plans.update({
        data: {
          name: updatePlanDTO.name,
          price: updatePlanDTO.price,
          duration: updatePlanDTO.duration,
          description: updatePlanDTO.description,
          maxStudents: updatePlanDTO.maxStudents,
          maxBranches: updatePlanDTO.maxBranches,
        },
        where: {
          id: updatePlanDTO.id,
        },
      });
      this.response.message = "Plan updated successfully";
      return this.response;
    } catch (e) {
      console.log(e);
      this.response.message = "An error occured";
      this.response.status = 500;
      return this.response;
    }
  }

  async delete(id: number) {
    try {
      await prisma.plans.delete({
        where: {
          id: id,
        },
      });
      return this.response;
    } catch (e) {
      console.log(e);
      this.response.message = "An error occured";
      this.response.status = 500;
      return this.response;
    }
  }
}
