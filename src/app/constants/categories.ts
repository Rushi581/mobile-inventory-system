/**
 * Item Category Constants (Issue #23: Remove hardcoded magic strings)
 * Centralized definitions for all category values
 */

export const CATEGORIES = {
  ELECTRONICS: 'Electronics',
  FURNITURE: 'Furniture',
  CLOTHING: 'Clothing',
  TOOLS: 'Tools',
  MISCELLANEOUS: 'Miscellaneous'
} as const;

export type Category = typeof CATEGORIES[keyof typeof CATEGORIES];

/**
 * Get all categories as an array
 */
export function getCategoriesArray(): Category[] {
  return Object.values(CATEGORIES);
}

/**
 * Get badge class for category
 */
export function getCategoryBadgeClass(category: Category): string {
  switch (category) {
    case CATEGORIES.ELECTRONICS:
      return 'badge-info';
    case CATEGORIES.FURNITURE:
      return 'badge-primary';
    case CATEGORIES.CLOTHING:
      return 'badge-success';
    case CATEGORIES.TOOLS:
      return 'badge-warning';
    case CATEGORIES.MISCELLANEOUS:
      return 'badge-secondary';
    default:
      return 'badge-primary';
  }
}
