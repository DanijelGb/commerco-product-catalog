import { Checkout } from "../../src/services/checkout"
import { IPromoService } from "../../src/interfaces/ipromo_service";
import { IUser } from "../../src/interfaces/iuser";
import { ICart } from "../../src/interfaces/icart";
import { User } from "../../src/domain/user";

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

function mockCart(): jest.Mocked<ICart> {
    return {

        addProduct: jest.fn(),
        getProducts: jest.fn(),
        getTotal: jest.fn(),
        deactivatePromo: jest.fn(),
        activatePromo: jest.fn(),
        promoDiscount: jest.fn(),
        getPromo: jest.fn()
    }
}

function mockPromoService(): jest.Mocked<IPromoService>{
    return {
        fetchAndValidate: jest.fn()
    }
}

describe("", () => {
    it("Should not return successful result if user does not have enough balance", async () => {

        const cart = mockCart();
        const user = mockUser();
        user.getCart.mockReturnValue(cart)
        user.canAfford.mockReturnValue(false);

        const promoService: jest.Mocked<IPromoService> = {
            fetchAndValidate: jest.fn()
        };

        const checkout = new Checkout(promoService);

        const successful = await checkout.placeOrder(user);

        expect(successful).toEqual({ ok: false, error: "Insufficient funds" })
    }),
    it("should call pay with cart total", async () => {

        const cart = mockCart();
        cart.getTotal.mockReturnValue(200);

        const user = mockUser();
        user.getCart.mockReturnValue(cart);
        user.canAfford.mockReturnValue(true);

        const promoService = mockPromoService();

        const checkout = new Checkout(promoService);
        await checkout.placeOrder(user);

        expect(user.pay).toHaveBeenCalledWith(200);
    })
})