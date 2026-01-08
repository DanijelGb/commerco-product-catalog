import { PromoService } from "../../src/services/promo_service"
import { IPromoCodeRepository } from "../../src/repository/promo_code/promo_code.repository";
import { PromoCode } from "../../src/domain/promo_code";

function addRepo(): jest.Mocked<IPromoCodeRepository>{

    const promos: PromoCode[] = [
        {code: "SALE10", discount: 0.9, type: "multiply"},
        {code: "FREESHIP", discount: 50, type: "subtract"},
        {code: "VIP50", discount: 0.5, type: "multiply"}
    ]

    const repoMock: jest.Mocked<IPromoCodeRepository> = {
        findAll: jest.fn(),
        find: jest.fn().mockImplementation(async code => {
            return promos.find(p => p.code === code)
        })
    };
    return repoMock
}

describe("PromoService", () => {
    it("applyDiscount - multiply type returns discounted amount", async () => {
        const repo = addRepo();
        const promoService = new PromoService(repo);

        const result = await promoService.applyDiscount("SALE10", 100);

        expect(result).toBe(90); // 100 * 0.1
    })

    it("applyDiscount - subtract type subtracts from total", async () => {
        const repo = addRepo();
        const promoService = new PromoService(repo);

        const result = await promoService.applyDiscount("FREESHIP", 200);

        expect(result).toBe(150); // 200 - 50
    })

    it("getPromo throws when promo not found", async () => {
        const repo = addRepo();
        repo.find = jest.fn().mockResolvedValue(undefined);
        const promoService = new PromoService(repo);

        await expect(promoService.getPromo("BIGSALE")).rejects.toThrow("Promo code not found");
    })
})