import { CartService } from "./cart.service";

export class CartCalculator {
    private cartService = new CartService();

    async getTotalPrice(): Promise<number> {
        const items = this.cartService.getCart();
        let total = 0;
        for (const item of items) {
            total += (item.price ?? 0) * item.quantity;
        }

        if ( total > 200 ) {
            total = total * 0.9; // Apply 10% discount for orders over $200
        }
        return total;
    }
}