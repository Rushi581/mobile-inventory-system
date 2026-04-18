import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private isOnline = new BehaviorSubject<boolean>(navigator.onLine);
  public isOnline$ = this.isOnline.asObservable();

  constructor() {
    this.initializeNetworkStatus();
  }

  private initializeNetworkStatus(): void {
    window.addEventListener('online', () => {
      this.isOnline.next(true);
    });

    window.addEventListener('offline', () => {
      this.isOnline.next(false);
    });
  }

  public getStatus(): boolean {
    return this.isOnline.getValue();
  }
}
