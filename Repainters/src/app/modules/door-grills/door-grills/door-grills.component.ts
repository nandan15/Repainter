import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { Door_Grill, MainDoor, InternalDoor, WindowGrill, BalconyGrill } from 'src/app/Shared/models/door_grill';
import { Door_GrillProvider } from 'src/app/Shared/Provider/Door_GrillProvider';

@Component({
  selector: 'app-door-grills',
  templateUrl: './door-grills.component.html',
  styleUrls: ['./door-grills.component.css']
})
export class DoorGrillsComponent implements OnInit {
  private destroy$ = new Subject<void>();
  customerId: number | null = null;
  @Input() currentDoor_Grill: Door_Grill = new Door_Grill();
  showMainDoorSection = true; // Changed from false
  showInternalDoorSection = true; // Changed from false
  showWindowGrillSection = true; // Changed from false
  showBalconyGrillSection = true; 

  constructor(
    private route: ActivatedRoute,
    private doorgrillprovider: Door_GrillProvider,private toaster:ToastrService
  ) {}

  ngOnInit(): void {
    this.extractCustomerId();
    if (this.customerId) {
      this.loadDoorGrillData(this.customerId);
    } else {
      // Add default empty entries when no data is loaded
      this.initializeDefaultEntries();
    }
  }

  // Add this new method to initialize default entries
  private initializeDefaultEntries(): void {
    // Add one empty entry for each section
    if (this.currentDoor_Grill.mainDoors.length === 0) {
      this.currentDoor_Grill.mainDoors.push({
        length: 0,
        height: 0,
        numberOfDoors: 0,
        surface: '1',
        price: 0,
        remarks: ''
      });
    }

    if (this.currentDoor_Grill.internalDoors.length === 0) {
      this.currentDoor_Grill.internalDoors.push({
        length: 0,
        height: 0,
        numberOfDoors: 0,
        surface: '1',
        price: 0,
        remarks: ''
      });
    }

    if (this.currentDoor_Grill.windowGrills.length === 0) {
      this.currentDoor_Grill.windowGrills.push({
        length: 0,
        height: 0,
        price: 0,
        remarks: ''
      });
    }

    if (this.currentDoor_Grill.balconyGrills.length === 0) {
      this.currentDoor_Grill.balconyGrills.push({
        length: 0,
        height: 0,
        price: 0,
        remarks: ''
      });
    }
  }

  // Modify the clearForm method to maintain at least one entry
  clearForm(): void {
    this.currentDoor_Grill = new Door_Grill();
    this.initializeDefaultEntries();
    // Keep the sections visible
    this.showMainDoorSection = true;
    this.showInternalDoorSection = true;
    this.showWindowGrillSection = true;
    this.showBalconyGrillSection = true;
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private extractCustomerId(): void {
    if (this.route.parent) {
      this.route.parent.paramMap
        .pipe(takeUntil(this.destroy$))
        .subscribe(params => {
          const customerIdParam = params.get('customerId');
          if (customerIdParam) {
            this.customerId = parseInt(customerIdParam, 10);
          }
        });
    }

    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const customerIdParam = params.get('customerId');
        if (customerIdParam) {
          this.customerId = parseInt(customerIdParam, 10);
        }
      });

