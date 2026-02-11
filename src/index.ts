import { createCart } from "./domain/cart";
import { createUser } from "./domain/user";

import { Checkout } from "./services/checkout";
import { PromoService } from "./services/promo_service";
import { LocalPromoCodeRepository } from "./repository/promo_code/promo_code.local_storage";
import { LocalUserRepository } from "./repository/user/user.local_storage";
import { CartLocalStorage } from "./repository/cart/cart.local_storage";
import { LocalProductRepository } from "./repository/product/product.local_storage";


async function main() {

  const cart = createCart()

  const productRepo = new LocalProductRepository()

  const prod1 = await productRepo.find(1);
  if (!prod1){
    throw new Error("Product doesnt exist")
  }

  const prod2 = await productRepo.find(2);
  if (!prod2){
    throw new Error("Product doesnt exist")
  }

  const cartRepo = new CartLocalStorage()
  await cartRepo.add(cart)

  const user = createUser("Steve", 5000, cart.id);
  const userRepo = new LocalUserRepository();
  await userRepo.addUser(user)

  await cartRepo.addProduct(user.cartId, prod1)
  await cartRepo.addProduct(user.cartId, prod2)

  const promoRepo = new LocalPromoCodeRepository()
  const promoService = new PromoService(promoRepo)
  const checkout = new Checkout(promoService, userRepo, cartRepo)
  
  await checkout.applyPromo(user.id, "SALE10")

  const result = await checkout.placeOrder(user.id)

  console.log(result);
}

main();