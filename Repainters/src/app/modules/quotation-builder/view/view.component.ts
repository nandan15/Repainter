import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerProvider } from 'src/app/Shared/Provider/CustomerProvider';
import { Customer } from 'src/app/Shared/models/customer';
import { Location } from '@angular/common';
import { NavigationService } from 'src/app/Shared/Service/Navigation.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;

  customerName: string = 'Loading...';
  customerId: number | null = null;
  quotationForm: FormGroup;
  activeTabIndex: number = 0;
  isFormModified: boolean = false;
  currentCustomer: Customer | null = null;
  showPackageTab: boolean = false;

  showSummaryTab: { [columnName: string]: boolean } = {
    Summary: true,
  };
  showNoteTab: { [columnName: string]: boolean } = {
    Note: true,
  };

  private readonly ALL_TABS = [
    'package',
    'internalPainting',
    'wallpaper',
    'texturePainting',
    'paneling',
    'curtains',
    'furniture',
    'services',
    'doorGrills',
    'summary',
    'note'
  ];

  tabModifications: { [key: string]: boolean } = {
    ['package']: false,
    ['internalPainting']: false,
    ['wallpaper']: false,
    ['texturePainting']: false,
    ['paneling']: false,
    ['curtains']: false,
    ['furniture']: false,
    ['services']: false,
    ['doorGrills']: false,
    ['summary']: false,
    ['note']: false
  };

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key.toLowerCase() === 'd' && event.shiftKey) {
      event.preventDefault();
      const summaryIndex = this.getTabIndex('summary');
      if (summaryIndex !== -1) {
        this.navigateToTab(summaryIndex);
      }
    } else if (event.key.toLowerCase() === 'n' && event.shiftKey) {
      event.preventDefault();
      const noteIndex = this.getTabIndex('note');
      if (noteIndex !== -1) {
        this.navigateToTab(noteIndex);
      }
    }
  }
  
  getTabIndex(tabName: string): number {
    let index = 0;
    for (const tab of this.ALL_TABS) {
      if (tab === tabName) {
        return index;
      }
      if (this.isTabVisible(tab)) {
        index++;
      }
    }
    return -1;
  }

  // Determine if a tab should be visible
  isTabVisible(tabName: string): boolean {
    if (tabName === 'package') {
      return this.showPackageTab;
    }
    return true;
  }

  constructor(
    private route: ActivatedRoute,
    private customerProvider: CustomerProvider,
    private formBuilder: FormBuilder,
    private location: Location,
    private router:Router,
    private navigationService: NavigationService
  ) {
    this.quotationForm = this.formBuilder.group({
      package: this.formBuilder.array([]),
      internalPainting: this.formBuilder.group({}),
      wallpaper: this.formBuilder.group({}),
      texturePainting: this.formBuilder.group({}),
      paneling: this.formBuilder.group({}),
      curtains: this.formBuilder.group({}),
      furniture: this.formBuilder.group({}),
      services: this.formBuilder.group({}),
      doorGrills: this.formBuilder.group({}),
      note: this.formBuilder.group({}),
      summary: this.formBuilder.group({})
    });

    this.quotationForm.valueChanges.subscribe(() => {
      this.isFormModified = true;
    });
    this.customerId = this.route.snapshot.params['customerId'];
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const customerId = params['customerId'];
      
      if (customerId) {
        this.customerId = Number(customerId);
        
        const customer = this.customerProvider.getCustomerByIdFromState(this.customerId);
        
        if (customer) {
          this.customerName = customer.name;
          this.currentCustomer = customer;
          this.showPackageTab = customer.projectType === 'Apartment';
        } else {
          this.customerProvider.listCustomer();
          
          this.customerProvider.getCustomerById(this.customerId).subscribe(
            (customer) => {
              this.customerName = customer.name || 'Unknown Customer';
              this.currentCustomer = customer;
              this.showPackageTab = customer.projectType === 'Apartment';
            },
            (error) => {
              this.customerName = 'Unknown Customer';
              console.error('Error fetching customer:', error);
            }
          );
        }
      }
    });
  }

  navigateToTab(index: number) {
    this.activeTabIndex = index;
    setTimeout(() => {
      this.tabGroup.selectedIndex = index;
      this.tabGroup._tabs.forEach(tab => {
        if (tab.position === index) {
          tab.isActive = true;
        }
      });
    });
  }

 
  onTabChange(event: any) {
    this.activeTabIndex = event.index;
  }

  onPackageModified() {
    this.isFormModified = true;
    this.tabModifications['package'] = true;
  }

  onTabModified(tabName: string) {
    this.isFormModified = true;
    this.tabModifications[tabName] = true;
  }

  toggleSummaryVisibility(columnName: string) {
    this.showSummaryTab[columnName] = !this.showSummaryTab[columnName];
  }

  toggleNoteVisibility(columnName: string) {
    this.showNoteTab[columnName] = !this.showNoteTab[columnName];
  }
  navigateToDashboard() {
    if (this.customerId !== null) {
        this.navigationService.setCustomerId(this.customerId.toString());
        this.router.navigate(['/dashboard/dashboard']);
    } else {
        console.error('Customer ID is null');
        // Handle the error case as needed
    }
}

  generateScopeDoc() {
    console.log('Generating Scope Document...');
    Object.keys(this.tabModifications).forEach(key => {
      this.tabModifications[key] = false;
    });
    this.isFormModified = false;
  }

  getTabLabel(baseLabel: string, tabName: string): { label: string, modified: boolean } {
    return {
      label: baseLabel,
      modified: this.tabModifications[tabName]
    };
  }

  get package(): FormArray {
    return this.quotationForm.get('package') as FormArray;
  }
  
  handleFormChange() {
    this.isFormModified = true;
  }
}