import { Product } from "../../domain/product";

export interface IProductRepository{
    findAll(): Promise<Product[]>;

    find(name: string): Promise<Product | undefined>;
}