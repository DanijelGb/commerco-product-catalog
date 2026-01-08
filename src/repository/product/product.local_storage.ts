import { Product } from "../../domain/product";
import { IProductRepository } from "./product_repository";

export class LocalProductRepository implements IProductRepository{

    private products: Product[] = [
        {name: "Hammer", price: 200},
        {name: "Computer", price: 1000},
        {name: "Coffee", price: 45},
    ]

    async findAll(): Promise<Product[]>{
        return this.products
    }
    async find(name: string): Promise<Product | undefined>{
        return this.products.find(p => p.name === name)
    } 
}
