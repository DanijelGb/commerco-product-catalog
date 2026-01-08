export type User = {
    id: string;
    name: string,
    balance: number,
    cartId: string,
    promos: string[];
}

export function createUser(
  name: string,
  balance: number,
  cartId: string
): User {
  return {
    id: crypto.randomUUID(),
    name,
    balance,
    cartId,
    promos: [],
  };
}
