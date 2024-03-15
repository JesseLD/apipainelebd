import { sequelize } from "../../Database/sequelize";

type ChurchInfo = {
  churchData: {
    name: string;
    emailAdmin: string;
    CPF_CNPJ: string;
    city: string;
    state: string;
    contact: string;
    creationDate: string;
    isActiveted: boolean;
  };
  branchesTotal: {
    total: number;
  };
  totalStudents: {
    total_students: number;
  };
  totalTeachers: {
    total_teachers: number;
  };
  matrixTeams: {
    total: number;
  };
  matrizClasses: {
    total: number;
  };
  studentsMatrixAndBranch: {
    total_students: number;
  };
  teachersMatrixAndBranch: {
    total_teachers: number;
  };
  totalUsersExceptStudents: {
    total_users_except_students: number;
  };
  totalUsers: {
    total_users: number;
  };
  totalTeamsMatrixAndBranches: {
    total: number;
  };
  lastLesson: {
    last_lesson: string;
  };
  totalMatrixUsersExceptStudents: {
    total_users_except_students: number;
  };
  totalMatrizUsers: {
    total: number;
  };
  dateplan: {
    datePlan: string;
  };
  churchAdmins: any;
};

export class SingleChurchService {
  async findOne(id: number): Promise<any> {
    const [
      churchData,
      branchesTotal,
      totalStudents,
      totalTeachers,
      matrixTeams,
      matrizClasses,
      studentsMatrixAndBranch,
      teachersMatrixAndBranch,
      totalUsersExceptStudents,
      totalUsers,
      totalTeamsMatrixAndBranches,
      lastLesson,
      totalMatrixUsersExceptStudents,
      totalMatrizUsers,
      dateplan,
      churchAdmins,
    ] = await Promise.all([
      sequelize.query(`
        SELECT 
          name, 
          emailAdmin, 
          CPF_CNPJ, 
          city, 
          state, 
          contact, 
          creationDate, 
          isActiveted 
        FROM Church 
        WHERE id = ${id};
      `),
      sequelize.query(`
        SELECT COUNT(*) AS total 
        FROM Church 
        WHERE idChurch = ${id};
      `),
      sequelize.query(`
        SELECT 
          COUNT(DISTINCT U.id) AS total_students
        FROM 
          User U
          INNER JOIN User_PermissionLevel UP ON U.id = UP.idUser
        WHERE 
          UP.idPermissionLevel = 7 
          AND U.idChurch = ${id};
      `),
      sequelize.query(`
        SELECT 
          COUNT(DISTINCT U.id) AS total_teachers
        FROM 
          User U
          INNER JOIN User_PermissionLevel UP ON U.id = UP.idUser
        WHERE 
          (UP.idPermissionLevel = 4 OR UP.idPermissionLevel = 5) 
          AND U.idChurch = ${id};
      `),
      sequelize.query(`
        SELECT COUNT(*) AS total 
        FROM Team 
        WHERE idChurch = ${id};
      `),
      sequelize.query(`
        SELECT COUNT(*) AS total 
        FROM Classroom 
        WHERE idChurch = ${id};
      `),
      sequelize.query(`
        SELECT 
          COUNT(DISTINCT U.id) AS total_students
        FROM 
          User U
          INNER JOIN User_PermissionLevel UP ON U.id = UP.idUser
        WHERE 
          UP.idPermissionLevel = 7 
          AND U.idChurch IN (SELECT id FROM Church WHERE id = ${id} OR idChurch = ${id});
      `),
      sequelize.query(`
        SELECT 
          COUNT(DISTINCT U.id) AS total_teachers
        FROM 
          User U
          INNER JOIN User_PermissionLevel UP ON U.id = UP.idUser
        WHERE 
          (UP.idPermissionLevel = 4 OR UP.idPermissionLevel = 5) 
          AND U.idChurch IN (SELECT id FROM Church WHERE id =${id} OR idChurch = ${id});
      `),
      sequelize.query(`
        SELECT 
          COUNT(DISTINCT U.id) AS total_users_except_students
        FROM 
          User U
          LEFT JOIN User_PermissionLevel UP ON U.id = UP.idUser
        WHERE 
          (UP.idPermissionLevel != 7 OR UP.idPermissionLevel IS NULL) 
          AND U.idChurch IN (SELECT id FROM Church WHERE id = ${id} OR idChurch = ${id})
      `),
      sequelize.query(`
        SELECT COUNT(DISTINCT U.id) AS total_users
        FROM User U
        WHERE U.idChurch IN (SELECT id FROM Church WHERE id =  ${id} OR idChurch =  ${id});
      `),
      sequelize.query(`
        SELECT COUNT(*) AS total 
        FROM Team 
        WHERE idChurch IN (SELECT id FROM Church WHERE id = ${id} OR idChurch = ${id});
      `),
      sequelize.query(`
        SELECT MAX(dateClass) AS last_lesson 
        FROM Classroom 
        WHERE idChurch = ${id};
      `),
      sequelize.query(`
        SELECT 
          COUNT(DISTINCT U.id) AS total_users_except_students
        FROM 
          User U
          LEFT JOIN User_PermissionLevel UP ON U.id = UP.idUser
        WHERE 
          (UP.idPermissionLevel != 7 OR UP.idPermissionLevel IS NULL) 
          AND U.idChurch = ${id};
      `),
      sequelize.query(`
        SELECT COUNT(*) AS total 
        FROM User 
        WHERE idChurch = ${id};
      `),
      sequelize.query(`
        SELECT datePlan
        FROM Church 
        WHERE id = ${id} AND idChurch IS NULL
      `),
      sequelize.query(`
      SELECT u.id, u.name, u.email, u.contact 
      FROM User u 
      JOIN User_PermissionLevel up ON u.id = up.idUser
      WHERE u.idChurch = ${id} AND up.idPermissionLevel = 1`),
    ]);

    if (churchData[0].length === 0) {
      return [];
    }

    const data: ChurchInfo = {
      churchData: churchData[0][0] as any,
      branchesTotal: (branchesTotal[0][0] as any).total,
      totalStudents: (totalStudents[0][0] as any).total_students,
      totalTeachers: (totalTeachers[0][0] as any).total_students,
      matrixTeams: (matrixTeams[0][0] as any).total,
      matrizClasses: (matrizClasses[0][0] as any).total,
      studentsMatrixAndBranch: (studentsMatrixAndBranch[0][0] as any)
        .total_students,
      teachersMatrixAndBranch: (teachersMatrixAndBranch[0][0] as any)
        .total_students,
      totalUsersExceptStudents: (totalUsersExceptStudents[0][0] as any)
        .total_users_except_students,
      totalUsers: (totalUsers[0][0] as any).total_users,
      totalTeamsMatrixAndBranches: (totalTeamsMatrixAndBranches[0][0] as any)
        .total,
      lastLesson: (lastLesson[0][0] as any).last_lesson,
      totalMatrixUsersExceptStudents: (
        totalMatrixUsersExceptStudents[0][0] as any
      ).total_users_except_students,
      totalMatrizUsers: (totalMatrizUsers[0][0] as any).total,
      dateplan: (dateplan[0][0] as any).datePlan,
      churchAdmins: churchAdmins[0],
    };

    return data;
  }

  async findMembers(id: number) {
    const data = await sequelize.query(
      `SELECT name,email,functionChurch,contact FROM User WHERE idChurch = ?`,
      {
        replacements: [id],
      },
    );

    return data[0];
  }
  async findChurchAdmins(id: number) {
    const data = await sequelize.query(
      `SELECT u.id, u.name, u.email, u.contact 
      FROM User u 
      JOIN User_PermissionLevel up ON u.id = up.idUser
      WHERE u.idChurch = ? AND up.idPermissionLevel = 1;
      `,
      {
        replacements: [id],
      },
    );

    return data[0];
  }

  async findSingleMember(id: number) {
    const data = await sequelize.query(`SELECT * FROM User WHERE id = ?`, {
      replacements: [id],
    });

    return data[0];
  }
}
