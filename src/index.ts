import { Order } from "./domain/order";
import { OrderService } from "./services/order.service";
import { PaymentService } from "./services/pyament.service";
import { InventoryService } from "./services/inventory.service";
import { EmailService } from "./services/email.service";
import { PaymentGateway } from "./infra/payment.gateway";
import { InventoryClient } from "./infra/inventory.client";

const orderService = new OrderService(
  new PaymentService(new PaymentGateway()),
  new InventoryService(new InventoryClient()),
  new EmailService()
);

(async () => {
  const order = new Order("order-123");

  try {
    await orderService.placeOrder(order);
    console.log("Order completed:", order.status);
  } catch {
    console.log("Order failed:", order.status);
  }
})();
