import { FeeCalculator } from "../../src/services/fee_calculator";

describe("Test fee_calculator to work as intended", () => {
    it("expects free shipping when TotalAmount > 500 and TotalWeight < 20 when country is 'SE'", async () => {
        const feeCalculator = new FeeCalculator()

        const totalAmount = 501;
        const TotalWeight = 19;

        const shippingFee = feeCalculator.calculateFee(totalAmount, TotalWeight, "SE");

        expect(shippingFee).toBe(0);

    })

    it("should be 299 in all cases if weight between 30 and 50 (non including) when country is 'NO'", async () => {
        const feeCalculator = new FeeCalculator()

        let totalAmount = 1001;
        let totalWeight = 49;

        let shippingFee = feeCalculator.calculateFee(totalAmount, totalWeight, "NO");

        expect(shippingFee).toBe(299);

        totalAmount = 103;
        totalWeight = 31;

        shippingFee = feeCalculator.calculateFee(totalAmount, totalWeight, "NO");
        
        expect(shippingFee).toBe(299);
    })

    it("should be 649 when TotalAmount > 1000 and TotalWeight > 50 when country is 'NO'", async () => {
        const feeCalculator = new FeeCalculator()

        const totalAmount = 1001;
        const totalWeight = 51;

        const shippingFee = feeCalculator.calculateFee(totalAmount, totalWeight, "NO");

        expect(shippingFee).toBe(649);
    })

    it("should always be 499 when country is 'US'", async () => {
        const feeCalculator = new FeeCalculator()

        let totalAmount = 1001;
        let TotalWeight = 51;

        let shippingFee = feeCalculator.calculateFee(totalAmount, TotalWeight, "US");

        expect(shippingFee).toBe(499);

        totalAmount = 50
        TotalWeight = 3

        shippingFee = feeCalculator.calculateFee(totalAmount, TotalWeight, "US")

        expect(shippingFee).toBe(499);
        
    })
})