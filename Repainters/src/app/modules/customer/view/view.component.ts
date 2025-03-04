import { Component, Input, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Customer, CustomerImagesModel } from 'src/app/Shared/models/customer';
import { CustomerProvider } from 'src/app/Shared/Provider/CustomerProvider';
import { CustomerService, ImageUploadResponse } from 'src/app/Shared/Service/Customer/customer.service';
import { CustomerModalComponent } from '../customer-modal/customer-modal.component';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { environment } from 'src/environment/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class CustomerViewComponent implements OnInit, AfterViewInit {
  @ViewChild(CustomerModalComponent) 
  customerListModal!: CustomerModalComponent;
  @ViewChild('floorPlanInput') floorPlanInput!: ElementRef;
  @ViewChild('sitePlanInput') sitePlanInput!: ElementRef;
  private baseUrl = environment.backend.baseURL;
  uploadingFloorPlan = false;
  uploadingSitePlan = false;
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

  constructor(
    private customerProvider: CustomerProvider,
    private customerService: CustomerService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.customerProvider.customer.subscribe(customers => {
      this.customers = customers;
      this.filteredCustomers = [...customers]; 
      if (this.customers.length > 0 && !this.selectedCustomer) {
        this.selectCustomer(this.customers[0]);
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      console.log('Modal component:', this.customerListModal);
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
        customer.phoneNumber.includes(searchValue) ||
        customer.enquiryId.toLowerCase().includes(searchValue) ||
        customer.projectName.toLowerCase().includes(searchValue) ||
        customer.city.toLowerCase().includes(searchValue)
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

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredCustomers = [...this.customers];
    if (this.customers.length > 0) {
      this.selectCustomer(this.customers[0]);
    }
  }

  selectCustomer(customer: Customer): void {
    this.selectedCustomer = { ...customer };
    this.loadCustomerImages();
  }
  viewCustomer(customer: Customer): void {
    if (customer && customer.id) {
      this.router.navigate(['/customer/edit', customer.id]);
    } else {
      console.error('No customer selected or invalid customer ID');
    }
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
    if (!customer || !customer.id) {
      console.error('No customer selected or invalid customer ID');
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete ${customer.name}'s record? This action cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.customerProvider.deleteCustomer(customer).subscribe({
          next: () => {
            Swal.fire(
              'Deleted!',
              `${customer.name}'s record has been deleted.`,
              'success'
            );
            // If you have a list of customers, you may want to refresh it here
          },
          error: (error) => {
            console.error('Error deleting customer:', error);
            Swal.fire(
              'Error!',
              'There was an error deleting the customer.',
              'error'
            );
          }
        });
      }
    });
  }

  addNewCustomer(): void {
    const userId = localStorage.getItem('UserId');
    if (!userId) {
        this.toastr.error('User ID not found, Please try logging in again.');
        return;
    }

    const newCustomer: Customer = {
        id: 0,
        enquiryId: '0',
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
        sitePlan: [],
        deleted: false,
        lastModified: new Date(),
        lastModifiedBy: parseInt(userId),
        createdOn: new Date(),
        createdBy: parseInt(userId)
    };

 
    const floorPlanFiles: File[] = [];
    const sitePlanFiles: File[] = [];

    this.customerProvider.addCustomer(newCustomer, floorPlanFiles, sitePlanFiles).subscribe({
        next: (response) => {
            if (response.success) {
                this.toastr.success('Customer added successfully');
            
            } else {
             
                this.toastr.error('Failed to add customer');
            }
        },
        error: (error) => {
            console.error('Error adding customer:', error);
            this.toastr.error(error.message || 'Failed to add customer');
        }
    });
}

getImageUrl(imageUrl: string): string {
  if (!imageUrl) return '';
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  const cleanPath = imageUrl.startsWith('/') ? imageUrl.substring(1) : imageUrl;
  const formattedBaseUrl = this.baseUrl.endsWith('/') ? this.baseUrl : `${this.baseUrl}/`;
  return `${formattedBaseUrl}${cleanPath}`;
}


getImageArray(images: string | string[] | null): string[] {
  if (!images) return [];
  if (typeof images === 'string') {
    if (images.includes(',')) {
      return images.split(',').map(img => img.trim());
    }
    try {
      const parsed = JSON.parse(images);
      return Array.isArray(parsed) ? parsed : [images];
    } catch {
      return [images];
    }
  }
  return images;
}


