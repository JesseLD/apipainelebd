import { sequelize } from "../../Database/sequelize";
import { QueryTypes } from "sequelize";

const deleteAllBranches = async (id: number) => {
  const branches = await sequelize.query(
    `SELECT * FROM Church WHERE idChurch = ${id}`,
    { type: QueryTypes.SELECT }
  );
  branches.map(async (branch: any) => {
    Promise.all([
      deleteUserData(id),
      deleteTeams(id),
      deleteClassroom(id),
      deleteCodePromocion(id),
      deleteDepartment(id),
      deleteSector(id),
      deleteBranch(id),
      deleteSingleChurch(id),
    ]);
  });
};

const deleteUserData = async (id: number) => {
  const users = await sequelize.query(
    `SELECT * FROM User WHERE idChurch = ${id}`,
    { type: QueryTypes.SELECT }
  );
  users.map(async (user: any) => {
    await sequelize.query(
      `DELETE FROM User_PermissionLevel WHERE idUser = ${user.id}`,
      { type: QueryTypes.DELETE }
    );
  });
  users.map(async (user: any) => {
    await sequelize.query(`DELETE FROM Teams_User WHERE idUser = ${user.id}`, {
      type: QueryTypes.DELETE,
    });
  });
  users.map(async (user: any) => {
    await sequelize.query(
      `DELETE FROM PresenceTeacher WHERE idTeacher = ${user.id}`,
      { type: QueryTypes.DELETE }
    );
  });
  users.map(async (user: any) => {
    await sequelize.query(
      `DELETE FROM PresenceStudent WHERE idStudent = ${user.id}`,
      { type: QueryTypes.DELETE }
    );
  });
  users.map(async (user: any) => {
    await sequelize.query(`DELETE FROM User WHERE idChurch = ${id}`, {
      type: QueryTypes.DELETE,
    });
  });
};

const deleteTeams = async (id: number) => {
  const teams = await sequelize.query(
    `SELECT * FROM Team WHERE idChurch = ${id}`,
    { type: QueryTypes.SELECT }
  );
  teams.map(async (team: any) => {
    await sequelize.query(
      `DELETE FROM TeamsClassroom WHERE idTeams = ${team.id}`,
      { type: QueryTypes.DELETE }
    );
  });

  await sequelize.query(`DELETE FROM Team WHERE idChurch = ${id}`, {
    type: QueryTypes.DELETE,
  });
};

const deleteClassroom = async (id: number) => {
  await sequelize.query(`DELETE FROM Classroom WHERE idChurch = ${id}`, {
    type: QueryTypes.DELETE,
  });
};

const deleteCodePromocion = async (id: number) => {
  await sequelize.query(
    `DELETE FROM CodePromocion_Church WHERE idChurch = ${id}`,
    { type: QueryTypes.DELETE }
  );
};

const deleteDepartment = async (id: number) => {
  await sequelize.query(`DELETE FROM Department WHERE idChurch = ${id}`, {
    type: QueryTypes.DELETE,
  });
};

const deleteSector = async (id: number) => {
  await sequelize.query(`DELETE FROM Sector WHERE idChurchMatrix = ${id}`, {
    type: QueryTypes.DELETE,
  });
};

const deleteBranch = async (id: number) => {
  await sequelize.query(`DELETE FROM Church WHERE idChurch = ${id}`, {
    type: QueryTypes.DELETE,
  });
};

const deleteSingleChurch = async (id: number) => {
  await sequelize.query(`DELETE FROM Church WHERE id = ${id}`, {
    type: QueryTypes.DELETE,
  });
};

export async function deleteChurch(id: number) {
  try {
    await Promise.all([
      deleteAllBranches(id),
      deleteUserData(id),
      deleteTeams(id),
      deleteClassroom(id),
      deleteCodePromocion(id),
      deleteDepartment(id),
      deleteSector(id),
      deleteBranch(id),
      deleteSingleChurch(id),
    ]);

    return 200;
  } catch (error) {
    console.error("Erro ao deletar igreja", error);
    return 500;
  }
}
