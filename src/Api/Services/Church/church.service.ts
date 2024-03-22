import { sequelize } from "../../Database/sequelize";
import { deleteChurch } from "./deletechurch.service";

export class ChurchService {
  async getAllChurches(OFFSET: number) {
    try {
      const results = await sequelize.query(
        `SELECT id,name,CPF_CNPJ,isActiveted,dateplan,creationDate,TypePlan FROM Church WHERE idChurch IS NULL LIMIT 25 OFFSET ${OFFSET || 0}`
      );
      // setData(data);
      const data = results[0];
      return data;
    } catch (err) {
      console.log(err);
      return {
        message: "Error",
        status: 500,
      };
    }
  }

  async activateChurch(id: number, activate: boolean) {
    try {
      const results = await sequelize.query(
        `UPDATE Church SET isActiveted = ${activate} WHERE id = ${id}`
      );
      // setData(data);
      const data = results[0];
      return {
        message: "Success",
        status: 200,
      };
    } catch (err) {
      console.log(err);
      return {
        message: "Error",
        status: 500,
      };
    }
  }

  async deleteChurchById(id: number) {
    const response = await deleteChurch(id);

    if (response == 200) {
      return {
        message: "Success",
        status: 200,
      };
    } else {
      return {
        message: "Error",
        status: 500,
      };
    }
  }

  async updatePlan(id: string, plan: string) {
    try {
      await sequelize.query(
        `UPDATE Church SET typePlan = '${plan}' WHERE id = ${id};`
      );
      return {
        message: "Success",
        status: 200,
      };
    } catch (err) {
      console.log(err);
      return {
        message: "Error",
        status: 500,
      };
    }
  }
  async updateDateplan(id: string, time: string) {
    try {
      await sequelize.query(
        `UPDATE Church SET datePlan = '${time}' WHERE id = ${id};`
      );
      return {
        message: "Success",
        status: 200,
      };
    } catch (err) {
      console.log(err);
      return {
        message: "Error",
        status: 500,
      };
    }
  }
}
