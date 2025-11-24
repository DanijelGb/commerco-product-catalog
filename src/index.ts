import { CartService } from "./cart/cart.service";

const cart = new CartService();

cart.addToCart({ productId: "p1", quantity: 2 });
console.log(cart.getCart());