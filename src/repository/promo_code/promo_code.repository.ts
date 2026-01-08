import { PromoCode } from "../../domain/promo_code";

export interface IPromoCodeRepository{
    findAll(): Promise <PromoCode[]>;

    find(code: string): Promise <PromoCode>;
}