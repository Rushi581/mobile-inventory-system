/**
 * Stock Status Constants (Issue #23: Remove hardcoded magic strings)
 * Centralized definitions for all stock status values
 */

export const STOCK_STATUSES = {
  IN_STOCK: 'In Stock',
  LOW_STOCK: 'Low Stock',
  OUT_OF_STOCK: 'Out of Stock'
} as const;

export type StockStatus = typeof STOCK_STATUSES[keyof typeof STOCK_STATUSES];

/**
 * Get all stock status values as an array
 */
export function getStockStatusArray(): StockStatus[] {
  return Object.values(STOCK_STATUSES);
}

/**
 * Get badge class for stock status
 */
export function getStockBadgeClass(status: StockStatus): string {
  switch (status) {
    case STOCK_STATUSES.IN_STOCK:
      return 'badge-success';
    case STOCK_STATUSES.LOW_STOCK:
      return 'badge-warning';
    case STOCK_STATUSES.OUT_OF_STOCK:
      return 'badge-danger';
    default:
      return 'badge-primary';
  }
}
