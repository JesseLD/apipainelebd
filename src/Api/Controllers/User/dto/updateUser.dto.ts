/**
 * DTO for updating a user and acess their attributes
 */

export class UpdateUserDTO {
  id: number;
  email: string;
  name: string;

  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}
