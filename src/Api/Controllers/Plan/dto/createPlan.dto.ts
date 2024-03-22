export class CreatePlanDTO {
  id: number = 0;
  name: string;
  price: number;
  duration: number;
  description: string;
  maxStudents: number;
  maxBranches: number;

  constructor(
    name: string,
    price: number,
    duration: number,
    description: string,
    maxStudents: number,
    maxBranches: number
  ) {
    this.name = name;
    this.price = price;
    this.duration = duration;
    this.description = description;
    this.maxStudents = maxStudents;
    this.maxBranches = maxBranches;
  }
}
