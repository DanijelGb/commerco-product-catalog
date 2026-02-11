import { IPromoCodeRepository } from "../repository/promo_code/promo_code.repository"
import { IPromoService } from "../interfaces/ipromo_service";
import { PromoCode } from "../domain/promo_code";

export class PromoService implements IPromoService{

    constructor(private promoRepo: IPromoCodeRepository){
    }

    async applyDiscount(code: string, total: number): Promise<number> {

        const promo = await this.promoRepo.find(code);

        total = this.calculateDiscount(total, promo)

        return total;
    }

    private calculateDiscount(total: number, promo: PromoCode): number{

        switch (promo.type) {
            case "multiply":
                return total * promo.discount;
            case "subtract":
                return total - promo.discount;
            default:
                throw new Error(`Unsupported promo type: ${promo.type}`);
        }
    }

    async getPromo(code: string): Promise<PromoCode> {
        
        const promoCode = await this.promoRepo.find(code);
        if (!promoCode) {
            throw new Error("Promo code not found")
        }


        return promoCode;
    }
}