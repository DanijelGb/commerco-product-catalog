import { ShippingRules } from "../schemas/shipping_rules";

export interface IShippingRulesRepository{
    find(country: string): ShippingRules 

    findAll(): ShippingRules[]
}