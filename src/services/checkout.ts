import { User } from "../domains/user";
import { Order } from "../schemas/order";
import { Result } from "../schemas/result";
import { FeeCalculator } from "./fee_calculator";

export class Checkout{

    constructor(private feeCalculator: FeeCalculator){}

    async viewOrder(user: User): Promise<Result<Order>>{

        const cart = user.getCart()

        const fee = await this.feeCalculator.calculateFee(
            cart.getTotalPrice(),
            cart.getTotalWeight(),
            user.getCountry()
        );

        const totalWithFee = cart.getTotalPrice() + fee;

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