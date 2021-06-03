import * as Knex from 'knex';
import { IS_DEV } from 'settings';

export async function seed(knex: Knex): Promise<void> {
  if (!IS_DEV) return;
  // Deletes ALL existing entries
  return knex('Order')
    .truncate()
    .then(() => {
      // Inserts seed entries
      return knex('Order').insert([
        { description: 'Order 001', quantity: 2, price: 5 },
        { description: 'Order 002', quantity: 3, price: 6 },
        { description: 'Order 003', quantity: 4, price: 7 }
      ]);
    });
}
