import { Order } from "../domain/order";
import { OrderStatus } from "../domain/order-status";
import { PaymentService } from "./pyament.service";
import { InventoryService } from "./inventory.service";
import { EmailService } from "./email.service";

export class OrderService {
  constructor(
    private payment: PaymentService,
    private inventory: InventoryService,
    private email: EmailService
  ) {}

  async placeOrder(order: Order): Promise<void> {
    try {
      await this.payment.pay(order.id);
      order.markPaid();

      await this.inventory.reserve(order.id);

      order.confirm();
      await this.email.sendConfirmation(order.id);

    } catch (error) {
      order.fail();
      throw error;
    }
  }
}
