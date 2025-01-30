import { Component, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {
  Users, Package, FileText,
  Truck, Settings, MessageCircle,
  Video, PieChart,
  LayoutDashboard,
  BaggageClaim,
  Lock, Unlock
} from 'lucide-angular';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  animations: [
    trigger('sidebarState', [
      state('collapsed', style({
        width: '80px'
      })),
      state('expanded', style({
        width: '280px'
      })),
      transition('collapsed <=> expanded', [
        animate('0.3s cubic-bezier(0.4, 0, 0.2, 1)')
      ])
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.2s', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0.2s', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ViewComponent {
  @Output() sidebarToggled = new EventEmitter<boolean>();
  
  isExpanded = true;
  showPasswordModal = false;
  password = '';
  error = '';
  selectedMenuItem: string = '';
  unlockedItems: Set<string> = new Set();
  private readonly ADMIN_PASSWORD = 'admin123';
  lockIcon = Lock;
  unlockIcon = Unlock;
  isLoading = false;
  baseMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', link: '/dashboard/dashboard', notification: '' },
    { icon: Users, label: 'Customers', link: '/customer/view', notifications: '' },
    { icon: Package, label: 'Products', link: '/quotation-builder/view', notifications: 5 }
  ];

  protectedMenuItems = [
    { icon: PieChart, label: 'Reports', link: '/reports', requiresAuth: true },
    { icon: BaggageClaim, label: 'Procurement', link: '/procurement/procurement', requiresAuth: true },
    { icon: Truck, label: 'GRN', link: '/grn', requiresAuth: true },
    { icon: Settings, label: 'Settings', link: '/register/view', requiresAuth: true }
  ];

  bottomMenuItems = [
    { icon: MessageCircle, label: 'Testimonials', link: '/testimonials/testimonials' },
    { icon: Video, label: 'Videos', link: '/video/view' }
  ];

  ngOnInit() {
    const unlockedItems = localStorage.getItem('unlockedItems');
    if (unlockedItems) {
      this.unlockedItems = new Set(JSON.parse(unlockedItems));
    }
  }
  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
    this.sidebarToggled.emit(this.isExpanded);
  }

  handleMenuClick(item: any, event: Event) {
    if (item.requiresAuth && !this.unlockedItems.has(item.label)) {
      event.preventDefault();
      this.selectedMenuItem = item.label;
      this.showPasswordModal = true;
      this.password = '';
      this.error = '';
    }
  }

  checkPassword() {
    if (this.password === this.ADMIN_PASSWORD) {
      this.unlockedItems.add(this.selectedMenuItem);
      localStorage.setItem('unlockedItems', JSON.stringify(Array.from(this.unlockedItems)));
      this.showPasswordModal = false;
      this.error = '';
      const item = this.protectedMenuItems.find(item => item.label === this.selectedMenuItem);
      if (item) {
        window.location.href = item.link;
      }
    } else {
      this.error = 'Invalid password';
      this.password = '';
    }
  }

  closePasswordModal() {
    this.showPasswordModal = false;
    this.password = '';
    this.error = '';
  }

  isItemUnlocked(label: string): boolean {
    return this.unlockedItems.has(label);
  }
}
