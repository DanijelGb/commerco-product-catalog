import { Cart } from "./domains/cart";
import { User } from "./domains/user";

import { Checkout } from "./services/checkout";
import { FeeCalculator } from "./services/fee_calculator";

import { Product } from "./domains/product";

const prod1 = new Product(25, 500, "Tool");
const prod2 = new Product(5, 600, "Appliance");

const cart = new Cart();
cart.addProduct(prod1)
cart.addProduct(prod2)

const user = new User("NO", cart)

const feeCalculator = new FeeCalculator();

const checkout = new Checkout();

async function main(){

  const result = await checkout.viewOrder(user, feeCalculator)
  console.log(result);
}

main();