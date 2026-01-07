import { FeeCalculator } from "../../src/services/fee_calculator";
import { ShippingRulesMockRepository } from "../mocks/shipping_rules.mock.repository";

function initFeeCalculator(): FeeCalculator{

    const rulesRepo = new ShippingRulesMockRepository;
    return new FeeCalculator(rulesRepo);
}

describe("Test fee_calculator to work as intended", () => {
    it("expects free shipping when TotalAmount > 500 and TotalWeight < 20 when country is 'SE'", async () => {
        const feeCalculator = initFeeCalculator();

        const totalAmount = 501;
        const totalWeight = 19;

        const shippingFee = await feeCalculator.calculateFee(totalAmount, totalWeight, "SE");

        expect(shippingFee).toBe(0);

    })

    it("should be 299 in all cases if weight between 30 and 50 (non including) when country is 'NO'", async () => {
        const feeCalculator = initFeeCalculator();

        let totalAmount = 1001;
        let totalWeight = 49;

        let shippingFee = await feeCalculator.calculateFee(totalAmount, totalWeight, "NO");

        expect(shippingFee).toBe(299);

        totalAmount = 103;
        totalWeight = 31;

        shippingFee = await feeCalculator.calculateFee(totalAmount, totalWeight, "NO");
        
        expect(shippingFee).toBe(299);
    })

    it("should be 649 when TotalAmount > 1000 and TotalWeight > 50 when country is 'NO'", async () => {
        const feeCalculator = initFeeCalculator();

        const totalAmount = 1001;
        const totalWeight = 51;

        const shippingFee = await feeCalculator.calculateFee(totalAmount, totalWeight, "NO");

        expect(shippingFee).toBe(649);
    })

    it("should always be 499 when country is 'US'", async () => {
        const feeCalculator = initFeeCalculator();

        let totalAmount = 1001;
        let totalWeight = 51;

        let shippingFee = await feeCalculator.calculateFee(totalAmount, totalWeight, "US");

        expect(shippingFee).toBe(499);

        totalAmount = 50
        totalWeight = 3

        shippingFee = await feeCalculator.calculateFee(totalAmount, totalWeight, "US")

        expect(shippingFee).toBe(499);
        
    })
})