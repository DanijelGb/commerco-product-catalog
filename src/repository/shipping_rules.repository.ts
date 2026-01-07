import { ShippingRules } from "../schemas/shipping_rules";

export interface IShippingRulesRepository{
    find(country: string): Promise<ShippingRules | undefined>;

    findAll(): Promise<ShippingRules[]>
}