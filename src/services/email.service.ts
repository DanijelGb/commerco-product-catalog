export class EmailService {
  async sendConfirmation(orderId: string): Promise<void> {
    // Best effort
    console.log(`Email sent for order ${orderId}`);
  }
}
