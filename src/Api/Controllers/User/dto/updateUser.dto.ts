/**
 * DTO for updating a user and acess their attributes
 */

export class UpdateUserDTO {
  id: number;
  email: string;
  name: string;
  password: string;
  
  constructor(id: number, name: string, email: string, password: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
export class UpdateUserNameDTO {
  id: number;
  email: string;
  name: string;

  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}
export class UpdateUserPassDTO {
  id: number;
  email: string;
  password: string;

  constructor(id: number, email: string, password: string) {
    this.id = id;
    this.email = email;
    this.password = password;
  }
}
