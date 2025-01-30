import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/Shared/Service/Navigation.service';

interface StatData {
  icon: string;
  number: string;
  description: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isSidebarExpanded = true;
  customerId: string | null;
  
  statsData: StatData[] = [
    {
      icon: '/assets/icon1.png',
      number: 'Unmatched Expertise',
      description: '400+ Completed Projects'
    },
    {
      icon: '/assets/icon2.png',
      number: 'Modern & Innovative',
      description: 'Latest Cutting-edge Technology'
    },
    {
      icon: '/assets/icon3.png',
      number: 'Skilled Workforce',
      description: '600+ Expert Painters'
    },
    {
      icon: '/assets/icon4.png',
      number: '100% Proven Track Record',
      description: 'All Projects Handed Over On Time!'
    },
    {
      icon: '/assets/icon5.png',
      number: 'Quality Assurance',
      description: 'Best In Class Products and Material'
    },
    {
      icon: '/assets/icon6.png',
      number: 'Customer Centric Approach',
      description: 'Your Satisfaction Is Our Priority, Always!'
    }
  ];

  constructor(
    private router: Router,
    private navigationService: NavigationService
  ) {
    this.customerId = this.navigationService.getCustomerId();
  }

  ngOnInit(): void {}

  onSidebarToggle(expanded: boolean): void {
    this.isSidebarExpanded = expanded;
  }
  goBackToQuote() {
    if (this.customerId) {
      this.router.navigate(['/quotation-builder/view', this.customerId]);
      this.navigationService.clearCustomerId(); // Optional: Clear after navigation
    } else {
      this.router.navigate(['/quotation-builder/view']);
    }
  }
}