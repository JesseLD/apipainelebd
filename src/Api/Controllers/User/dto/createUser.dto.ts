/**
 * Create User DTO and acess their attributes
 */

export class CreateUserDTO {
  id: number = 0;
  email: string;
  name: string;

  constructor(name: string, email: string) {
    this.email = email;
    this.name = name;
  }
}
