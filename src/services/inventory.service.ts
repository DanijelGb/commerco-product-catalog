import { InventoryClient } from "../infra/inventory.client";

export class InventoryService {
  constructor(private client: InventoryClient) {}

  async reserve(orderId: string): Promise<void> {
    await this.client.reserve(orderId);
  }
}
