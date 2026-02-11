import { ICart } from "../interfaces/icart";
import { Product } from "./product";

export class Cart implements ICart{

    private products: Product[] = [];

    addProduct(product: Product) {
        this.products.push(product);
    }

    getProducts(): Product[]{
        return this.products;
    }

    getTotalWeight(): number {
        return this.products.reduce(
            (sum, product) => sum + product.getWeight(),
            0
        );
    }

    getTotalPrice(): number {
        return this.products.reduce(
            (sum, product) => sum + product.getPrice(),
            0
        );
    }
}