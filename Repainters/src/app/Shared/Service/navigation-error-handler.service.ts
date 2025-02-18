import { Injectable } from '@angular/core';
import { Router, NavigationError } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationErrorHandler {
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationError) {
        // Clean up stored ID if navigation fails
        localStorage.removeItem('lastSavedCustomerId');
        // Redirect to a safe route
        this.router.navigate(['/']);
      }
    });
  }
}