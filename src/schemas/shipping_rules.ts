export type ShippingRules = {
    country: string,
    startingFee: number | undefined,
    shippingAmountThreshold: number | undefined,
    lightPackage: number | undefined,
    heavyPackage: number | undefined,
    lowOrderFee: number | undefined,
    highOrderFee: number | undefined,
    heavyPackageFee: number | undefined,
    extraHeavyPackageFee: number | undefined;
}