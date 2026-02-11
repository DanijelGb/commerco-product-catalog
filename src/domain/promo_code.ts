export interface PromoCode{
    code: string,
    discount: number,
    type: "multiply" | "subtract";
}