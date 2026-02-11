import { Country } from "../schemas/country"
import { ICart } from "../interfaces/icart"

export class User{
    constructor(private country: Country, private cart: ICart){}

    getCart(): ICart{
        return this.cart
    }

    getCountry(): Country{
        return this.country
    }
}