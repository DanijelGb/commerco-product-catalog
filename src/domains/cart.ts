import { Product } from "./product";

export class Cart{

    private products: Product[] = [];

    addProduct(product: Product) {
        this.products.push(product);
    }

    getProducts() {
        this.products;
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