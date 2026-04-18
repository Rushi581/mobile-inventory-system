/*
 * Item Model - Inventory Management System
 * Data model for inventory items with 9 fields
 * Student ID: 25108934
 * 
 * Note: TypeScript uses camelCase, Server uses snake_case
 * Conversion handled by ApiService
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

/**
 * Server API Response format (snake_case)
 * Used for type conversions
 */
export interface ItemServerFormat {
  item_id?: number;
  item_name: string;
  category: string;
  quantity: number;
  price: number;
  supplier_name: string;
  stock_status: string;
  featured_item: number;
  special_note?: string;
}
