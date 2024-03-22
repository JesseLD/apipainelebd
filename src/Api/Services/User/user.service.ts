import { CreateUserDTO } from "../../Controllers/User/dto/createUser.dto";
import {
  UpdateUserDTO,
  UpdateUserNameDTO,
  UpdateUserPassDTO,
} from "../../Controllers/User/dto/updateUser.dto";
// import { sequelize } from "../../Database/sequelize";
// import { prisma } from "../../Database/prisma";
import prisma from "../../Database/prisma";
import bcrypt from "bcryptjs";

/**
 *
 * User service class
 */
export class UserService {
  /**
   *
   * @returns Array of users from database
   */
  async findAll() {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  /**
   *
   * @param id Should be provided an id
   * @returns A single user from database
   */
  async findOne(id: string) {
    return { message: `Return user with id ${id}` };
  }

  /**
   *
   * @param createUserDTO Should be provided a name and email
   * @returns An Object of the created user
   */
  async create(createUserDTO: CreateUserDTO) {
    const exists = await prisma.user.findUnique({
      where: {
        email: createUserDTO.email,
      },
    });

    if (exists) {
      return { message: "User already exists", status: 400 };
    } else {
      const hashedPassword = await bcrypt.hash(createUserDTO.password, 10);
      await prisma.user.create({
        data: {
          name: createUserDTO.name,
          email: createUserDTO.email,
          password: hashedPassword,
        },
      });
    }
    return {
      message: "Usuário criado com sucesso",
      status: 200,
    };
  }

  /**
   *
   * @param updateUserNameDTO Should be provided a name, email and id
   * @returns An Object of the updated user
   */
  async updateUserName(updateUserNameDTO: UpdateUserNameDTO) {
    const exists = await prisma.user.findUnique({
      where: {
        id: updateUserNameDTO.id,
      },
    });

    if (!exists) {
      return { message: "User not found", status: 404 };
    } else {
      try {
        await prisma.user.update({
          data: {
            name: updateUserNameDTO.name,
          },
          where: {
            id: updateUserNameDTO.id,
          },
        });

        return {
          message: "Usuário atualizado",
          status: 200,
        };
      } catch (e: any) {
        return {
          message: "Internal Server Error",
          error: e.message,
          status: 400,
        };
      }
    }
  }
  async updateUserPass(updateUserPass: UpdateUserPassDTO) {
    const exists = await prisma.user.findUnique({
      where: {
        id: updateUserPass.id,
      },
    });

    if (!exists) {
      return { message: "User not found", status: 404 };
    } else {
      try {
        const hashedPassword = await bcrypt.hash(updateUserPass.password, 10);
        await prisma.user.update({
          data: {
            password: hashedPassword,
          },
          where: {
            id: updateUserPass.id,
          },
        });

        return {
          message: "Usuário atualizado",
          status: 200,
        };
      } catch (e: any) {
        return {
          message: "Internal Server Error",
          error: e.message,
          status: 400,
        };
      }
    }
  }

  /**
   *
   * @param id Should be provided an id
   * @returns A message of the deleted user
   */
  async delete(id: string) {
    try {
      await prisma.user.delete({
        where: {
          id: Number(id),
        },
      });
    } catch (e) {
      return {
        name: "Erro ao deletar usuário",
        status: 400,
      };
    }
    // return { message: `Delete user with id ${id}` };
  }

  async getProfile(email: string) {
    try {
      const user = await prisma.user.findUnique({
        select: {
          id: true,
          name: true,
          email: true,
        },
        where: {
          email,
        },
      });

      if (!user) {
        return {
          message: "User not found",
          status: 400,
        };
      }
      return {
        user,
      };
    } catch (e) {
      return {
        name: "Internal Server Error",
        status: 400,
      };
    }
  }
}
