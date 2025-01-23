import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { CustomerProvider } from 'src/app/Shared/Provider/CustomerProvider';

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

  
  readonly SUMMARY_TAB_INDEX = 9;
  readonly NOTE_TAB_INDEX = 10;
  showSummaryTab: { [columnName: string]: boolean } = {
    Summary: true,
  };
  showNoteTab: { [columnName: string]: boolean } = {
    Note: true,
  };

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key.toLowerCase() === 'd' && event.shiftKey) {
      event.preventDefault();
      this.navigateToTab(this.SUMMARY_TAB_INDEX);
    } else if (event.key.toLowerCase() === 'n' && event.shiftKey) {
      event.preventDefault();
      this.navigateToTab(this.NOTE_TAB_INDEX);
    }
  }
  get packageFormArray(): FormArray {
    return this.quotationForm.get('package') as FormArray;
  }
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
  onPackageModified() {
    this.isFormModified = true;
    this.tabModifications['package'] = true;
  }

  // Fixed onTabModified method
  onTabModified(tabName: string) {
    this.isFormModified = true;
    this.tabModifications[tabName] = true;
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
  constructor(
    private route: ActivatedRoute,
    private customerProvider: CustomerProvider,
    private formBuilder: FormBuilder
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
      this.isFormModified = true; // Mark as modified when any field changes
    });
  }
  onTabChange(event: any) {
    this.activeTabIndex = event.index;
  }
  toggleSummaryVisibility(columnName: string) {
    this.showSummaryTab[columnName] = !this.showSummaryTab[columnName];
  }
  toggleNoteVisibility(columnName: string) {
    this.showNoteTab[columnName] = !this.showNoteTab[columnName];
  }
  ngOnInit() {
    // Fetch customer data and load quotation data on initialization
    this.route.params.subscribe(params => {
      const customerId = params['customerId'];
      
      if (customerId) {
        this.customerId = Number(customerId);
        
        const customer = this.customerProvider.getCustomerByIdFromState(this.customerId);
        
        if (customer) {
          this.customerName = customer.name;
          console.log('Customer found in state:', customer);
        } else {
          this.customerProvider.getCustomerById(this.customerId).subscribe(
            (customer) => {
              this.customerName = customer.name;
              console.log('Customer fetched from API:', customer);
            },
            (error) => {
              this.customerName = 'Unknown Customer';
              console.error('Error fetching customer:', error);
            }
          );
        }

        // Load quotation data for the specific customer
        this.loadQuotationData(this.customerId);
        
        // Reset the modification flag when data is loaded
        this.isFormModified = false;
      }
    });
  }

  loadQuotationData(customerId: number) {
    console.log('Loading quotation data for customer:', customerId);
    
    // Reset modification flag when loading data
    this.isFormModified = false;

    // Load actual data logic here...
  }

  generateScopeDoc() {
    console.log('Generating Scope Document...');
    // Reset all modification flags
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
    return this.quotationForm.get('package') as FormArray; // Ensure it's not null here
  }
  
  handleFormChange() {
    // Set modified state when any child component changes
    this.isFormModified = true; 
  }
}