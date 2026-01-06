import { Product } from "../domains/product";

export interface ICart{

    addProduct(product: Product): void

    getProducts(): Product[]

    getTotalWeight(): number

    getTotalPrice(): number
}