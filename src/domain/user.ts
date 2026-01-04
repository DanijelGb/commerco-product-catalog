import { IUser } from "../interfaces/iuser";
import { ICart } from "../interfaces/icart";

export class User implements IUser{

    private usedPromos = new Set<string>(); 

    constructor(
        private name: string, 
        private cart: ICart, 
        private balance: number
    ){}

    getBalance(): number {
        return this.balance;
    }

    getName(): string {
        return this.name;
    }

    getCart(): ICart {
        return this.cart;
    }

    canAfford(amount: number): boolean{
        return this.balance >= amount
    }

    pay(amount: number){
        if (!this.canAfford(amount)){
            throw new Error("Not enough money in wallet");
        }

        this.balance -= amount;
    }

    addPromoCode(promoCode: string){
        this.usedPromos.add(promoCode);
    }

    promoUsed(code: string): boolean{

        const foundCode = this.usedPromos.has(code);
        if (foundCode) {
            return true;
        }

        return false;
    }
} 