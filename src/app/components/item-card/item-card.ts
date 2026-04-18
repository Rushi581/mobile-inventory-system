import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonBadge, IonText } from '@ionic/angular/standalone';
import { Item } from '../../models/item.model';

/*
 * Item Card Component
 * Reusable card displaying item information
 * Student ID: 25108934
 */

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonBadge, IonText],
  templateUrl: 'item-card.html',
  styleUrls: ['item-card.scss']
})
export class ItemCardComponent {
  @Input() item!: Item;

  /**
   * Get badge class for category
   */
  getCategoryBadgeClass(): string {
    switch (this.item?.category) {
      case 'Electronics':
        return 'badge-info';
      case 'Furniture':
        return 'badge-primary';
      case 'Clothing':
        return 'badge-success';
      case 'Tools':
        return 'badge-warning';
      case 'Miscellaneous':
        return 'badge-secondary';
      default:
        return 'badge-primary';
    }
  }

  /**
   * Get badge class for stock status
   */
  getStockBadgeClass(): string {
    switch (this.item?.stockStatus) {
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
   * Check if item is featured
   */
  isFeatured(): boolean {
    return this.item?.featuredItem === 1;
  }

  /**
   * Get total value (quantity * price) with safe null handling (Issue #2)
   */
  getTotalValue(item: Item | undefined): number {
    if (!item) return 0;
    const qty = item?.quantity ?? 0;
    const price = item?.price ?? 0;
    return qty * price;
  }
}