onFileSelected(event: Event, type: 'floorPlan' | 'sitePlan'): void {
  const input = event.target as HTMLInputElement;
  const files = input.files;

  if (!files || files.length === 0) {
    this.toastr.error('No file selected');
    return;
  }

  if (!this.selectedCustomer) {
    this.toastr.error('No customer selected');
    return;
  }

  const uploadType: 'floor' | 'site' = type === 'floorPlan' ? 'floor' : 'site';

  const filesToUpload = Array.from(files).filter(file => {
    if (!this.isValidFileType(file)) {
      this.toastr.error(`Invalid file type for ${file.name}`);
      return false;
    }
    if (!this.isValidFileSize(file)) {
      this.toastr.error(`File ${file.name} is too large`);
      return false;
    }
    return true;
  });

  if (filesToUpload.length === 0) {
    input.value = '';
    return;
  }

  if (type === 'floorPlan') {
    this.uploadingFloorPlan = true;
  } else {
    this.uploadingSitePlan = true;
  }

  this.customerProvider.uploadMultipleImages(this.selectedCustomer.id, filesToUpload, uploadType)
    .pipe(
      finalize(() => {
        input.value = '';
        if (type === 'floorPlan') {
          this.uploadingFloorPlan = false;
        } else {
          this.uploadingSitePlan = false;
        }
      })
    )
    .subscribe({
      next: (responses: ImageUploadResponse[]) => {
        const successCount = responses.filter(r => r.success).length;
        if (successCount > 0) {
          this.toastr.success(`Successfully uploaded ${successCount} images`);
          this.loadCustomerImages();
        }
        if (successCount < filesToUpload.length) {
          this.toastr.warning(`Failed to upload ${filesToUpload.length - successCount} images`);
        }
      },
      error: (error) => {
        console.error('Upload error:', error);
        this.toastr.error('Failed to upload images');
      }
    });
}
private loadCustomerImages(): void {
  if (!this.selectedCustomer) return;

  this.customerService.getImagesById(this.selectedCustomer.id)
    .pipe(
      finalize(() => {
        this.uploadingFloorPlan = false;
        this.uploadingSitePlan = false;
      })
    )
    .subscribe({
      next: (response) => {
        if (response.success && response.data) {
          if (this.selectedCustomer) {
            this.selectedCustomer = {
              ...this.selectedCustomer,
              floorPlan: response.data.floorPlan || [],
              sitePlan: response.data.sitePlan || []
            };
          }
        } else {
          this.toastr.error(response.message || 'Failed to load customer images');
        }
      },
      error: (error) => {
        console.error('Error loading customer images:', error);
        this.toastr.error('Failed to load customer images');
      }
    });
}
  private resetUploadState(type: 'floorPlan' | 'sitePlan'): void {
    if (type === 'floorPlan') {
      this.uploadingFloorPlan = false;
    } else {
      this.uploadingSitePlan = false;
    }
  }

  private isValidFileType(file: File): boolean {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    return validTypes.includes(file.type);
  }

  private isValidFileSize(file: File): boolean {
    const maxSize = 100 * 1024 * 1024; 
    return file.size <= maxSize;
  }
  refreshImages(): void {
    if (this.selectedCustomer) {
      this.loadCustomerImages();
    }
  }
  refreshCustomerImages(): void {
    if (!this.selectedCustomer) return;

    this.customerService.getCustomerById(this.selectedCustomer.id)
      .pipe(finalize(() => {
        this.uploadingFloorPlan = false;
        this.uploadingSitePlan = false;
      }))
      .subscribe({
        next: (customer: Customer) => {
          if (customer) {
            this.selectedCustomer = {
              ...customer,
              floorPlan: this.getImageArray(customer.floorPlan),
              sitePlan: this.getImageArray(customer.sitePlan)
            };
            
            const index = this.customers.findIndex(c => c.id === customer.id);
            if (index !== -1) {
              this.customers[index] = this.selectedCustomer;
              this.filteredCustomers = this.applySearch(this.customers);
            }
          }
        },
        error: (error) => {
          console.error('Error refreshing customer images:', error);
          this.toastr.error('Failed to refresh images');
        }
      });
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
    this.previewImage = this.getImageUrl(imageUrl);
  }

  closeImagePreview(): void {
    this.previewImage = null;
  }
  refreshCustomerData(): void {
    if (this.selectedCustomer) {
      this.customerService.getCustomerById(this.selectedCustomer.id).subscribe({
        next: (customer: Customer) => {
          if (customer) {
            this.selectedCustomer = {
              ...customer,
              floorPlan: this.getImageArray(customer.floorPlan),
              sitePlan: this.getImageArray(customer.sitePlan)
            };
          } else {
            this.toastr.error('Customer not found');
          }
        },
        error: (error: any) => {
          console.error('Error refreshing customer data:', error);
        }
      });
    }
  }

  updateCustomer(): void {
    if (this.selectedCustomer) {
      this.customerProvider.updateCustomer(this.selectedCustomer);
    }
  }

  private applySearch(customers: Customer[]): Customer[] {
    if (!this.searchTerm) return [...customers];
    const searchValue = this.searchTerm.toLowerCase();
    
    return customers.filter(customer => 
      customer.name.toLowerCase().includes(searchValue) ||
      customer.phoneNumber.includes(searchValue) ||
      customer.enquiryId.toLowerCase().includes(searchValue) ||
      customer.projectName.toLowerCase().includes(searchValue) ||
      customer.city.toLowerCase().includes(searchValue)
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