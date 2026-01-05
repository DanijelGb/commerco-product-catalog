import { User } from "../domains/user";
import { Order } from "../models/order";
import { Result } from "../models/result";
import { FeeCalculator } from "./fee_calculator";

export class Checkout{

    async viewOrder(user: User, feeCalculator: FeeCalculator): Promise<Result<Order>>{

        const cart = user.getCart()
        const totalWeight = cart.getTotalWeight();
        const totalPrice = cart.getTotalPrice();
        const country = user.getCountry();

        const fee = await feeCalculator.calculate(totalPrice, totalWeight, country);
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