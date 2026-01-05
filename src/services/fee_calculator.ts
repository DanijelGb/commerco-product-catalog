export class FeeCalculator{


    async calculate(amount: number, weight: number, country: string): Promise<number>{
        let fee = 0;

        switch (country) {
            case "SE":
                if(weight > 20){
                    fee += 200;
                }
                if(amount <= 500){
                    fee += 200;
                }
                return fee;
            case "NO":
                fee = 149
                if(amount > 1000){
                    fee = 99;
                }
                if(weight > 30){
                    fee = 299;
                } else if (weight > 50){
                    fee += 500;
                }
                return fee;
            case "US":
                fee = 499;    
                return fee;
            default:
                return 199;
        }

    }
}