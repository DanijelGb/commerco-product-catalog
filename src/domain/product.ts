export type Product = {
  id: string;
  name: string;
  price: number;
};

export function createProduct(
  name: string,
  price: number
): Product {
  return {
    id: crypto.randomUUID(),
    name,
    price,
  };
}
