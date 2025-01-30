import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Customer } from 'src/app/Shared/models/customer';
import { CustomerProvider } from 'src/app/Shared/Provider/CustomerProvider';

@Component({
  selector: 'app-customer-modal',
  templateUrl: './customer-modal.component.html',
  styleUrls: ['./customer-modal.component.css']
})
export class CustomerModalComponent implements OnInit {
  isVisible = false;
  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  searchTerm = '';
  sortField = 'custId';
  sortAscending = true;

  @Output() customerSelected = new EventEmitter<Customer>();

  constructor(private customerProvider: CustomerProvider) {}

  ngOnInit() {
    this.customerProvider.customer.subscribe(customers => {
      this.customers = customers;
      this.applyFilters();
    });
  }

  showModal() {
    this.isVisible = true;
  }

  closeModal(event?: MouseEvent) {
    this.isVisible = false;
  }

  applyFilters() {
    let filtered = [...this.customers];

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(customer => 
        customer.name.toLowerCase().includes(term) ||
        customer.projectName.toLowerCase().includes(term) ||
        customer.enquiryId.toString().includes(term)
      );
    }

    filtered.sort((a, b) => {
      let aValue = this.getSortValue(a);
      let bValue = this.getSortValue(b);
      
      return this.sortAscending ? (aValue < bValue ? -1 : (aValue > bValue ? 1 : 0)) : (aValue > bValue ? -1 : (aValue < bValue ? 1 : 0));
    });

    this.filteredCustomers = filtered;
  }

  private getSortValue(customer: Customer): any {
    switch (this.sortField) {
      case 'custId': return customer.enquiryId;
      case 'name': return customer.name;
      case 'projectName': return customer.projectName;
      default: return customer.enquiryId;
    }
  }

  toggleSortOrder() {
    this.sortAscending = !this.sortAscending;
    this.applyFilters();
  }

  selectCustomer(customer: Customer): void {
    this.customerSelected.emit(customer);
    this.closeModal();
  }
}
