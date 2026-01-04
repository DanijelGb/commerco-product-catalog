import { Cart } from "./domain/cart";
import { User } from "./domain/user";

import { Product } from "./domain/product";
import { Checkout } from "./services/checkout";
import { PromoService } from "./services/promo_service";
import { LocalPromoCodeRepository } from "./repository/promo_code/promo_code.local_storage";

async function main() {
  const prod1: Product = {name: "Hammer", price: 231}
  const prod2: Product = {name: "something", price: 231}

  const cart = new Cart();
  cart.addProduct(prod1);

  const user = new User("Danijel", cart, 5000)
  user.getCart().addProduct(prod2)

  const promoRepo = new LocalPromoCodeRepository()
  const promoToken = new PromoService(promoRepo)
  const checkout = new Checkout(promoToken);

  await checkout.applyPromo(user, "SAVE10")

  const result = await checkout.placeOrder(user)

  console.log(result);
}

main();