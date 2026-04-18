/*
 * ItemClass - OOP Implementation
 * Provides encapsulation and validation methods for inventory items
 * Student ID: 25108934
 */

import { Item } from './item.model';

export class ItemClass implements Item {
  itemId?: number;
  itemName: string;
  category: 'Electronics' | 'Furniture' | 'Clothing' | 'Tools' | 'Miscellaneous';
  quantity: number;
  price: number;
  supplierName: string;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  featuredItem: number;
  specialNote?: string;

  /**
   * Constructor - Initialize item with all required fields
   */
  constructor(
    itemName: string,
    category: 'Electronics' | 'Furniture' | 'Clothing' | 'Tools' | 'Miscellaneous',
    quantity: number,
    price: number,
    supplierName: string,
    stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock',
    specialNote?: string,
    itemId?: number,
    featuredItem: number = 0
  ) {
    this.itemId = itemId;
    this.itemName = itemName;
    this.category = category;
    this.quantity = quantity;
    this.price = price;
    this.supplierName = supplierName;
    this.stockStatus = stockStatus;
    this.featuredItem = featuredItem;
    this.specialNote = specialNote;
  }

  /**
   * Validate item fields
   */
  isValid(): boolean {
    return (
      this.itemName.trim().length > 0 &&
      this.quantity >= 0 &&
      this.price >= 0 &&
      this.supplierName.trim().length > 0
    );
  }

  /**
   * Calculate stock percentage
   */
  getStockPercentage(totalCapacity: number): number {
    return Math.round((this.quantity / totalCapacity) * 100);
  }

  /**
   * Update stock status based on quantity
   */
  updateStockStatus(lowStockThreshold: number): void {
    if (this.quantity === 0) {
      this.stockStatus = 'Out of Stock';
    } else if (this.quantity <= lowStockThreshold) {
      this.stockStatus = 'Low Stock';
    } else {
      this.stockStatus = 'In Stock';
    }
  }

  /**
   * Get display format with all details
   */
  getDisplayString(): string {
    return `${this.itemName} (${this.category}) - ${this.quantity} units @ $${this.price}`;
  }

  /**
   * Convert to JSON for API
   */
  toJSON(): Item {
    return {
      itemId: this.itemId,
      itemName: this.itemName,
      category: this.category,
      quantity: this.quantity,
      price: this.price,
      supplierName: this.supplierName,
      stockStatus: this.stockStatus,
      featuredItem: this.featuredItem,
      specialNote: this.specialNote
    };
  }
}
