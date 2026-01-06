import { User } from "../domains/user";
import { Order } from "../schemas/order";
import { Result } from "../schemas/result";
import { FeeCalculator } from "./fee_calculator";

export class Checkout{

    constructor(private feeCalculator: FeeCalculator){}

    async viewOrder(user: User): Promise<Result<Order>>{

        const cart = user.getCart()
        const totalWeight = cart.getTotalWeight();
        const totalPrice = cart.getTotalPrice();
        const country = user.getCountry();

        const fee = await this.feeCalculator.calculateFee(totalPrice, totalWeight, country);
        const totalWithFee = totalPrice + fee;

        return {
            ok: true,
            value: {
                totalWithFee,
                fee,
                items: cart.getProducts()
            }
        };
    } 
}