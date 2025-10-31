interface Product {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  isActive: boolean;
}

// Simulated "database" - This data has a subtle issue
const mockDatabase: Product[] = [
  { id: 101, name: "Laptop X", categoryId: 1, price: 1200, isActive: true },
  { id: 102, name: "Keyboard Y", categoryId: 1, price: 75, isActive: true },
  { id: 103, name: "Monitor Z", categoryId: '1' as any, price: 300, isActive: true }, 
  { id: 201, name: "T-Shirt A", categoryId: 2, price: 25, isActive: true },
  { id: 202, name: "Jeans B", categoryId: 2, price: 60, isActive: false },
];

/**
 * Fetches all active products for a specific category.
 * @param categoryId - The ID of the category (e.g., 1 for Electronics).
 * @returns A list of active products.
 */
export function getActiveProductsByCategory(categoryId: number): Product[] {
  console.log(`Searching for products in category: ${categoryId}`);
  
  return mockDatabase.filter(product => {
    return product.categoryId == categoryId; 
  });
}