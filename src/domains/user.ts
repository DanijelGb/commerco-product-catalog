import { ICart } from "../interfaces/icart"

export class User{
    constructor(private country: string, private cart: ICart){}

    getCart(): ICart{
        return this.cart
    }

    getCountry(): string{
        return this.country
    }
}