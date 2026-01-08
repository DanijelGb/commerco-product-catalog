import { Product } from "../../domain/product";

export interface IProductRepository{
    findAll(): Promise<Product[]>;

    find(id: number): Promise<Product | undefined>;
}