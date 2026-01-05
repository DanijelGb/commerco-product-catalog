import { Cart } from "./cart";

export class User{
    constructor(private country: string, private cart: Cart){}

    getCart(): Cart{
        return this.cart
    }

    getCountry(): string{
        return this.country
    }
}