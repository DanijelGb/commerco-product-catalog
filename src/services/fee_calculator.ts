import { Country } from "../schemas/country";

export class FeeCalculator{

    calculateFee(amount: number, weight: number, country: Country): number{

        switch (country) {
            case "SE":
                return this.calculateSE(amount, weight)
            case "NO":
                return this.calculateNO(amount, weight)
            case "US":
                return 499;
            default:
                return 199;
        }
    }

    private calculateSE(amount: number, weight: number): number {
        let fee = 0;

        const basicPackage = 20;
        const freeShippingThreshold = 500;

        const lowOrderFee = 59;
        const heavyPackageFee = 200;

        if(amount <= freeShippingThreshold) {fee += lowOrderFee;}
        if(weight > basicPackage) {fee += heavyPackageFee;}

        return fee;
    }

    private calculateNO(amount: number, weight: number): number {
        const reducedShippingThreshold = 1000
        const lowOrderFee = 149;
        const highOrderFee = 99;

        let fee = amount > reducedShippingThreshold ? lowOrderFee : highOrderFee 

        const basicPackage = 30;
        const heavyPackage = 50

        const extraHeavyPackageFee = 500
        const heavyPackageFlatFee = 299;

        if (weight > heavyPackage) {fee += extraHeavyPackageFee}
        else if(weight > basicPackage) {fee = heavyPackageFlatFee} 

        return fee;
    }
}