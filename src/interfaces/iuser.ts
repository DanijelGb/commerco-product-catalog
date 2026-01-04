import { ICart } from "./icart"; 

export interface IUser {

    getCart(): ICart 

    canAfford(amount: number): boolean

    pay(amount: number): void

    addPromoCode(promoCode: string): void

    promoUsed(code: string): boolean

    getBalance(): number;
}     