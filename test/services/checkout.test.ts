import { Cart } from "../../src/domains/cart";
import { Product } from "../../src/domains/product";
import { User } from "../../src/domains/user";
import { Checkout } from "../../src/services/checkout";
import { FeeCalculator } from "../../src/services/fee_calculator";
import { ShippingRulesMockRepository } from "../mocks/shipping_rules.mock.repository";


describe("Checkout orchestrates correctly", () => {
    it("should return result.ok is true and shipping fee is 199 when country is 'FI'", async () => {
        const prod = new Product(50, 100, "Hammer");

        const cart = new Cart();
        cart.addProduct(prod);

        const user = new User("FI", cart)

        const rulesRepo = new ShippingRulesMockRepository;
        const feeCalculator = new FeeCalculator(rulesRepo);
        const checkout = new Checkout(feeCalculator)

        const result = await checkout.viewOrder(user);

        expect(result.ok).toBe(true);

        if(!result.ok){
            throw new Error("Expected result.ok to be true but was false")
        }

        expect(result.value.fee).toBe(199);
    });
});