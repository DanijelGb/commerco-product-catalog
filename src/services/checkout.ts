import { Receipt } from "../domain/receipt";
import { IPromoService } from "../interfaces/ipromo_service";
import { IUser } from "../interfaces/iuser";
import { Result } from "../domain/result";

export class Checkout{

    constructor(
        private promoService: IPromoService, 
    ){}

    async placeOrder(user: IUser): Promise<Result<Receipt>> {

        const cart = user.getCart()
        const total = cart.getTotal();

        if (!user.canAfford(total)) {
            return { ok: false, error: "Insufficient funds" };
        }

        user.pay(total);

        const promo = cart.getPromo()
        if (promo) {
            user.addPromoCode(promo.code)
        }

        return {
            ok: true,
            value: {
                total: total,
                items: cart.getProducts(),
            }
        }
    }

    async deactivatePromo(user: IUser){
        const cart = user.getCart();
        cart.deactivatePromo();
    }

    async applyPromo(user:IUser, code: string) {
        const validPromo = await this.promoService.fetchAndValidate(user, code);

        const cart = user.getCart();
        cart.activatePromo(validPromo)
    }
}