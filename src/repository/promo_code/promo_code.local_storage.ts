import { PromoCode } from "../../domain/promo_code";
import { IPromoCodeRepository } from "./promo_code.repository";

export class LocalPromoCodeRepository implements IPromoCodeRepository{

    private promos: PromoCode[] = [
        {code: "SALE10", discount: 0.1, type: "multiply"},
        {code: "FREESHIP", discount: 50, type: "subtract"},
        {code: "VIP50", discount: 0.5, type: "multiply"}
    ];

    async findAll(): Promise<PromoCode[]> {
        return this.promos;
    }
    async find(code: string): Promise<PromoCode | undefined> {
        return this.promos.find(p => p.code === code)
    }
}