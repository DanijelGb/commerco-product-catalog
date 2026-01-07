import { IShippingRulesRepository } from "../../src/repository/shipping_rules.repository";
import { ShippingRules } from "../../src/schemas/shipping_rules";

export class ShippingRulesMockRepository implements IShippingRulesRepository{

    async find(country: string): Promise<ShippingRules | undefined>{
        return shipping_rules.find(r => r.country === country);
    }

    async findAll(): Promise<ShippingRules[]>{
        return shipping_rules
    }
}

const shipping_rules = [
    {
        country: "SE",
        startingFee: 0,
        shippingAmountThreshold: 500,
        lightPackage: 20,
        heavyPackage: undefined,
        lowOrderFee: 59,
        highOrderFee: undefined,
        heavyPackageFee: 200,
        extraHeavyPackageFee: undefined
    },
    {
        country: "NO",
        startingFee: 0,
        shippingAmountThreshold: 1000,
        lightPackage: 30,
        heavyPackage: 50,
        lowOrderFee: 149,
        highOrderFee: 99,
        heavyPackageFee: 299,
        extraHeavyPackageFee: 500
    },
    {
        country: "US",
        startingFee: 499,
        shippingAmountThreshold: undefined,
        lightPackage: undefined,
        heavyPackage: undefined,
        lowOrderFee: undefined,
        highOrderFee: undefined,
        heavyPackageFee: undefined,
        extraHeavyPackageFee: undefined 
    },
    {
        country: "FI",
        startingFee: 199, 
        shippingAmountThreshold: undefined,
        lightPackage: undefined,
        heavyPackage: undefined,
        lowOrderFee: undefined,
        highOrderFee: undefined,
        heavyPackageFee: undefined,
        extraHeavyPackageFee: undefined 
    }
]
