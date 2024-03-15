import { CreateUserDTO } from "../../Controllers/User/dto/createUser.dto";
import { UpdateUserDTO } from "../../Controllers/User/dto/updateUser.dto";

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
    return { message: "Return all users" };
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
    return { message: "Create new user" };
  }

  /**
   *
   * @param updateUserDTO Should be provided a name, email and id
   * @returns An Object of the updated user
   */
  async update(updateUserDTO: UpdateUserDTO) {
    return { message: `Update user with id ${updateUserDTO.id}` };
  }

  /**
   *
   * @param id Should be provided an id
   * @returns A message of the deleted user
   */
  async delete(id: string) {
    return { message: `Delete user with id ${id}` };
  }
}
