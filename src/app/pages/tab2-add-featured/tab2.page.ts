import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonSpinner, IonText, ToastController } from '@ionic/angular/standalone';
import { addOutline, checkmarkCircleOutline, starOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { InventoryService } from '../../services/inventory.service';
import { Item } from '../../models/item.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HelpWidgetComponent } from '../../components/help-widget/help-widget';
import { ItemCardComponent } from '../../components/item-card/item-card';

/*
 * Tab 2 - Add Item & Featured Items Page
 * Add new inventory items and display featured items
 * Student ID: 25108934
 */

@Component({
  selector: 'app-tab2',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
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
    IonSpinner,
    IonText,
    HelpWidgetComponent,
    ItemCardComponent
  ],
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, OnDestroy {
  addItemForm!: FormGroup;
  featuredItems: Item[] = [];
  isLoading: boolean = false;
  isSubmitting: boolean = false;
  categories = ['Electronics', 'Furniture', 'Clothing', 'Tools', 'Miscellaneous'];
  stockStatuses = ['In Stock', 'Low Stock', 'Out of Stock'];
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private toastController: ToastController
  ) {
    addIcons({ addOutline, checkmarkCircleOutline, starOutline });
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadFeaturedItems();
  }

  /**
   * Initialize add item form with validation
   */
  initializeForm(): void {
    this.addItemForm = this.fb.group({
      itemName: ['', [Validators.required, Validators.minLength(2)]],
      category: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(0), Validators.pattern(/^\d+$/)]],
      price: ['', [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      supplierName: ['', [Validators.required, Validators.minLength(2)]],
      stockStatus: ['In Stock', Validators.required],
      specialNote: ['']
    });
  }

  /**
   * Load featured items from service
   */
  loadFeaturedItems(): void {
    this.inventoryService.items$
      .pipe(takeUntil(this.destroy$))
      .subscribe((items: Item[]) => {
        this.featuredItems = items.filter(item => item.featuredItem === 1);
      });
  }

  /**
   * Submit add item form
   */
  submitAddItem(): void {
    if (this.addItemForm.invalid) {
      this.showToast('Please fill in all required fields correctly', 'danger');
      return;
    }

    this.isSubmitting = true;
    const newItem: Item = {
      ...this.addItemForm.value,
      price: parseFloat(this.addItemForm.value.price),
      quantity: parseInt(this.addItemForm.value.quantity),
      featuredItem: 0
    };

    this.inventoryService.addItem(newItem)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (item: Item) => {
          this.showToast(`✓ Item "${item.itemName}" added successfully!`, 'success');
          this.addItemForm.reset({ stockStatus: 'In Stock' });
          this.isSubmitting = false;
        },
        error: (error) => {
          this.showToast(`✗ Error adding item: ${error.message}`, 'danger');
          this.isSubmitting = false;
        }
      });
  }

  /**
   * Show toast notification
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
   * Check if form field is invalid
   */
  isFieldInvalid(fieldName: string): boolean {
    const field = this.addItemForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
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
