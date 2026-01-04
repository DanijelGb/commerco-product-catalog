import { IPromoCodeRepository } from "../repository/promo_code/promo_code.repository"
import { IPromoService } from "../interfaces/ipromo_service";
import { PromoCode } from "../domain/promo_code";
import { IUser } from "../interfaces/iuser";

export class PromoService implements IPromoService{

    constructor(private promoRepo: IPromoCodeRepository){
    }

    async fetchAndValidate(user: IUser, code: string): Promise<PromoCode> {
        
        const promoCode = await this.promoRepo.find(code);
        if (!promoCode) {
            throw new Error("Promo code not found")
        }
        
        const usedPromo = user.promoUsed(code);
        if (usedPromo) {
            throw new Error("Promo code has already been used");
        }

        return promoCode;
    }
}