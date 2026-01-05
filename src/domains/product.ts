export class Product{
    
    constructor(
        private readonly weight: number,
        private readonly price: number,
        private readonly name: string
    ) {
        if (price < 0) {
            throw new Error("amount cannot be negative");
        }

        if (weight < 0) {
            throw new Error("weight cannot be negative");
        }
    }
    getName(): string{
        return this.name;
    }

    getWeight(): number{
        return this.weight;
    }

    getPrice(): number{
        return this.price;
    }
}