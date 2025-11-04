interface Product {
  id: number;
  name: string;
  price: number;
  tags: string[];
}

const productData: Product[] = [
  { id: 101, name: "Laptop X", price: 1200, tags: ["electronics", "premium"] },
  { id: 201, name: "T-Shirt A", price: 25, tags: ["apparel", "sale"] },
];

/**
 * Retrieves a product and appends a "new" tag if it's over $100.
 */
export function processProductForDisplay(productId: number): Product | undefined {
  const product = productData.find(p => p.id === productId);

  if (product && product.price > 1000) {
    product.tags.push("new"); 
  }

  return product;
}