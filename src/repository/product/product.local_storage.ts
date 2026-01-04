import { Product } from "../../domain/product";
import { IProductRepository } from "./product_repository";

export class LocalProductRepository implements IProductRepository{

    async findAll(): Promise<Product[]>{
        return [
            {name: "Hammer", price: 200},
            {name: "Computer", price: 1000},
            {name: "Coffee", price: 45},
        ];
    }
    async find(name: string): Promise<Product | undefined>{
        return {
            name: "Hammer", 
            price : 200
        }
    } 
}