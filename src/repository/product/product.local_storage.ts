import { Product } from "../../domain/product";
import { IProductRepository } from "./product_repository";

export class LocalProductRepository implements IProductRepository{

    private products: Product[] = [
        {id: 1, name: "Hammer", price: 200},
        {id: 2, name: "Computer", price: 1000},
        {id: 3, name: "Coffee", price: 45},
    ]

    async findAll(): Promise<Product[]>{
        return this.products
    }
    async find(id: number): Promise<Product | undefined>{
        return this.products.find(p => p.id === id)
    } 
}
