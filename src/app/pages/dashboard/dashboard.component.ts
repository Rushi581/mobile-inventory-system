import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonSpinner,
  IonSkeletonText,
  IonBadge,
} from '@ionic/angular/standalone';
import {
  warningOutline,
  trendingUpOutline,
  cubeOutline,
  statsChartOutline,
  checkmarkCircleOutline,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { InventoryService } from '../../services/inventory.service';
import { NetworkService } from '../../services/network.service';
import { Item } from '../../models/item.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * Dashboard Component
 * Displays comprehensive inventory statistics and analytics
 * Includes total items, low stock alerts, inventory value, and category breakdown
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonIcon,
    IonSpinner,
    IonSkeletonText,
    IonBadge,
  ],
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  // Loading and network states
  isLoading = true;
  isOnline = true;
  
  // Inventory items data
  items: Item[] = [];

  // Dashboard statistics
  stats = {
    totalItems: 0,
    lowStockCount: 0,
    outOfStockCount: 0,
    inStockCount: 0,
    totalValue: 0,
    categoryBreakdown: {} as { [key: string]: number },
  };

  private destroy$ = new Subject<void>();

  constructor(
    private inventoryService: InventoryService,
    private networkService: NetworkService
  ) {
    addIcons({
      warningOutline,
      trendingUpOutline,
      cubeOutline,
      statsChartOutline,
      checkmarkCircleOutline,
    });
  }

  ngOnInit(): void {
    this.checkNetworkStatus();
    this.loadDashboardData();
  }

  /**
   * Check network connectivity status
   */
  private checkNetworkStatus(): void {
    this.networkService.isOnline$
      .pipe(takeUntil(this.destroy$))
      .subscribe((online) => {
        this.isOnline = online;
      });
  }

  /**
   * Load dashboard data from inventory service
   * Subscribes to loading state and items list
   */
  private loadDashboardData(): void {
    // Subscribe to loading state from inventory service
    this.inventoryService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loading) => {
        this.isLoading = loading;
      });

    // Subscribe to items and calculate statistics
    this.inventoryService.items$
      .pipe(takeUntil(this.destroy$))
      .subscribe((items: Item[]) => {
        this.items = items;
        this.calculateStats();
      });
  }

  /**
   * Calculate inventory statistics
   * Computes: total items, stock status counts, inventory value, category breakdown
   */
  private calculateStats(): void {
    // Total items count
    this.stats.totalItems = this.items.length;

    // Count items by stock status
    this.stats.inStockCount = this.items.filter(
      (item) => item.stockStatus === 'In Stock'
    ).length;
    this.stats.lowStockCount = this.items.filter(
      (item) => item.stockStatus === 'Low Stock'
    ).length;
    this.stats.outOfStockCount = this.items.filter(
      (item) => item.stockStatus === 'Out of Stock'
    ).length;

    // Calculate total inventory value
    this.stats.totalValue = this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Build category breakdown
    this.stats.categoryBreakdown = {};
    this.items.forEach((item) => {
      this.stats.categoryBreakdown[item.category] =
        (this.stats.categoryBreakdown[item.category] || 0) + 1;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
