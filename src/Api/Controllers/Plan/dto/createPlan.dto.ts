export class CreatePlanDTO {
  id: number = 0;
  name: string;
  price: number;
  duration: number;
  description: string;

  constructor(
    name: string,
    price: number,
    duration: number,
    description: string,
  ) {
    this.name = name;
    this.price = price;
    this.duration = duration;
    this.description = description;
  }
}
