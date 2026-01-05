// simulated external payment gateway
export class PaymentGateway {
  async charge(orderId: string): Promise<void> {
    if (Math.random() < 0.2) {
      throw new Error("Payment authorization failed");
    }
  }
}
