import { Product } from "../domain/product";

export type Cart = {
    id: string,
    products: Product[],
    activePromoId: string | undefined,
    }

export function createCart(
  products: Product[],
  activePromoId: string | undefined,
): Cart{
  return {
    id: crypto.randomUUID(),
    products, 
    activePromoId
  };
}
