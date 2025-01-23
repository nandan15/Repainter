import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/Shared/models/customer';
import { CustomerProvider } from 'src/app/Shared/Provider/CustomerProvider';


@Component({
  selector: 'app-customer-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class CustomerViewComponent implements OnInit {
  isSidebarCollapsed = false;
  customers: Customer[] = [];
  selectedCustomer: Customer | null = null;
  currentPage = 1;
  pages = Array(10).fill(0).map((_, i) => i + 1);
  filteredCustomers: Customer[] = [];
  pageSize: number = 10;
  searchTerm: string = '';

  constructor(private customerProvider: CustomerProvider,private router: Router) {}

  ngOnInit(): void {
    this.customerProvider.customer.subscribe(customers => {
      this.customers = customers;
      this.filteredCustomers = [...customers];
      if (this.customers.length > 0 && !this.selectedCustomer) {
        this.selectCustomer(this.customers[0]);
      }
    });
    this.customerProvider.listCustomer();
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  searchCustomers(event?: any): void {
    const searchValue = this.searchTerm.trim().toLowerCase();
  
    if (!searchValue) {
      this.filteredCustomers = [...this.customers];
    } else {
      this.filteredCustomers = this.customers.filter(customer => 
        customer.name.toLowerCase().includes(searchValue) ||
        customer.city.toLowerCase().includes(searchValue) ||
        customer.phoneNumber.includes(searchValue)
      );
    }
  
    if (this.filteredCustomers.length > 0) {
      this.selectCustomer(this.filteredCustomers[0]);
    } else {
      this.selectedCustomer = null;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.filteredCustomers.length / this.pageSize);
  }

  get paginatedCustomers(): Customer[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredCustomers.slice(startIndex, startIndex + this.pageSize);
  }

  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  selectCustomer(customer: Customer): void {
    this.selectedCustomer = { ...customer };
  }

  viewCustomer(customer: Customer): void {
    console.log('Viewing customer:', customer);
  }

  nextCustomer(): void {
    const currentIndex = this.customers.findIndex(c => c.id === this.selectedCustomer?.id);
    if (currentIndex < this.customers.length - 1) {
      this.selectCustomer(this.customers[currentIndex + 1]);
    }
  }

  deleteCustomer(customer: Customer): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerProvider.deleteCustomer(customer);
    }
  }

  addNewCustomer(): void {
    const newCustomer: Customer = {
      id: 0,
      enquiryId: 0,
      title:'',
      name: '',
      emailId: '',
      phoneNumber: '',
      alternatePhoneNumber: '',
      projectName: '',
      houseNo: '',
      projectType: '',
      configurtion: '',
      carpetArea: '',
      projectLocation: '',
      city: '',
      floorPlan: '',
      sitePlan: ''
    };
    this.customerProvider.addCustomer(newCustomer);
  }

  updateCustomer(): void {
    if (this.selectedCustomer) {
      this.customerProvider.updateCustomer(this.selectedCustomer);
    }
  }

  private applySearch(customers: Customer[]): Customer[] {
    if (!this.searchTerm) return [...customers];
    return customers.filter(customer => 
      customer.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      customer.city.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      customer.phoneNumber.includes(this.searchTerm)
    );
  }

  trackByCustomerId(index: number, customer: Customer): number {
    return customer.id;
  }
  navigateToQuotationBuilder(customer: Customer): void {
    if (customer && customer.id) {
      console.log('Navigating to quotation builder with customer:', customer);
      this.router.navigate(['/quotation-builder/view', customer.id]);
    } else {
      console.error('No customer selected or invalid customer ID');
    }
  }  
}