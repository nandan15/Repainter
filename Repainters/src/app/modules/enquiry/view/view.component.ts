import { Component, OnInit, ViewChild, ElementRef, NgZone, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { CommonHelper } from 'src/app/Shared/Provider/CommonHelper';
import { Customer } from 'src/app/Shared/models/customer';
import { CustomerProvider } from 'src/app/Shared/Provider/CustomerProvider';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  @ViewChild('searchInput') searchInput!: ElementRef;
  @ViewChild(GoogleMap) map!: GoogleMap;
  @ViewChild(MapMarker) marker!: MapMarker;
  @Input()currentCustomer:Customer=new Customer;
  enquiryForm: FormGroup;
  title:string[]=['Mr','Ms','Ms & Mr','M/S'];
  projectTypes: string[] = ['Apartment', 'Villa', 'Independent House'];
  configurations: string[] = ['1BHK', '2BHK', '2.5BHK', '3BHK', '4BHK','4BHK +'];
  selectedLocation: string = '';
  selectedFloorPlan: File | null = null;
  selectedSitePlan: File | null = null;
  isMapVisible: boolean = false;
  center: google.maps.LatLngLiteral = { lat: 12.9716, lng: 77.5946 };
  markerPosition: google.maps.LatLngLiteral = this.center;
  zoom = 13;
  mapOptions: google.maps.MapOptions = {
    mapTypeControl: false,
    streetViewControl: false
  };
  constructor(
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private commonHelper:CommonHelper,
    private customerProvider:CustomerProvider
  ) {
    this.enquiryForm = this.formBuilder.group({
      enquiryId:['',Validators.required],
      title:['',Validators.required],
      name: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      alternatePhoneNumber: ['',Validators.required],
      projectType: ['', Validators.required],
      configuration: ['', Validators.required],
      projectLocation: ['', Validators.required],
      city: ['', Validators.required],
      projectName: ['', Validators.required],
      houseNo: ['', Validators.required],
      carpetArea: ['sqft',Validators.required],
      floorPlan: ['',Validators.required],
      sitePlan:['',Validators.required]
    });
  }
onAddCustomer(){
    this.currentCustomer.enquiryId=this.enquiryForm.controls["enquiryId"].value;
    this.currentCustomer.title=this.enquiryForm.controls["title"].value;
    this.currentCustomer.name=this.enquiryForm.controls["name"].value;
    this.currentCustomer.emailId=this.enquiryForm.controls["emailId"].value;
    this.currentCustomer.phoneNumber=this.enquiryForm.controls["phoneNumber"].value;
    this.currentCustomer.alternatePhoneNumber=this.enquiryForm.controls["alternatePhoneNumber"].value;
    this.currentCustomer.projectName=this.enquiryForm.controls["projectName"].value;
    this.currentCustomer.houseNo=this.enquiryForm.controls["houseNo"].value;
    this.currentCustomer.projectType=this.enquiryForm.controls["projectType"].value;
    this.currentCustomer.configurtion=this.enquiryForm.controls["configuration"].value;
    this.currentCustomer.carpetArea=this.enquiryForm.controls["carpetArea"].value;
    this.currentCustomer.projectLocation=this.enquiryForm.controls["projectLocation"].value;
    this.currentCustomer.city=this.enquiryForm.controls["city"].value;
    this.currentCustomer.floorPlan=this.enquiryForm.controls["floorPlan"].value;
    this.currentCustomer.sitePlan=this.enquiryForm.controls["sitePlan"].value;
    if(this.currentCustomer.id)
    {
      this.customerProvider.updateCustomer(this.currentCustomer);
    }
    else{
      this.customerProvider.addCustomer(this.currentCustomer);  
    }
}
  ngOnInit(): void {

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
        this.enquiryForm.patchValue({ location: this.selectedLocation });
      }
    });
  }

  private updateLocationDetails(place: google.maps.GeocoderResult): void {
    let address = place.formatted_address || '';
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
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        this.enquiryForm.patchValue({ sitePlan: base64String });
      };
      reader.readAsDataURL(file);
      this.selectedSitePlan = file;
    }
  }
}