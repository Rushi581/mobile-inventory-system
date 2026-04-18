/*
 * Item Model - Inventory Management System
 * Data model for inventory items with 9 fields
 * Student ID: 25108934
 */

export interface Item {
  itemId?: number;                    // Auto-incrementing, unique identifier
  itemName: string;                   // Required, must be unique
  category: 'Electronics' | 'Furniture' | 'Clothing' | 'Tools' | 'Miscellaneous';
  quantity: number;                   // Required, integer
  price: number;                      // Required, price in dollars
  supplierName: string;               // Required, supplier name
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  featuredItem: number;               // Default: 0 (0 = not featured, 1 = featured)
  specialNote?: string;               // Optional field
}
