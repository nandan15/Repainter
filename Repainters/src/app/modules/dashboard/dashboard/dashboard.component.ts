import { Component, OnInit } from '@angular/core';
interface CardData {
  title: string;
  value: string;
  trend: string;
  icon: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isSidebarExpanded = true;
  
  cardData: CardData[] = [
    {
      title: 'Total Revenue',
      value: '$54,239',
      trend: '+12.5%',
      icon: 'chart-line'
    },
    {
      title: 'Active Users',
      value: '2,435',
      trend: '+8.2%',
      icon: 'users'
    },
    {
      title: 'Conversion Rate',
      value: '4.3%',
      trend: '-2.4%',
      icon: 'chart-pie'
    },
    {
      title: 'Avg. Session',
      value: '2m 45s',
      trend: '+6.1%',
      icon: 'clock'
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  onSidebarToggle(expanded: boolean): void {
    this.isSidebarExpanded = expanded;
  }
}
