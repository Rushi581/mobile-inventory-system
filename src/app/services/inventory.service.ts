import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../models/item.model';
import { ApiService } from './api.service';

/*
 * Inventory Service - Single source of truth
 * Manages all inventory operations with reactive BehaviorSubject
 * Student ID: 25108934
 */

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  // BehaviorSubject to hold the current state of items
  private itemsSubject = new BehaviorSubject<Item[]>([]);
  public items$ = this.itemsSubject.asObservable();

  // Subject for loading state
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  // Subject for error messages
  private errorSubject = new BehaviorSubject<string | null>(null);
  public error$ = this.errorSubject.asObservable();

  constructor(private apiService: ApiService) {
    this.loadAllItems();
  }

  /**
   * Get current items array (synchronous access)
   */
  getItems(): Item[] {
    return this.itemsSubject.getValue();
  }

  /**
   * Load all items from API
   */
  loadAllItems(): void {
    this.loadingSubject.next(true);
    this.apiService.getAllItems().subscribe({
      next: (items: Item[]) => {
        this.itemsSubject.next(items);
        this.loadingSubject.next(false);
        this.errorSubject.next(null);
      },
      error: (error) => {
        console.error('Error loading items:', error);
        this.errorSubject.next(error.message);
        this.loadingSubject.next(false);
      }
    });
  }

  /**
   * Add new item
   */
  addItem(item: Item): Observable<Item> {
    this.loadingSubject.next(true);
    return new Observable(observer => {
      this.apiService.addItem(item).subscribe({
        next: (newItem: Item) => {
          const currentItems = this.itemsSubject.getValue();
          this.itemsSubject.next([...currentItems, newItem]);
          this.loadingSubject.next(false);
          this.errorSubject.next(null);
          observer.next(newItem);
          observer.complete();
        },
        error: (error) => {
          this.errorSubject.next(error.message);
          this.loadingSubject.next(false);
          observer.error(error);
        }
      });
    });
  }

  /**
   * Update existing item by name
   */
  updateItem(itemName: string, updatedItem: Item): Observable<Item> {
    this.loadingSubject.next(true);
    return new Observable(observer => {
      this.apiService.updateItem(itemName, updatedItem).subscribe({
        next: (updated: Item) => {
          const currentItems = this.itemsSubject.getValue();
          const updatedItems = currentItems.map(item =>
            item.itemName === itemName ? updated : item
          );
          this.itemsSubject.next(updatedItems);
          this.loadingSubject.next(false);
          this.errorSubject.next(null);
          observer.next(updated);
          observer.complete();
        },
        error: (error) => {
          this.errorSubject.next(error.message);
          this.loadingSubject.next(false);
          observer.error(error);
        }
      });
    });
  }

  /**
   * Delete item by name
   */
  deleteItem(itemName: string): Observable<any> {
    this.loadingSubject.next(true);
    return new Observable(observer => {
      this.apiService.deleteItem(itemName).subscribe({
        next: (response) => {
          const currentItems = this.itemsSubject.getValue();
          const filteredItems = currentItems.filter(item => item.itemName !== itemName);
          this.itemsSubject.next(filteredItems);
          this.loadingSubject.next(false);
          this.errorSubject.next(null);
          observer.next(response);
          observer.complete();
        },
        error: (error) => {
          this.errorSubject.next(error.message);
          this.loadingSubject.next(false);
          observer.error(error);
        }
      });
    });
  }

  /**
   * Search items by name (local search)
   */
  searchItems(query: string): Item[] {
    const items = this.itemsSubject.getValue();
    return items.filter(item =>
      item.itemName.toLowerCase().includes(query.toLowerCase())
    );
  }

  /**
   * Get featured items
   */
  getFeaturedItems(): Item[] {
    return this.itemsSubject.getValue().filter(item => item.featuredItem === 1);
  }

  /**
   * Get item statistics
   */
  getStatistics(): { total: number; inStock: number; lowStock: number; outOfStock: number } {
    const items = this.itemsSubject.getValue();
    return {
      total: items.length,
      inStock: items.filter(item => item.stockStatus === 'In Stock').length,
      lowStock: items.filter(item => item.stockStatus === 'Low Stock').length,
      outOfStock: items.filter(item => item.stockStatus === 'Out of Stock').length
    };
  }

  /**
   * Clear error message
   */
  clearError(): void {
    this.errorSubject.next(null);
  }
}
