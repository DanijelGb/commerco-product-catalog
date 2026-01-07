import { IShippingRulesRepository } from "../../src/repository/shipping_rules.repository";
import { ShippingRules } from "../../src/schemas/shipping_rules";
import { Country } from "../../src/schemas/country";

export class ShippingRulesMockRepository implements IShippingRulesRepository{

    async find(country: Country): Promise<ShippingRules>{
        const rules = shipping_rules.find(r => r.country === country)

        if (!rules) {
            throw new Error(`No shipping rules for ${country}`);
        }

        return rules
    }

    async findAll(): Promise<ShippingRules[]>{
        return shipping_rules
    }
}

const shipping_rules: ShippingRules[] = [
    {
        country: "SE",
        startingFee: 0,
        shippingAmountThreshold: 500,
        lightPackage: 20,
        lowOrderFee: 59,
        heavyPackageFee: 200,
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
    },
    {
        country: "FI",
        startingFee: 199, 
    }
]
