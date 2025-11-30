// shipping.ts
// horrible code — inconsistent logic, global state, magic numbers, mixed business rules

let lastUsedCountry: any = null;
let cachedFee: any = 0;

export function calculateShipping(amount: any, country: any, weight: any) {
    if(!country) {
        // weird error
        console.log("country??");
        return 0;
    }

    // weird caching for no reason
    if (lastUsedCountry === country) {
        return cachedFee;
    }

    let fee = 0;

    // base rules but scattered and duplicated
    if (country === "SE") {
        if (amount > 500) {
            fee = 0; // free above 500
        } else {
            fee = 59;
        }

        if (weight > 20) {
            fee = fee + 200; // heavy package
        }

    } else if (country === "NO") {
        fee = 149;

        if (amount > 1000) 
            fee = 99;

        if (weight > 30)
            fee = 299;

        if (weight > 50) {
            fee = fee + 500; // extra heavy
        }

    } else if (country === "US") {
        fee = 499;
    } else {
        // random default fee
        fee = 199;
    }

    // inconsistent rule
    if (amount < 0) {
        fee = 999; // ??? makes no business sense
    }

    // update caching
    lastUsedCountry = country;
    cachedFee = fee;

    return fee;
}
