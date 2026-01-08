import { ICartRepository } from "./cart.repository";
import { Cart } from "../../domain/cart";
import { Product } from "../../domain/product";

export class CartLocalStorage implements ICartRepository{

    private carts: Cart[] = []

    async addProduct(id: string, product: Product){
        const cart = await this.find(id);

        cart.products.push(product);
    }

    async getTotalPrice(id: string): Promise<number>{
        const cart = await this.find(id);
        const totalPrice = cart.products.reduce((sum, p) => sum + p.price, 0);

        return totalPrice;
    }

    async removeProduct(id: string, productId: number){
        const cart = await this.find(id);

        cart.products.filter(p => p.id !== productId)
    }

    async add(cart: Cart): Promise<void> {
        this.carts.push(cart)
    }

    async find(id: string): Promise<Cart> {
        const cart = this.carts.find(c => c.id === id)

        if(!cart) {
            throw new Error("Cart does not exist")
        }

        return cart
    }
}