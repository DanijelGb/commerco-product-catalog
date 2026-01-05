import { PaymentGateway } from "../infra/payment.gateway";

export class PaymentService {
  constructor(private gateway: PaymentGateway) {}

  async pay(orderId: string): Promise<void> {
    await this.gateway.charge(orderId);
  }
}
