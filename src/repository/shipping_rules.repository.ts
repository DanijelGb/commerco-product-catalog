import { Country } from "../schemas/country";
import { ShippingRules } from "../schemas/shipping_rules";

export interface IShippingRulesRepository{
    find(country: Country): Promise<ShippingRules>;

    findAll(): Promise<ShippingRules[]>
}