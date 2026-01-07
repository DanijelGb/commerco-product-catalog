import { ShippingRules } from "../schemas/shipping_rules";

const shipping_rules = [
    {
        country: "NO",
        startingFee: undefined,
        shippingAmountThreshold: 500,
        lightPackage: 20,
        heavyPackage: undefined,
        lowOrderFee: 59,
        highOrderFee: undefined,
        heavyPackageFee: 200,
        extraHeavyPackageFee: undefined
    },
    {
        country: "SE",
        startingFee: undefined,
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
        startingFee: undefined, 
        shippingAmountThreshold: undefined,
        lightPackage: undefined,
        heavyPackage: undefined,
        lowOrderFee: undefined,
        highOrderFee: undefined,
        heavyPackageFee: undefined,
        extraHeavyPackageFee: undefined 
    }
]


export class LocalShippingRulesRepository{

    async find(country: string): Promise<ShippingRules | undefined> {
        return shipping_rules.find(r => r.country === country)

    }

    async findAll(): Promise<ShippingRules[]>{
        return shipping_rules;
    }
}