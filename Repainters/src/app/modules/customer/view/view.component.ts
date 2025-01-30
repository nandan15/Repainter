import { Component, Input, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/Shared/models/customer';
import { CustomerProvider } from 'src/app/Shared/Provider/CustomerProvider';
import { CustomerService } from 'src/app/Shared/Service/Customer/customer.service';
import { CustomerModalComponent } from '../customer-modal/customer-modal.component';
import { ToastrService } from 'ngx-toastr';
import { ResponseObj } from 'src/app/Shared/models/login';


@Component({
  selector: 'app-customer-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class CustomerViewComponent implements OnInit {
  @ViewChild(CustomerModalComponent) 
  customerListModal!: CustomerModalComponent;
  @ViewChild('floorPlanInput') floorPlanInput!: any;
  @ViewChild('sitePlanInput') sitePlanInput!: any;
  previewImage: string | null = null;

  @Input() currentCustomer: Customer = new Customer;
  isSidebarCollapsed = false;
  customers: Customer[] = [];
  selectedCustomer: Customer | null = null;
  currentPage = 1;
  pages = Array(10).fill(0).map((_, i) => i + 1);
  filteredCustomers: Customer[] = [];
  pageSize: number = 10;
  searchTerm: string = '';

  constructor(private customerProvider: CustomerProvider,
    private customerService: CustomerService,private router: Router, private toastr: ToastrService) {}

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
  ngAfterViewInit() {
    // This ensures ViewChild is properly initialized
    setTimeout(() => {
      console.log('Modal component:', this.customerListModal); // Debug log
    });
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
 openCustomerList() {
    if (this.customerListModal) {
      this.customerListModal.showModal();
    } else {
      console.error('Modal component not initialized');
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
      title: '',
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
      floorPlan: [],
      sitePlan: []
    };
    this.customerService.addCustomer(newCustomer);
  }

  getImageArray(images: string | string[]): string[] {
    if (!images) return [];
    if (typeof images === 'string') {
      try {
        return JSON.parse(images);
      } catch {
        return [images];
      }
    }
    return images;
  }

  onFileSelected(event: any, type: 'floorPlan' | 'sitePlan'): void {
    const file = event.target.files[0];
    if (file && this.selectedCustomer) {
      this.customerService.uploadImage(this.selectedCustomer.id, file, type).subscribe(
        (response: any) => {
          this.toastr.success(`${type === 'floorPlan' ? 'Floor plan' : 'Site plan'} uploaded successfully`);
          this.refreshCustomerData();
        },
        (error: any) => {
          this.toastr.error(`Failed to upload ${type === 'floorPlan' ? 'floor plan' : 'site plan'}`);
          console.error('Upload error:', error);
        }
      );
    }
  }

  downloadImage(imageUrl: string): void {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = imageUrl.split('/').pop() || 'image';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  openImagePreview(imageUrl: string): void {
    this.previewImage = imageUrl;
  }

  closeImagePreview(): void {
    this.previewImage = null;
  }

  refreshCustomerData(): void {
    if (this.selectedCustomer) {
      this.customerService.getCustomerById(this.selectedCustomer.id).subscribe(
        (customer: Customer) => {
          this.selectedCustomer = customer;
        },
        (error: any) => {
          this.toastr.error('Failed to refresh customer data');
          console.error('Error refreshing customer data:', error);
        }
      );
    }
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