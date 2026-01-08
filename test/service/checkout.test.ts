import { Checkout } from "../../src/services/checkout"
import { IPromoService } from "../../src/interfaces/ipromo_service";
import { IUserRepository } from "../../src/repository/user/user.repository";
import { ICartRepository } from "../../src/repository/cart/cart.repository";

function mockUserRepo(): jest.Mocked<IUserRepository> {
    return {
        addUser: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn(),
        addPromo: jest.fn(),
        findPromo: jest.fn()
    }
}

function mockCartRepo(): jest.Mocked<ICartRepository> {
    return {
        add: jest.fn(),
        find: jest.fn(),
        addProduct: jest.fn(),
        getTotalPrice: jest.fn(),
        removeProduct: jest.fn()
    }
}

function mockPromoService(): jest.Mocked<IPromoService>{
    return {
        getPromo: jest.fn(),
        applyDiscount: jest.fn()
    }
}

describe("Checkout service", () => {
    it("Should throw when user does not have enough balance", async () => {
        const userRepo = mockUserRepo();
        const cartRepo = mockCartRepo();

        userRepo.find.mockResolvedValue({ id: "u1", balance: 50, cartId: "c1" } as any);
        cartRepo.getTotalPrice.mockResolvedValue(100);
        cartRepo.find.mockResolvedValue({ products: [], activePromoId: undefined } as any);

        const checkout = new Checkout(mockPromoService(), userRepo, cartRepo);

        await expect(checkout.placeOrder("u1")).rejects.toThrow("Insufficient balance");
    })

    it("should deduct user balance by cart total and return receipt", async () => {
        const userRepo = mockUserRepo();
        const cartRepo = mockCartRepo();

        const user = { id: "u1", balance: 500, cartId: "c1" } as any;
        const products = [{ id: 1, price: 200 }];

        userRepo.find.mockResolvedValue(user);
        cartRepo.getTotalPrice.mockResolvedValue(200);
        cartRepo.find.mockResolvedValue({ products, activePromoId: undefined } as any);

        const checkout = new Checkout(mockPromoService(), userRepo, cartRepo);

        const receipt = await checkout.placeOrder("u1");

        expect(receipt).toEqual({ total: 200, items: products });
        expect(user.balance).toBe(300);
    })
    it("checks that placeOrder() calls deactivateOrder() when promo applied", async () => {
        const userRepo = mockUserRepo();
        const cartRepo = mockCartRepo();

        const user = { id: "u1", balance: 500, cartId: "c1" } as any;
        const products = [{ id: 1, price: 200 }];

        userRepo.find.mockResolvedValue(user);

        cartRepo.getTotalPrice.mockResolvedValue(200);
        cartRepo.find.mockResolvedValue({ products, activePromoId : "PROMO10"} as any);

        const promoService = mockPromoService()

        const checkout = new Checkout(promoService, userRepo, cartRepo);

        const applyDiscountSpy = jest.spyOn(promoService, "applyDiscount");
        const addPromoSpy = jest.spyOn(userRepo, "addPromo");
        const deactivateSpy = jest.spyOn(checkout, "deactivatePromo");

        await checkout.placeOrder("u1");

        expect(applyDiscountSpy).toHaveBeenCalledWith("PROMO10", 200);
        expect(addPromoSpy).toHaveBeenCalledWith("PROMO10", "u1");
        expect(deactivateSpy).toHaveBeenCalledWith("c1");
 
    })
})