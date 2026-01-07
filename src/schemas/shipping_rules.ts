export type ShippingRulesSE = {
  country: "SE",
  startingFee: number;
  shippingAmountThreshold: number;
  lowOrderFee: number;
  lightPackage: number;
  heavyPackageFee: number;
};

export type ShippingRulesNO = {
  country: "NO";
  startingFee: number;
  shippingAmountThreshold: number;
  lowOrderFee: number;
  heavyPackage: number;
  highOrderFee: number;
  lightPackage: number;
  heavyPackageFee: number;
  extraHeavyPackageFee: number;
};

export type ShippingRulesUS = {
  country: "US";
  startingFee: number;
};

export type ShippingRulesFI = {
  country: "FI";
  startingFee: number;
};

export type ShippingRules = 
   |  ShippingRulesNO 
   |  ShippingRulesSE
   |  ShippingRulesUS
   |  ShippingRulesFI