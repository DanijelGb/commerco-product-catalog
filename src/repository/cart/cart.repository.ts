import { Cart } from "../../domain/cart";
import { Product } from "../../domain/product";

export interface ICartRepository{

    add(cart: Cart): Promise<void>;

    find(id: string): Promise<Cart>

    addProduct(id: string, product: Product): Promise<void>

    getTotalPrice(id: string): Promise<number>

    removeProduct(id: string, productId: number): Promise<void>
}