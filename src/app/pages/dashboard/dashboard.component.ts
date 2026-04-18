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
import { warningOutline, trendingUpOutline, cubeOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { InventoryService } from '../../services/inventory.service';
import { NetworkService } from '../../services/network.service';
import { Item } from '../../models/item.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  isLoading = true;
  isOnline = true;
  items: Item[] = [];

  stats = {
    totalItems: 0,
    lowStockCount: 0,
    outOfStockCount: 0,
    totalValue: 0,
    categoryBreakdown: {} as { [key: string]: number },
  };

  private destroy$ = new Subject<void>();

  constructor(
    private inventoryService: InventoryService,
    private networkService: NetworkService
  ) {
    addIcons({ warningOutline, trendingUpOutline, cubeOutline });
  }

  ngOnInit(): void {
    this.checkNetworkStatus();
    this.loadDashboardData();
  }

  private checkNetworkStatus(): void {
    this.networkService.isOnline$
      .pipe(takeUntil(this.destroy$))
      .subscribe((online) => {
        this.isOnline = online;
        if (!online) {
          alert('⚠️ ඉන්ටර්නෙට් සබැඳුම නැත');
        }
      });
  }

  private loadDashboardData(): void {
    // Subscribe to loading state from inventory service
    this.inventoryService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loading) => {
        this.isLoading = loading;
      });

    // Subscribe to items and calculate stats
    this.inventoryService.items$
      .pipe(takeUntil(this.destroy$))
      .subscribe((items: Item[]) => {
        this.items = items;
        this.calculateStats();
      });
  }

  private calculateStats(): void {
    this.stats.totalItems = this.items.length;
    this.stats.lowStockCount = this.items.filter(
      (item) => item.stockStatus === 'Low Stock'
    ).length;
    this.stats.outOfStockCount = this.items.filter(
      (item) => item.stockStatus === 'Out of Stock'
    ).length;

    // කුළුණු සම්පූර්ණ වටිනාකම
    this.stats.totalValue = this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // කාණ්ඩ අනුව බෙදීම
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
