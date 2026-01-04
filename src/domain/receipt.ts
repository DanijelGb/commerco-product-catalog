import { Product } from "./product";
import { PromoCode } from "./promo_code";

export interface Receipt{
    total: number,
    items: Product[],
}