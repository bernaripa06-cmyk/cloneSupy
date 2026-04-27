/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Unit = 'kg' | 'g' | 'l' | 'ml' | 'unit' | 'box' | 'pack';

export interface Ingredient {
  id: string;
  name: string;
  unit: Unit;
  currentStock: number;
  minStock: number;
  averagePrice: number;
  lastPurchasedPrice: number;
  category: string;
  supplierId?: string;
}

export interface RecipeIngredient {
  ingredientId: string;
  quantity: number;
  unit: Unit;
}

export interface Recipe {
  id: string;
  name: string;
  category: string;
  ingredients: RecipeIngredient[];
  sellingPrice: number;
  yield: number; // number of servings
  laborCost?: number;
  overheadCost?: number;
}

export interface Supplier {
  id: string;
  name: string;
  contactName: string;
  email: string;
  phone: string;
  categories: string[];
}

export interface OrderItem {
  ingredientId: string;
  quantity: number;
  priceAtOrder: number;
}

export interface Order {
  id: string;
  supplierId: string;
  orderDate: string;
  status: 'draft' | 'pending' | 'received' | 'cancelled';
  items: OrderItem[];
  totalAmount: number;
}

export interface InventoryLog {
  id: string;
  ingredientId: string;
  type: 'waste' | 'purchase' | 'manual_adjustment' | 'sale';
  quantity: number;
  date: string;
  notes?: string;
}
