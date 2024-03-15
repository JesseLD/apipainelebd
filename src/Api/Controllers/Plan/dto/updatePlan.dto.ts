export class UpdatePlanDTO {
  id: number;
  name: string;
  price: number;
  duration: number;
  description: string;

  constructor(
    id: number,
    name: string,
    price: number,
    duration: number,
    description: string,
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.duration = duration;
    this.description = description;
  }
}
