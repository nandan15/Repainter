import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  customerId: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Get customerId from route params
    this.route.params.subscribe(params => {
      this.customerId = params['customerId'];
      if (!this.customerId) {
        console.error('No customer ID found in route params');
      }
    });
  }

  navigateToPackage(packageType: string) {
    if (this.customerId) {
      this.router.navigate(['/package/package', this.customerId], {
        queryParams: { type: packageType }
      });
    } else {
      console.error('Cannot navigate: No customer ID available');
    }
  }
}