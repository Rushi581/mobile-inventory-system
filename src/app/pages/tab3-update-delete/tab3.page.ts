import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonButton, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonRefresher, IonRefresherContent, IonSpinner, ToastController, AlertController } from '@ionic/angular/standalone';
import { pencilOutline, trashOutline, searchOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { InventoryService } from '../../services/inventory.service';
import { Item } from '../../models/item.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HelpWidgetComponent } from '../../components/help-widget/help-widget';

/*
 * Tab 3 - Update & Delete Page
 * Update existing items and delete from inventory
 * Student ID: 25108934
 */

@Component({
  selector: 'app-tab3',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSearchbar,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonIcon,
    IonRefresher,
    IonRefresherContent,
    IonSpinner,
    HelpWidgetComponent
  ],
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit, OnDestroy {
  searchQuery: string = '';
  foundItem: Item | null = null;
  updateForm!: FormGroup;
  isSearching: boolean = false;
  isUpdating: boolean = false;
  isDeleting: boolean = false;
  stockStatuses = ['In Stock', 'Low Stock', 'Out of Stock'];
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    addIcons({ pencilOutline, trashOutline, searchOutline });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  /**
   * Initialize update form
   */
  initializeForm(): void {
    this.updateForm = this.fb.group({
      quantity: ['', [Validators.required, Validators.min(0)]],
      supplierName: ['', [Validators.required, Validators.minLength(2)]],
      stockStatus: ['In Stock', Validators.required],
      specialNote: ['']
    });
  }

  /**
   * Pull to refresh
   */
  onRefresh(event: any): void {
    this.inventoryService.loadAllItems();
    this.foundItem = null;
    this.searchQuery = '';
    this.updateForm.reset();
    setTimeout(() => {
      event.detail.complete();
      this.showToast('✓ Inventory refreshed!', 'success');
    }, 500);
  }

  /**
   * Search for item by name
   */
  searchItem(): void {
    if (!this.searchQuery.trim()) {
      this.foundItem = null;
      this.showToast('Please enter an item name', 'warning');
      return;
    }

    this.isSearching = true;
    const results = this.inventoryService.searchItems(this.searchQuery);
    if (results.length > 0) {
      this.foundItem = results[0];
      this.updateForm.patchValue({
        quantity: this.foundItem.quantity,
        supplierName: this.foundItem.supplierName,
        stockStatus: this.foundItem.stockStatus,
        specialNote: this.foundItem.specialNote || ''
      });
      this.showToast(`✓ Found: ${this.foundItem.itemName}`, 'success');
    } else {
      this.foundItem = null;
      this.showToast('Item not found', 'danger');
    }
    this.isSearching = false;
  }

  /**
   * Update item
   */
  updateItem(): void {
    if (!this.foundItem || this.updateForm.invalid) {
      this.showToast('Please fill in all required fields', 'danger');
      return;
    }

    this.isUpdating = true;
    const updatedItem: Item = {
      ...this.foundItem,
      ...this.updateForm.value,
      price: this.foundItem.price,
      category: this.foundItem.category
    };

    this.inventoryService.updateItem(this.foundItem.itemId!, updatedItem)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.showToast(`✓ Item updated successfully!`, 'success');
          this.foundItem = null;
          this.searchQuery = '';
          this.updateForm.reset();
          this.isUpdating = false;
        },
        error: (error) => {
          this.showToast(`✗ Error: ${error.message}`, 'danger');
          this.isUpdating = false;
        }
      });
  }

  /**
   * Delete item with confirmation
   */
  async deleteItem(): Promise<void> {
    if (!this.foundItem) return;

    const alert = await this.alertController.create({
      header: 'Delete Item?',
      message: `Are you sure you want to delete "${this.foundItem.itemName}"? This action cannot be undone.`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.confirmDelete();
          }
        }
      ]
    });

    await alert.present();
  }

  /**
   * Confirm delete
   */
  private confirmDelete(): void {
    if (!this.foundItem) return;

    this.isDeleting = true;
    this.inventoryService.deleteItem(this.foundItem.itemId!)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.showToast(`✓ Item deleted successfully!`, 'success');
          this.foundItem = null;
          this.searchQuery = '';
          this.isDeleting = false;
        },
        error: (error) => {
          if (error.message.includes('forbidden') || error.message.includes('Laptop')) {
            this.showToast('⚠ Cannot delete protected items like "Laptop"', 'warning');
          } else {
            this.showToast(`✗ Error: ${error.message}`, 'danger');
          }
          this.isDeleting = false;
        }
      });
  }

  /**
   * Show toast
   */
  async showToast(message: string, color: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      color
    });
    await toast.present();
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

  /**
   * Check if form field is invalid (Issue #8 - Form error display)
   */
  isFieldInvalid(fieldName: string): boolean {
    const field = this.updateForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
