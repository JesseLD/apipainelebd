export class UpdatePlanDTO {
  id: number;
  name: string;
  price: number;
  duration: number;
  description: string;
  maxStudents: number;
  maxBranches: number;
  constructor(
    id: number,
    name: string,
    price: number,
    duration: number,
    description: string,
    maxStudents: number,
    maxBranches: number
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.duration = duration;
    this.description = description;
    this.maxStudents = maxStudents;
    this.maxBranches = maxBranches;
  }
}
