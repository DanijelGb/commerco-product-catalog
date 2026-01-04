import { Product } from "../domain/product";
import { PromoCode } from "../domain/promo_code";

export interface ICart{

    addProduct(product: Product): void

    getProducts(): Product[]

    getTotal(): number

    deactivatePromo(): void;

    activatePromo(promo: PromoCode): void;

    promoDiscount(): void;

    getPromo(): PromoCode | undefined
}