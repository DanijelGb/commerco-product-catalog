import { IShippingRulesRepository } from "../repository/shipping_rules.repository";
import { Country } from "../schemas/country";
import { ShippingRules } from "../schemas/shipping_rules";

export class FeeCalculator{

    constructor(private shippingRepo: IShippingRulesRepository) {}

    calculateFee(amount: number, weight: number, country: Country): number{
        const rulesToken = this.shippingRepo.find(country)

        switch (country) {
            case "SE":
                return this.calculateSE(amount, weight, rulesToken)
            case "NO":
                return this.calculateNO(amount, weight, rulesToken)
            case "US":
                return rulesToken.startingFee!;
            default:
                return rulesToken.startingFee!;
        }
    }

    private calculateSE(amount: number, weight: number, token: ShippingRules): number {
        let fee = token.startingFee!;

        if(amount <= token.shippingAmountThreshold!) {fee += token.lowOrderFee!;}
        if(weight > token.lightPackage!) {fee += token.heavyPackageFee!;}

        return fee;
    }

    private calculateNO(amount: number, weight: number, token: ShippingRules): number {

        let fee = amount > token.shippingAmountThreshold! ? token.lowOrderFee! : token.highOrderFee!

        if (weight > token.heavyPackage!) {fee += token.extraHeavyPackageFee!}
        else if(weight > token.lightPackage!) {fee = token.heavyPackageFee!} 

        return fee;
    }
}