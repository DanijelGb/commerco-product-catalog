import { Product } from "./product";

export interface Receipt{
    total: number,
    items: Product[],
}