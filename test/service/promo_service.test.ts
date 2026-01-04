import { PromoService } from "../../src/services/promo_service"
import { IPromoCodeRepository } from "../../src/repository/promo_code/promo_code.repository";
import { IUser } from "../../src/interfaces/iuser";
import { PromoCode } from "../../src/domain/promo_code";


function addRepo(): IPromoCodeRepository{

    const promos: PromoCode[] = [
        {code: "SALE10", discount: 0.1, type: "multiply"},
        {code: "FREESHIP", discount: 50, type: "subtract"},
        {code: "VIP50", discount: 0.5, type: "multiply"}
    ]

    const repoMock: jest.Mocked<IPromoCodeRepository> = {
        findAll: jest.fn(),
        find: jest.fn().mockImplementation(code => {
            return promos.find(p => p.code === code)
        })
    };
    return repoMock
}

function mockUser(): jest.Mocked<IUser> {
    return {
        getBalance: jest.fn(),
        getCart: jest.fn(),
        canAfford: jest.fn(),
        pay: jest.fn(),
        addPromoCode: jest.fn(),
        promoUsed: jest.fn()
    }
}

describe("Validate promo code", () => {
    it("Should not be able to use an existing promo again", async () => {
        const user = mockUser();
        user.promoUsed.mockReturnValue(true);

        const repoMock = addRepo();
        const promoService = new PromoService(repoMock);

        await expect(promoService.fetchAndValidate(user, "SALE10")).rejects.toThrow("Promo code has already been used");
    });

    it("Should not add promo that promo repository does not return", async () => {
        const user = mockUser();

        const repoMock = addRepo()
        const promoService = new PromoService(repoMock);

        await expect(promoService.fetchAndValidate(user, "BIGSALE")).rejects.toThrow("Promo code not found");
    })
})