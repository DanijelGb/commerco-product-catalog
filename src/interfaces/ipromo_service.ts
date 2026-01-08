import { PromoCode } from "../domain/promo_code";

export interface IPromoService{
    getPromo(code: string): Promise<PromoCode>;

    applyDiscount(code: string, total: number): Promise<number>
}