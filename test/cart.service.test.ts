import { CartService } from "../src/cart/cart.service";

describe("CartService", () => {
    it("should add items to the cart", () => {
        const service = new CartService();

        service.addToCart({ productId: "p1", quantity: 2 });

        const cart = service.getCart();
        expect(cart.length).toBe(1);
        expect(cart[0].quantity).toBe(2);
    });
});