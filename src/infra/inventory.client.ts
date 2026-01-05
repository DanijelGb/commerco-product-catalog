// simulated external inventory client
export class InventoryClient {
  async reserve(orderId: string): Promise<void> {
    if (Math.random() < 0.3) {
      throw new Error("Inventory unavailable");
    }
  }
}
