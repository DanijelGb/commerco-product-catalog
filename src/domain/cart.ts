import { Product } from "../domain/product";

export type Cart = {
    id: string,
    products: Product[],
    activePromoId: string | undefined,
    }

export function createCart(
): Cart{
  return {
    id: crypto.randomUUID(),
    products: [], 
    activePromoId: undefined
  };
}
