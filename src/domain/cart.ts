import { ICart } from "../interfaces/icart";
import { Product } from "../domain/product";
import { PromoCode } from "../domain/promo_code";

export class Cart implements ICart{

    private products: Product[] = []
    private promo: PromoCode | undefined;
    
    addProduct(product: Product) {
        this.products.push(product);
    }

    getProducts(): Product[]{
        return this.products
    }

    getPromo(): PromoCode | undefined{
        return this.promo
    }

    getTotal(): number {
        let total = this.calculateTotal();

        if (this.promo) {
            total -= this.promoDiscount();
        }

        return total
    }

    calculateTotal(): number {
        let total = this.products.reduce(
            (total, p) => total + p.price, 0
        )

        return total;
    }

    promoDiscount(): number {
        let total = this.calculateTotal();

        switch (this.promo?.type) {
            case "multiply":
                return total * this.promo.discount;
            case "subtract":
                return this.promo.discount;
            default:
                return 0
        }
    }

    activatePromo(promo: PromoCode) {
        this.promo = promo;
    }

    deactivatePromo() {
        this.promo = undefined;
    }

}