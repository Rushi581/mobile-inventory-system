import { Injectable } from '@angular/core';

/**
 * Keyboard Service
 * Manages keyboard interactions on mobile browsers
 * Ensures proper keyboard appearance and input field recognition
 */
@Injectable({
  providedIn: 'root'
})
export class KeyboardService {
  private isKeyboardOpen = false;

  constructor() {
    this.setupKeyboardDetection();
  }

  /**
   * Setup keyboard detection for iOS and Android
   */
  private setupKeyboardDetection(): void {
    // Listen for visual viewport changes (keyboard open/close)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', () => {
        this.handleViewportChange();
      });
    }

    // Fallback for browsers that don't support visualViewport
    window.addEventListener('focusin', (e) => {
      const target = e.target as HTMLElement;
      if (this.isInputElement(target)) {
        this.onKeyboardOpen();
      }
    });

    window.addEventListener('focusout', () => {
      this.onKeyboardClose();
    });
  }

  /**
   * Handle viewport change
   */
  private handleViewportChange(): void {
    if (!window.visualViewport) return;

    const isOpen = window.visualViewport.height < window.innerHeight * 0.75;
    if (isOpen && !this.isKeyboardOpen) {
      this.onKeyboardOpen();
    } else if (!isOpen && this.isKeyboardOpen) {
      this.onKeyboardClose();
    }
  }

  /**
   * Handle keyboard open event
   */
  onKeyboardOpen(): void {
    this.isKeyboardOpen = true;
    document.body.classList.add('keyboard-is-open');
    document.documentElement.style.height = '100vh';

    // Prevent scrolling outside input area
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement && this.isInputElement(activeElement)) {
      setTimeout(() => {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }

  /**
   * Handle keyboard close event
   */
  onKeyboardClose(): void {
    this.isKeyboardOpen = false;
    document.body.classList.remove('keyboard-is-open');
    document.documentElement.style.height = 'auto';
  }

  /**
   * Check if element is an input element
   */
  private isInputElement(element: HTMLElement): boolean {
    const tagName = element.tagName.toLowerCase();
    const inputTypes = ['text', 'number', 'email', 'password', 'tel', 'search', 'url', 'date', 'time', 'datetime-local'];

    if (tagName === 'textarea') {
      return true;
    }

    if (tagName === 'input') {
      const type = (element as HTMLInputElement).type.toLowerCase();
      return inputTypes.includes(type);
    }

    if (tagName === 'ion-input') {
      return true;
    }

    if (tagName === 'ion-textarea') {
      return true;
    }

    if (tagName === 'ion-searchbar') {
      return true;
    }

    return false;
  }

  /**
   * Focus input with keyboard handling
   */
  focusInput(element: HTMLElement): void {
    if (this.isInputElement(element)) {
      (element as HTMLInputElement | HTMLTextAreaElement).focus();
      this.onKeyboardOpen();
    }
  }

  /**
   * Blur input
   */
  blurInput(element: HTMLElement): void {
    if (this.isInputElement(element)) {
      (element as HTMLInputElement | HTMLTextAreaElement).blur();
      this.onKeyboardClose();
    }
  }

  /**
   * Get keyboard status
   */
  isOpen(): boolean {
    return this.isKeyboardOpen;
  }
}
