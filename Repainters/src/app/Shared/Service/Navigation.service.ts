import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private readonly CUSTOMER_ID_KEY = 'customerId';

  setCustomerId(customerId: string): void {
    sessionStorage.setItem(this.CUSTOMER_ID_KEY, customerId);
  }

  getCustomerId(): string | null {
    return sessionStorage.getItem(this.CUSTOMER_ID_KEY);
  }

  clearCustomerId(): void {
    sessionStorage.removeItem(this.CUSTOMER_ID_KEY);
  }
}