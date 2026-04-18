import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonBadge, IonIcon, IonSpinner, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { listOutline, searchOutline, refreshOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { InventoryService } from '../../services/inventory.service';
import { Item } from '../../models/item.model';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { HelpWidgetComponent } from '../../components/help-widget/help-widget';
import { ItemCardComponent } from '../../components/item-card/item-card';

/*
 * Tab 1 - List & Search Page
 * Lists all inventory items and allows searching by name
 * Student ID: 25108934
 */

@Component({
  selector: 'app-tab1',
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
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {
  items: Item[] = [];
  filteredItems: Item[] = [];
  searchQuery: string = '';
  isLoading: boolean = false;
  stats = { total: 0, inStock: 0, lowStock: 0, outOfStock: 0 };
  private destroy$ = new Subject<void>();

  constructor(private inventoryService: InventoryService) {
    addIcons({ listOutline, searchOutline, refreshOutline });
  }

  ngOnInit(): void {
    this.loadItems();
  }

  /**
   * Load all items from service
   */
  loadItems(): void {
    this.inventoryService.items$
      .pipe(takeUntil(this.destroy$))
      .subscribe((items: Item[]) => {
        this.items = items;
        this.filteredItems = items;
        this.updateStats();
      });

    this.inventoryService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loading: boolean) => {
        this.isLoading = loading;
      });
  }

  /**
   * Search items by name (debounced)
   */
  onSearchChange(): void {
    if (!this.searchQuery.trim()) {
      this.filteredItems = this.items;
    } else {
      this.filteredItems = this.inventoryService.searchItems(this.searchQuery);
    }
  }

  /**
   * Update statistics
   */
  updateStats(): void {
    this.stats = this.inventoryService.getStatistics();
  }

  /**
   * Pull to refresh
   */
  onRefresh(event: any): void {
    this.inventoryService.loadAllItems();
    setTimeout(() => {
      event.detail.complete();
    }, 500);
  }

  /**
   * Get stock badge class
   */
  getStockBadgeClass(status: string): string {
    switch (status) {
      case 'In Stock':
        return 'badge-success';
      case 'Low Stock':
        return 'badge-warning';
      case 'Out of Stock':
        return 'badge-danger';
      default:
        return 'badge-primary';
    }
  }

  /**
   * Handle input focus event for keyboard appearance
   */
  onInputFocus(): void {
    document.body.classList.add('keyboard-is-open');
    setTimeout(() => {
      const activeElement = document.activeElement as HTMLElement;
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  }

  /**
   * Handle input blur event when keyboard closes
   */
  onInputBlur(): void {
    document.body.classList.remove('keyboard-is-open');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