    if (this.currentDoor_Grill?.customerId) {
      this.customerId = this.currentDoor_Grill.customerId;
    }
  }

  loadDoorGrillData(customerId: number): void {
    this.doorgrillprovider.getDoor_GrillByCustomerId(customerId, { deleted: 0 })
      .subscribe((data: any[]) => {
        if (data && data.length > 0) {
          const doorGrillData = data[0]; // Get the first record
          
          // Initialize the current Door_Grill object
          this.currentDoor_Grill = new Door_Grill();
          this.currentDoor_Grill.door_GrillId = doorGrillData.door_GrillId;
          this.currentDoor_Grill.customerId = doorGrillData.customerId;
          this.currentDoor_Grill.sectionTotal = doorGrillData.sectionTotal;
          
          // Add Main Door data if exists
          if (doorGrillData.mainDoorLength || doorGrillData.mainDoorHeight) {
            this.showMainDoorSection = true;
            this.currentDoor_Grill.mainDoors = [{
              length: doorGrillData.mainDoorLength || 0,
              height: doorGrillData.mainDoorHeight || 0,
              numberOfDoors: doorGrillData.mainDoorNumber_of_Doors || 0,
              surface: doorGrillData.mainDoorSurface || '1',
              price: doorGrillData.mainDoorPrice || 0,
              remarks: doorGrillData.mainDoorRemarks || ''
            }];
          }
  
          // Add Internal Door data if exists
          if (doorGrillData.internalDoorLength || doorGrillData.internalDoorHeight) {
            this.showInternalDoorSection = true;
            this.currentDoor_Grill.internalDoors = [{
              length: doorGrillData.internalDoorLength || 0,
              height: doorGrillData.internalDoorHeight || 0,
              numberOfDoors: doorGrillData.internalDoorNumber_of_Doors || 0,
              surface: doorGrillData.internalDoorSurface || '1',
              price: doorGrillData.internalDoorPrice || 0,
              remarks: doorGrillData.internalDoorRemarks || ''
            }];
          }
  
          // Add Window Grill data if exists
          if (doorGrillData.window_GrillLength || doorGrillData.window_GrillHeight) {
            this.showWindowGrillSection = true;
            this.currentDoor_Grill.windowGrills = [{
              length: doorGrillData.window_GrillLength || 0,
              height: doorGrillData.window_GrillHeight || 0,
              price: doorGrillData.window_GrillPrice || 0,
              remarks: doorGrillData.window_GrillRemarks || ''
            }];
          }
  
          // Add Balcony Grill data if exists
          if (doorGrillData.balcony_GrillLength || doorGrillData.balcony_GrillHeight) {
            this.showBalconyGrillSection = true;
            this.currentDoor_Grill.balconyGrills = [{
              length: doorGrillData.balcony_GrillLength || 0,
              height: doorGrillData.balcony_GrillHeight || 0,
              price: doorGrillData.balcony_GrillPrice || 0,
              remarks: doorGrillData.balcony_GrillRemarks || ''
            }];
          }
  
          // Recalculate all prices
          this.calculateTotal();
        } else {
          // Initialize a new Door_Grill if no data found
          this.currentDoor_Grill = new Door_Grill();
          this.currentDoor_Grill.customerId = customerId;
        }
      }, error => {
        console.error('Error loading door grill data:', error);
        // Initialize a new Door_Grill if error occurs
        this.currentDoor_Grill = new Door_Grill();
        this.currentDoor_Grill.customerId = customerId;
      });
  }

  addMainDoor(): void {
    this.showMainDoorSection = true;
    this.currentDoor_Grill.mainDoors.push({
      length: 0,
      height: 0,
      numberOfDoors: 0,
      surface: '1',
      price: 0,
      remarks: ''
    });
    this.calculateMainDoorPrice(this.currentDoor_Grill.mainDoors.length - 1);
  }
  
  addInternalDoor(): void {
    this.showInternalDoorSection = true;
    this.currentDoor_Grill.internalDoors.push({
      length: 0,
      height: 0,
      numberOfDoors: 0,
      surface: '1',
      price: 0,
      remarks: ''
    });
    this.calculateInternalDoorPrice(this.currentDoor_Grill.internalDoors.length - 1);
  }

  addWindow(): void {
    this.showWindowGrillSection = true;
    this.currentDoor_Grill.windowGrills.push({
      length: 0,
      height: 0,
      price: 0,
      remarks: ''
    });
  }

  addBalcony(): void {
    this.showBalconyGrillSection = true;
    this.currentDoor_Grill.balconyGrills.push({
      length: 0,
      height: 0,
      price: 0,
      remarks: ''
    });
  }
  removeMainDoor(index: number): void {
    this.currentDoor_Grill.mainDoors.splice(index, 1);
    this.calculateTotal();
  }

  removeInternalDoor(index: number): void {
    this.currentDoor_Grill.internalDoors.splice(index, 1);
    this.calculateTotal();
  }

  removeWindowGrill(index: number): void {
    this.currentDoor_Grill.windowGrills.splice(index, 1);
    this.calculateTotal();
  }

  removeBalconyGrill(index: number): void {
    this.currentDoor_Grill.balconyGrills.splice(index, 1);
    this.calculateTotal();
  }
  calculateDoorPrice(door: MainDoor | InternalDoor): number {
    return door.length * door.height * door.numberOfDoors * parseFloat(door.surface) * 24;
  }
  calculateMainDoorPrice(index: number): void {
    const door = this.currentDoor_Grill.mainDoors[index];
    door.price = door.length * door.height * door.numberOfDoors * parseFloat(door.surface) * 24;
    this.calculateTotal();
  }

  calculateInternalDoorPrice(index: number): void {
    const door = this.currentDoor_Grill.internalDoors[index];
    door.price = door.length * door.height * door.numberOfDoors * parseFloat(door.surface) * 24;
    this.calculateTotal();
  }
  calculateWindowGrill(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value) || 0;

    if (input.classList.contains('window-length')) {
      this.currentDoor_Grill.windowGrills[index].length = value;
    } else if (input.classList.contains('window-height')) {
      this.currentDoor_Grill.windowGrills[index].height = value;
    }

    this.currentDoor_Grill.windowGrills[index].price = this.calculateGrillPrice(this.currentDoor_Grill.windowGrills[index]);
    this.calculateTotal();
  }

  calculateBalconyGrill(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value) || 0;

    if (input.classList.contains('balcony-length')) {
      this.currentDoor_Grill.balconyGrills[index].length = value;
    } else if (input.classList.contains('balcony-height')) {
      this.currentDoor_Grill.balconyGrills[index].height = value;
    }

    this.currentDoor_Grill.balconyGrills[index].price = this.calculateGrillPrice(this.currentDoor_Grill.balconyGrills[index]);
    this.calculateTotal();
  }

  calculateGrillPrice(grill: WindowGrill | BalconyGrill): number {
    return grill.length * grill.height;
  }

  calculateTotal(): void {
    let total = 0;
  
    this.currentDoor_Grill.mainDoors.forEach(door => total += door.price);
    this.currentDoor_Grill.internalDoors.forEach(door => total += door.price);
    this.currentDoor_Grill.windowGrills.forEach(grill => total += grill.price);
    this.currentDoor_Grill.balconyGrills.forEach(grill => total += grill.price);
  
    this.currentDoor_Grill.sectionTotal = total;
  }
  saveDoorGrill(): void {
    const userId = localStorage.getItem('UserId');
    if (!userId) {
        console.error('User ID not found in localStorage');
        this.toaster.error('User ID not found. Please try logging in again.');
        return;
    }
    if (this.customerId) {
      // Get the first entry from each array or use default values
      const mainDoor = this.currentDoor_Grill.mainDoors[0] || {
        length: 0,
        height: 0,
        numberOfDoors: 0,
        surface: '1',
        price: 0,
        remarks: '' // Ensure this is never null
      };
      
      const internalDoor = this.currentDoor_Grill.internalDoors[0] || {
        length: 0,
        height: 0,
        numberOfDoors: 0,
        surface: '1',
        price: 0,
        remarks: '' // Ensure this is never null
      };
      
      const windowGrill = this.currentDoor_Grill.windowGrills[0] || {
        length: 0,
        height: 0,
        price: 0,
        remarks: '' // Ensure this is never null
      };
      
      const balconyGrill = this.currentDoor_Grill.balconyGrills[0] || {
        length: 0,
        height: 0,
        price: 0,
        remarks: '' // Ensure this is never null
      };
  
      // Create a formatted object that matches the backend model
      const formattedData = {
        door_GrillId: this.currentDoor_Grill.door_GrillId,
        door_GrillTabId: this.currentDoor_Grill.door_GrillTabId,
        generatedId: this.currentDoor_Grill.generatedId,
        customerId: this.customerId,
        mainDoorLength: mainDoor.length,
        mainDoorHeight: mainDoor.height,
        mainDoorNumber_of_Doors: mainDoor.numberOfDoors,
        mainDoorSurface: mainDoor.surface,
        mainDoorPrice: mainDoor.price,
        mainDoorRemarks: mainDoor.remarks || '', // Ensure this is never null
        internalDoorLength: internalDoor.length,
        internalDoorHeight: internalDoor.height,
        internalDoorNumber_of_Doors: internalDoor.numberOfDoors,
        internalDoorSurface: internalDoor.surface,
        internalDoorPrice: internalDoor.price,
        internalDoorRemarks: internalDoor.remarks || '', // Ensure this is never null
        window_GrillLength: windowGrill.length,
        window_GrillHeight: windowGrill.height,
        window_GrillPrice: windowGrill.price,
        window_GrillRemarks: windowGrill.remarks || '', // Ensure this is never null
        balcony_GrillLength: balconyGrill.length,
        balcony_GrillHeight: balconyGrill.height,
        balcony_GrillPrice: balconyGrill.price,
        balcony_GrillRemarks: balconyGrill.remarks || '', // Ensure this is never null
        sectionTotal: this.currentDoor_Grill.sectionTotal,
        deleted: false,
        createdBy:parseInt(userId),
        createdOn: new Date(),
        lastModifiedBy: parseInt(userId),
        lastModifiedOn: new Date()
      };
  
      this.doorgrillprovider.addDoor_Grill(formattedData).subscribe(
        (response: any) => {
          console.log('Door Grill saved successfully:', response);
        },
        (error) => {
          console.error('Error saving Door Grill:', error);
        }
      );
    }
  }
  updatePrice(event: Event, index: number, type: string): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    switch (type) {
      case 'mainDoor':
        const mainDoor = this.currentDoor_Grill.mainDoors[index];
        if (input.placeholder === 'Length') {
          mainDoor.length = parseFloat(value) || 0;
        } else if (input.placeholder === 'Height') {
          mainDoor.height = parseFloat(value) || 0;
        } else if (input.placeholder === 'Number of Doors') {
          mainDoor.numberOfDoors = parseFloat(value) || 0;
        } else if (input.type === 'radio') {
          mainDoor.surface = value;
        }
        this.calculateMainDoorPrice(index);
        break;

      case 'internalDoor':
        const internalDoor = this.currentDoor_Grill.internalDoors[index];
        if (input.placeholder === 'Length') {
          internalDoor.length = parseFloat(value) || 0;
        } else if (input.placeholder === 'Height') {
          internalDoor.height = parseFloat(value) || 0;
        } else if (input.placeholder === 'Number of Doors') {
          internalDoor.numberOfDoors = parseFloat(value) || 0;
        } else if (input.type === 'radio') {
          internalDoor.surface = value;
        }
        this.calculateInternalDoorPrice(index);
        break;
      case 'windowGrill':
        const windowGrill = this.currentDoor_Grill.windowGrills[index];
        if (input.classList.contains('window-length')) {
          windowGrill.length = parseFloat(value) || 0;
        } else if (input.classList.contains('window-height')) {
          windowGrill.height = parseFloat(value) || 0;
        }
        windowGrill.price = this.calculateGrillPrice(windowGrill);
        break;
  
      case 'balconyGrill':
        const balconyGrill = this.currentDoor_Grill.balconyGrills[index];
        if (input.classList.contains('balcony-length')) {
          balconyGrill.length = parseFloat(value) || 0;
        } else if (input.classList.contains('balcony-height')) {
          balconyGrill.height = parseFloat(value) || 0;
        }
        balconyGrill.price = this.calculateGrillPrice(balconyGrill);
        break;
    }
  
    this.calculateTotal();
  }
}