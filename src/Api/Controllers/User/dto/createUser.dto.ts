/**
 * Create User DTO and acess their attributes
 */

export class CreateUserDTO {
  id: number = 0;
  email: string;
  name: string;
  password: string;

  constructor(name: string, email: string, password: string) {
    this.email = email;
    this.name = name;
    this.password = password;
  }
}
