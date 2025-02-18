// view.component.ts
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { CommonHelper } from 'src/app/Shared/Provider/CommonHelper';
import { Customer } from 'src/app/Shared/models/customer';
import { CustomerProvider } from 'src/app/Shared/Provider/CustomerProvider';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  @ViewChild('searchInput') searchInput!: ElementRef;
  @ViewChild(GoogleMap) map!: GoogleMap;
  @ViewChild(MapMarker) marker!: MapMarker;
  @ViewChild('floorPlanInput') floorPlanInput!: ElementRef;
  @ViewChild('sitePlanInput') sitePlanInput!: ElementRef;

  enquiryForm!: FormGroup;
  currentCustomer: Customer = new Customer();
  isLoading = false;
  
  // Form Options
  title: string[] = ['Mr', 'Ms', 'Ms & Mr', 'M/S'];
  projectTypes: string[] = ['Apartment', 'Villa', 'Independent House'];
  configurations: string[] = ['1BHK', '2BHK', '2.5BHK', '3BHK', '4BHK', '4BHK+'];
  
  // Map Properties
  selectedLocation: string = '';
  selectedFloorPlan: File | null = null;
  selectedSitePlan: File | null = null;
  isMapVisible: boolean = false;
  center: google.maps.LatLngLiteral = { lat: 12.9716, lng: 77.5946 };
  markerPosition: google.maps.LatLngLiteral = this.center;
  zoom = 13;
  mapOptions: google.maps.MapOptions = {
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: true,
    zoomControl: true
  };

  constructor(
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private location: Location,
    private commonHelper: CommonHelper,
    private customerProvider: CustomerProvider
  ) {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.enquiryForm = this.formBuilder.group({
      enquiryId: [{ value: '', disabled: true }],
      title: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(2)]],
      emailId: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      alternatePhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      projectType: ['', Validators.required],
      configuration: ['', Validators.required],
      projectLocation: ['', Validators.required],
      city: ['', Validators.required],
      projectName: ['', Validators.required],
      houseNo: ['', Validators.required],
      carpetArea: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      floorPlan: ['', Validators.required],
      sitePlan: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (!this.currentCustomer.id) {
      this.generateCustomerId();
    } else {
      this.populateFormWithCustomer();
    }
  }

  private generateCustomerId(): void {
    this.customerProvider.getNextCustomerId().subscribe({
      next: (nextId) => {
        this.enquiryForm.patchValue({ enquiryId: nextId });
      },
      error: (error) => {
        console.error('Error generating customer ID:', error);
        this.enquiryForm.patchValue({ enquiryId: 'ES6001' });
      }
    });
  }

  private populateFormWithCustomer(): void {
    this.enquiryForm.patchValue({
      enquiryId: this.currentCustomer.enquiryId,
      title: this.currentCustomer.title,
      name: this.currentCustomer.name,
      emailId: this.currentCustomer.emailId,
      phoneNumber: this.currentCustomer.phoneNumber,
      alternatePhoneNumber: this.currentCustomer.alternatePhoneNumber,
      projectName: this.currentCustomer.projectName,
      houseNo: this.currentCustomer.houseNo,
      projectType: this.currentCustomer.projectType,
      configuration: this.currentCustomer.configurtion,
      carpetArea: this.currentCustomer.carpetArea,
      projectLocation: this.currentCustomer.projectLocation,
      city: this.currentCustomer.city
    });
    this.selectedLocation = this.currentCustomer.projectLocation;
  }

  onMapClick(event: google.maps.MapMouseEvent) {
    const latLng = event.latLng;
    if (!latLng) {
      console.warn('No valid location selected');
      return;
    }

    this.ngZone.run(async () => {
      this.markerPosition = latLng.toJSON();
      const geocoder = new google.maps.Geocoder();
      try {
        const result = await geocoder.geocode({ location: latLng });
        if (result.results[0]) {
          this.updateLocationDetails(result.results[0]);
        }
      } catch (error) {
        console.error('Geocoding failed:', error);
      }
    });
  }

  onSearchPlaces(): void {
    const searchText = this.searchInput.nativeElement.value;
    const geocoder = new google.maps.Geocoder();
    
    geocoder.geocode({ address: searchText }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        const location = results[0].geometry.location;
        this.center = { lat: location.lat(), lng: location.lng() };
        this.markerPosition = this.center;
        this.selectedLocation = results[0].formatted_address;
        this.enquiryForm.patchValue({ projectLocation: this.selectedLocation });
      }
    });
  }

  private updateLocationDetails(place: google.maps.GeocoderResult): void {
    const address = place.formatted_address || '';
    let city = '';
    
    place.address_components?.forEach(component => {
      if (component.types.includes('locality')) {
        city = component.long_name;
      }
    });

    this.enquiryForm.patchValue({
      projectLocation: address,
      city: city
    });
    this.selectedLocation = address;
  }

  toggleMap(): void {
    this.isMapVisible = !this.isMapVisible;
  }

  onFloorPlanSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        this.floorPlanInput.nativeElement.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        this.enquiryForm.patchValue({ floorPlan: base64String });
      };
      reader.readAsDataURL(file);
      this.selectedFloorPlan = file;
    }
  }

  onSitePlanSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        this.sitePlanInput.nativeElement.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        this.enquiryForm.patchValue({ sitePlan: base64String });
      };
      reader.readAsDataURL(file);
      this.selectedSitePlan = file;
    }
  }

  goBack(): void {
    this.location.back();
  }

  async onAddCustomer(): Promise<void> {
    if (this.enquiryForm.invalid) {
      this.markFormGroupTouched(this.enquiryForm);
      return;
    }
  
    this.isLoading = true;
    try {
      const formValues = this.enquiryForm.getRawValue();
      const customerData = {
        ...this.currentCustomer,
        enquiryId: formValues.enquiryId,
        title: formValues.title,
        name: formValues.name,
        emailId: formValues.emailId,
        phoneNumber: formValues.phoneNumber,
        alternatePhoneNumber: formValues.alternatePhoneNumber,
        projectName: formValues.projectName,
        houseNo: formValues.houseNo,
        projectType: formValues.projectType,
        configurtion: formValues.configuration,
        carpetArea: formValues.carpetArea,
        projectLocation: formValues.projectLocation,
        city: formValues.city,
        floorPlan: formValues.floorPlan,
        sitePlan: formValues.sitePlan
      };
  
      console.log('Sending customer data:', customerData);
      const result = await firstValueFrom(this.customerProvider.addCustomer(customerData));
      console.log('Received result:', result);
  
      if (result.success && result.customerId) {
        localStorage.setItem('lastSavedCustomerId', result.customerId.toString());
        await Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Customer saved successfully',
          confirmButtonText: 'OK'
        });
        console.log('Navigating to:', `/quotation-builder/view/${result.customerId}`);
        this.router.navigate(['/quotation-builder/view', result.customerId]);
      } else {
        throw new Error('Failed to save customer');
      }
    } catch (error) {
      console.error('Error in onAddCustomer:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to save customer. Please try again.',
        confirmButtonText: 'OK'
      });
    } finally {
      this.isLoading = false;
    }
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}