import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService implements OnDestroy {
  private isOnline = new BehaviorSubject<boolean>(navigator.onLine);
  public isOnline$ = this.isOnline.asObservable();

  // Bind listeners to maintain proper 'this' context
  private onlineListener = () => this.isOnline.next(true);
  private offlineListener = () => this.isOnline.next(false);

  constructor() {
    this.initializeNetworkStatus();
  }

  private initializeNetworkStatus(): void {
    window.addEventListener('online', this.onlineListener);
    window.addEventListener('offline', this.offlineListener);
  }

  public getStatus(): boolean {
    return this.isOnline.getValue();
  }

  ngOnDestroy(): void {
    // Cleanup: Remove event listeners to prevent memory leaks
    window.removeEventListener('online', this.onlineListener);
    window.removeEventListener('offline', this.offlineListener);
    this.isOnline.complete();
  }
}
