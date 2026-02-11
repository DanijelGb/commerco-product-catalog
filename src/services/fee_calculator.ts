import { IShippingRulesRepository } from "../repository/shipping_rules.repository";
import { Country } from "../schemas/country";
import { ShippingRulesNO, ShippingRulesSE, } from "../schemas/shipping_rules";

export class FeeCalculator{

    constructor(private shippingRepo: IShippingRulesRepository) {}

    async calculateFee(amount: number, weight: number, country: Country): Promise<number>{
        const rules = await this.shippingRepo.find(country) 

            switch (rules.country) {
                case "SE":
                    return this.calculateSE(amount, weight, rules)
                case "NO":
                    return this.calculateNO(amount, weight, rules)
                case "US":
                default:
                    return rules.startingFee;
            }
        }

    private calculateSE(amount: number, weight: number, rules: ShippingRulesSE): number {
        let fee = rules.startingFee;

        if(amount <= rules.shippingAmountThreshold) {fee += rules.lowOrderFee;}
        if(weight > rules.lightPackage) {fee += rules.heavyPackageFee;}

        return fee;
    }

    private calculateNO(amount: number, weight: number, rules: ShippingRulesNO): number {

        let fee = amount > rules.shippingAmountThreshold ? rules.lowOrderFee : rules.highOrderFee

        if (weight > rules.heavyPackage) {fee += rules.extraHeavyPackageFee}
        else if(weight > rules.lightPackage) {fee = rules.heavyPackageFee} 

        return fee;
    }
}