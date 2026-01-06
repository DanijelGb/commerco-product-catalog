import { Product } from "../domains/product";

export interface Order{
    totalWithFee: number,
    fee: number,
    items: Product[],
}