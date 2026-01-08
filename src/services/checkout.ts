import { Receipt } from "../domain/receipt";
import { IPromoService } from "../interfaces/ipromo_service";
import { IUserRepository } from "../repository/user/user.repository";
import { ICartRepository } from "../repository/cart/cart.repository";

export class Checkout{

    constructor(
        private promoService: IPromoService, 
        private userRepo: IUserRepository, 
        private cartRepo: ICartRepository
    ){}

    async placeOrder(userId: string): Promise<Receipt> {

        const user = await this.userRepo.find(userId);
        const cart = await this.cartRepo.find(user.cartId)

        let total = await this.cartRepo.getTotalPrice(user.cartId)

        if (total === 0){
            throw new Error("No products in cart")
        }

        if (user.balance < total) {
            throw new Error("Insufficient balance")
        }

        const promo = cart.activePromoId;
        if (promo) {
            total = await this.promoService.applyDiscount(promo, total)
            await this.userRepo.addPromo(promo, userId)
            await this.deactivatePromo(user.cartId)
        }
        
        user.balance -= total;

        return {
            total: total,
            items: cart.products
        }
    }

    async deactivatePromo(cartId: string){
        const cart = await this.cartRepo.find(cartId)
        cart.activePromoId = undefined;
    }

    async applyPromo(userId: string, code: string) {

        const promoConsumed = await this.userRepo.findPromo(code, userId);
        if(promoConsumed) {
            throw new Error("Promo has already been consumed")
        }

        try {
            const promo = await this.promoService.getPromo(code);

            const user = await this.userRepo.find(userId);
            const cart = await this.cartRepo.find(user.cartId)
            cart.activePromoId = promo.code;

        } catch (error) {
            throw new Error("Promo code does not exist")
        }

    }
}