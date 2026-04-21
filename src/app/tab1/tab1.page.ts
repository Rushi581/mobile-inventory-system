import { Component, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonBadge, IonIcon, IonSpinner, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { listOutline, searchOutline, refreshOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { InventoryService } from '../services/inventory.service';
import { Item } from '../models/item.model';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { HelpWidgetComponent } from '../components/help-widget/help-widget';
import { ItemCardComponent } from '../components/item-card/item-card';

/*
 * Tab 1 - List & Search Page
 * Lists all inventory items and allows searching by name
 * Displays stock status for each item
 * Student ID: 25108934
 */

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSearchbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonBadge,
    IonIcon,
    IonSpinner,
    IonRefresher,
    IonRefresherContent,
    HelpWidgetComponent,
    ItemCardComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab1Page implements OnInit, OnDestroy {
  items: Item[] = [];
  filteredItems: Item[] = [];
  searchQuery: string = '';
  isLoading: boolean = false;
  stats = { total: 0, inStock: 0, lowStock: 0, outOfStock: 0 };
  private destroy$ = new Subject<void>();
  private searchSubject$ = new Subject<string>();

  constructor(private inventoryService: InventoryService) {
    addIcons({ listOutline, searchOutline, refreshOutline });
  }

  ngOnInit(): void {
    this.loadItems();
    this.setupSearchDebounce();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Load items from service and calculate stats
   */
  private loadItems(): void {
    this.inventoryService.items$
      .pipe(takeUntil(this.destroy$))
      .subscribe((items: Item[]) => {
        this.items = items;
        this.filteredItems = items;
        this.calculateStats();
      });

    this.inventoryService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loading) => {
        this.isLoading = loading;
      });
  }

  /**
   * Calculate stock status statistics
   */
  private calculateStats(): void {
    this.stats.total = this.items.length;
    this.stats.inStock = this.items.filter(item => item.stockStatus === 'In Stock').length;
    this.stats.lowStock = this.items.filter(item => item.stockStatus === 'Low Stock').length;
    this.stats.outOfStock = this.items.filter(item => item.stockStatus === 'Out of Stock').length;
  }

  /**
   * Setup search debounce with 300ms delay
   */
  private setupSearchDebounce(): void {
    this.searchSubject$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((query: string) => {
        this.performSearch(query);
      });
  }

  /**
   * Handle search input change
   */
  onSearchChange(): void {
    this.searchSubject$.next(this.searchQuery);
  }

  /**
   * Perform search filtering
   */
  private performSearch(query: string): void {
    if (!query || query.trim() === '') {
      this.filteredItems = this.items;
    } else {
      const lowerQuery = query.toLowerCase();
      this.filteredItems = this.items.filter(item =>
        item.itemName.toLowerCase().includes(lowerQuery)
      );
    }
  }

  /**
   * Refresh items from server
   */
  onRefresh(event: any): void {
    this.inventoryService.loadAllItems();
    setTimeout(() => {
      event.detail.complete();
    }, 1000);
  }

  /**
   * Track by item ID for performance
   */
  trackByItemId(index: number, item: Item): number {
    return item.itemId || index;
  }

  onInputFocus(): void {
    // Focus event for potential future enhancements
  }

  onInputBlur(): void {
    // Blur event for potential future enhancements
  }
}
