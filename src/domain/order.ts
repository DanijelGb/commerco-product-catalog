import { OrderStatus } from "./order-status";

export class Order {
  constructor(
    public readonly id: string,
    public status: OrderStatus = OrderStatus.CREATED
  ) {}

  markPaid() {
    this.status = OrderStatus.PAID;
  }

  confirm() {
    this.status = OrderStatus.CONFIRMED;
  }

  fail() {
    this.status = OrderStatus.FAILED;
  }
}
