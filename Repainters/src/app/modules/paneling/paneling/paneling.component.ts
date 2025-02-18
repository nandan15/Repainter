import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Paneling } from 'src/app/Shared/models/paneling';
import { WallPanelingProvider } from 'src/app/Shared/Provider/PanelingProvider';
interface PanelingType {
  name: string;
  price: number;
  description: string;
  showPaintType?: boolean;
  showTextureType?: boolean;
}
interface PanelingOption {
  name: string;
}
@Component({
  selector: 'app-paneling',
  templateUrl: './paneling.component.html',
  styleUrls: ['./paneling.component.css']
})
export class PanelingComponent implements OnInit {
  panelingForm!: FormGroup;
  customerId: number | null = null;
  existingPanelingIds: number[] = [];
  @Input() currentwallPaneling: Paneling = new Paneling();
  cappuccinoPanelingOptions: PanelingOption[] = [
    { name: 'HCP001' },
    { name: 'HCP002' },
    { name: 'HCP003' },
    { name: 'HCP004' },
    { name: 'HCP005' },
    { name: 'HCP006' },
    { name: 'HCP007' },
    { name: 'HCP008' },
    { name: 'HCP017' },
    { name: 'HCP018' },
    { name: 'HCP019' },
    { name: 'HCP020' }
  ];
  lattePanelingOptions: PanelingOption[] = [
    { name: 'HCP009' },
    { name: 'HCP010' },
    { name: 'HCP011' },
    { name: 'HCP012' },
    { name: 'HCP013' },
    { name: 'HCP014' },
    { name: 'HCP015' },
    { name: 'HCP016' },
    { name: 'HCP021' },
    { name: 'HCP022' },
    { name: 'HCP023' }
  ];
otherPanelingOptions:PanelingOption[]=[
  {name:'HCP024'},
  {name:'HCP025'},
  {name:'HCP026'},
  {name:'HCP027'},
  {name:'HCP028'},
  {name:'HCP029'},
  {name:'HCP030'},
  {name:'HCP031'},
  {name:'HCP032'},
  {name:'HCP033'},
  {name:'HCP034'},
  {name:'HCP035'}
]
paintTypes: PanelingOption[] =[
  { "name": "870" },
  { "name": "257" },
  { "name": "629" },
  { "name": "224" },
  { "name": "374" },
  { "name": "295" },
  { "name": "371" },
  { "name": "561" },
  { "name": "112" },
  { "name": "584" },
  { "name": "471" },
  { "name": "440" },
  { "name": "523" },
  { "name": "494" },
  { "name": "888" },
  { "name": "464" },
  { "name": "342" },
  { "name": "304" },
  { "name": "222" },
  { "name": "748" },
  { "name": "292" },
  { "name": "534" },
  { "name": "397" },
  { "name": "499" },
  { "name": "977" },
  { "name": "804" },
  { "name": "195" },
  { "name": "701" },
  { "name": "338" },
  { "name": "132" },
  { "name": "308" },
  { "name": "507" },
  { "name": "400" },
  { "name": "201" },
  { "name": "300" },
  { "name": "908" },
  { "name": "971" },
  { "name": "546" },
  { "name": "450" },
  { "name": "276" },
  { "name": "786" },
  { "name": "446" },
  { "name": "568" },
  { "name": "549" },
  { "name": "825" },
  { "name": "454" },
  { "name": "608" },
  { "name": "415" },
  { "name": "352" },
  { "name": "671" },
  { "name": "581" },
  { "name": "176" },
  { "name": "187" },
  { "name": "621" },
  { "name": "768" },
  { "name": "396" },
  { "name": "459" },
  { "name": "178" },
  { "name": "311" },
  { "name": "289" },
  { "name": "358" },
  { "name": "181" },
  { "name": "286" },
  { "name": "899" },
  { "name": "551" },
  { "name": "151" },
  { "name": "703" },
  { "name": "324" },
  { "name": "838" },
  { "name": "199" },
  { "name": "979" },
  { "name": "305" },
  { "name": "384" },
  { "name": "405" },
  { "name": "483" },
  { "name": "605" },
  { "name": "368" },
  { "name": "649" },
  { "name": "122" },
  { "name": "593" },
  { "name": "756" },
  { "name": "953" },
  { "name": "791" },
  { "name": "245" },
  { "name": "480" },
  { "name": "622" },
  { "name": "669" },
  { "name": "991" },
  { "name": "489" },
  { "name": "592" },
  { "name": "395" },
  { "name": "653" },
  { "name": "451" },
  { "name": "674" },
  { "name": "277" },
  { "name": "M001" },
  { "name": "M002" },
  { "name": "M003" },
  { "name": "M004" },
  { "name": "M005" },
  { "name": "M006" }
];
textureTypes: PanelingOption[] = [
  {name:'TX001'},
  {name:'TX002'},
  {name:'TX003'},
  {name:'TX004'},
  {name:'TX005'},
  {name:'TX006'},
  {name:'TX007'},
  {name:'TX008'},
  {name:'TX009'},
  {name:'TX010'},
  {name:'TX011'},
  {name:'TX012'},
  {name:'TX013'},
  {name:'TX014'},
  {name:'TX015'},
  {name:'TX016'},
  {name:'TX017'},
  {name:'TX018'},
  {name:'TX019'},
  {name:'TX020'},
  {name:'TX021'},
  {name:'TX022'},
  {name:'TX023'},
  {name:'TX024'},
  {name:'TX025'},
  {name:'TX026'},
  {name:'TX027'},
  {name:'TX028'},
  {name:'TX029'},
  {name:'TX030'},
  {name:'TX031'},
  {name:'TX032'},
  {name:'TX033'},
  {name:'TX034'},
  {name:'TX035'},
  {name:'TX036'},
  {name:'TX037'},
  {name:'TX038'},
  {name:'TX039'},
  {name:'TX040'},
  {name:'TX041'},
  {name:'TX042'},
  {name:'TX043'},
  {name:'TX044'},
];

Types: PanelingType[] = [
  { 
    name: 'Cappuccino', 
    price: 141900,
    description: 'Supply and Installation of designer panels as per selection on 1 entire wall up to area of 100 sqft'
  },
  { 
    name: 'Cubano', 
    price: 68000,
    description: 'Supply and Installation of 2 designer panels as per selection on 1 Wall + permium emulsion paint for the rest of the area on same wall - up to area of 100 sqft\n*Include plywood backing',
    showPaintType: true
  },
  { 
    name: 'Latte', 
    price: 86000,
    description: 'Supply and Installation of 2 designer panels as per selection on 1 wall + texture paint OR wallpaper for the rest of the area on same wall - up to area of 100 sqft\n*Include plywood backing',
    showTextureType: true
  },
  { 
    name: 'Mocha-Ladder(Non-Texture)', 
    price: 48100,
    description: 'Supply and Installation of teakwood beading as per catalogue design on 1 wall + premium emulsion paint for the rest of the area on same wall - up to area of 100 sqft\n*If the undulations in the wall is high, there might be visible gaps',
    showPaintType: true
  },
  { 
    name: 'Mocha-checked(Non-texture)', 
    price: 59100,
    description: 'Supply and Installation of teakwood beading as per catalogue design on 1 wall + premium emulsion paint for the rest of the area on same wall - up to area of 100 sqft\n*If the undulations in the wall is high, there might be visible gaps',
    showPaintType: true
  },
  { 
    name: 'Mocha-WainScoting(Non-texture)', 
    price: 50800,
    description: 'Supply and Installation of teakwood beading as per catalogue design on 1 wall + premium emulsion paint for the rest of the area on same wall - up to area of 100 sqft\n*If the undulations in the wall is high, there might be visible gaps',
    showPaintType: true
  },
  { 
    name: 'Mocha-Ladder(With Texture)', 
    price: 71300,
    description: 'Supply and Installation of teakwood beading as per catalogue design on 1 wall + classic range texture paint for the rest of the area on same wall - up to area of 100 sqft\n*If the undulations in the wall is high, there might be visible gaps',
    showTextureType: true
  },
  { 
    name: 'Mocha-Checked(With Texture)', 
    price: 82300,
    description: 'Supply and Installation of teakwood beading as per catalogue design on 1 wall + classic range texture paint for the rest of the area on same wall - up to area of 100 sqft\n*If the undulations in the wall is high, there might be visible gaps',
    showTextureType: true
  },
  { 
    name: 'Mocha WainScoting(With Texture)', 
    price: 74000,
    description: 'Supply and Installation of teakwood beading as per catalogue design on 1 wall + classic range texture paint for the rest of the area on same wall - up to area of 100 sqft\n*If the undulations in the wall is high, there might be visible gaps',
    showTextureType: true
  },
  { 
    name: 'Americano WainScoting(Non-texture)', 
    price: 54800,
    description: 'Supply and Installation of paintable PVC beading as per catalogue design on 1 wall + premium emulsion paint for the rest of the area on same wall - up to area of 100 sqft\n*If the indulations in the wall is high, there might be visible gaps',
    showPaintType: true
  },
  { 
    name: 'Americano WainScoting(With texture)', 
    price: 78000,
    description: 'Supply and Installation of paintable PVC beading as per catalogue design on 1 wall + classic range texture paint for the rest of the area on same wall - up to area of 100 sqft\n*If the indulations in the wall is high, there might be visible gaps',
    showTextureType: true
  }
];
shouldShowPaintType(wall: AbstractControl): boolean {
  const wallGroup = this.getWallFormGroup(wall);
  const selectedType = this.Types.find(type => type.name === wallGroup.get('type')?.value);
  return selectedType?.showPaintType || false;
}

shouldShowTextureType(wall: AbstractControl): boolean {
  const wallGroup = this.getWallFormGroup(wall);
  const selectedType = this.Types.find(type => type.name === wallGroup.get('type')?.value);
  return selectedType?.showTextureType || false;
}
  constructor(
    private fb: FormBuilder,
    private panelingProvider: WallPanelingProvider,
    private route: ActivatedRoute,
    private toaster: ToastrService
  ) {}
  getPanelingOptions(wall: AbstractControl): PanelingOption[] {
    if (!wall || !(wall instanceof FormGroup)) {
      return [];
    }
  
    const wallGroup = wall as FormGroup;
    const selectedType = wallGroup.get('type')?.value;
  
    switch (selectedType) {
      case 'Cappuccino':
        return this.cappuccinoPanelingOptions;
      case 'Latte':
        return this.lattePanelingOptions;
      default:
        return this.otherPanelingOptions;
    }
  }
  ngOnInit() {
    this.initializeForm();
    this.extractCustomerId();
    
    // First check if we have a customerId
    if (this.customerId) {
      // Load existing data if we have a customerId
      this.panelingProvider.getWallPanelingByCustomerId(this.customerId, { delete: 0 })
        .subscribe({
          next: (panelings: Paneling[]) => {
            if (panelings && panelings.length > 0) {
              // If we have existing data, load it
              this.loadExistingPanelingData();
            } else {
              // If no existing data found, initialize with default walls
              this.initializeDefaultWalls();
            }
          },
          error: (error) => {
            console.error('Error loading paneling data:', error);
            // If there's an error, still initialize default walls
            this.initializeDefaultWalls();
          }
        });
    } else {
      // If no customerId, initialize with default walls
      this.initializeDefaultWalls();
    }
  }

  initializeForm() {
    this.panelingForm = this.fb.group({
      walls: this.fb.array([]),
      sectionTotal: [0]
    });
  }

  private extractCustomerId() {
    this.route.parent?.paramMap.subscribe(params => {
      const customerIdParam = params.get('customerId');
      this.customerId = customerIdParam ? parseInt(customerIdParam, 10) : null;
    });
    
    this.route.paramMap.subscribe(params => {
      const customerIdParam = params.get('customerId');
      if (customerIdParam) {
        this.customerId = parseInt(customerIdParam, 10);
      }
    });
    
    if (this.currentwallPaneling && this.currentwallPaneling.customerId) {
      this.customerId = this.currentwallPaneling.customerId;
    }
  }

  get wallsArray(): FormArray {
    return this.panelingForm.get('walls') as FormArray;
  }
  getWallFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }
  createWallFormGroup(): FormGroup {
    return this.fb.group({
      panelingId: [0],
      type: [''],
      panelingType: [''],  
      paintingType: [''], 
      textureType: [''],
      wallpaperType: [''],
      price: [0],
      description: [''],
      remarks: [''],
      lighting: [''],
      lightingPrice: [0]
    });
  }

  addWall() {
    const walls = this.panelingForm.get('walls') as FormArray;
    walls.push(this.createWallFormGroup());
  }

  removeWall(index: number) {
    const walls = this.panelingForm.get('walls') as FormArray;
    const wallToRemove = walls.at(index);
    const panelingId = wallToRemove.get('panelingId')?.value;
    if (panelingId && panelingId !== 0) {
      this.existingPanelingIds = this.existingPanelingIds.filter(id => id !== panelingId);
    }
    
    walls.removeAt(index);
    this.calculateSectionTotal();
  }

  onTypeChange(index: number, event: any) {
    const selectedValue = event.target.value;
    const selectedType = this.Types.find(type => type.name === selectedValue);
    if (selectedType) {
      const wallControl = this.wallsArray.at(index);
      wallControl.patchValue({
        price: selectedType.price,
        description: selectedType.description,
        productCode: '',
        paintType: '',
        textureType: '',
        wallpaperType: ''
      });
      wallControl.patchValue({
        lighting: '',
        lightingPrice: 0
      });
      this.calculateSectionTotal();
    }
  }
  isTypeSelected(wall: AbstractControl, type: string): boolean {
    const wallGroup = this.getWallFormGroup(wall);
    return wallGroup.get('type')?.value === type;
  }
  updateLightingPrice(index: number) {
    const wallControl = this.wallsArray.at(index);
    const lightingType = wallControl.get('lighting')?.value;

    let newLightingPrice = 0;
    if (lightingType === '2Side') {
      newLightingPrice = 4500;
    } else if (lightingType === '1Side') {
      newLightingPrice = 3500;
    }

    wallControl.patchValue({
      lightingPrice: newLightingPrice
    });

    this.calculateSectionTotal();
  }

  calculateSectionTotal() {
    const walls = this.wallsArray.controls;
    const total = walls.reduce((sum, wall) => {
      const price = wall.get('price')?.value || 0;
      const lightingPrice = wall.get('lightingPrice')?.value || 0;
      return sum + price + lightingPrice;
    }, 0);

    this.panelingForm.patchValue({
      sectionTotal: total
    }, { emitEvent: false });
  }
  private initializeDefaultWalls() {
    // Clear existing walls first
    while (this.wallsArray.length) {
      this.wallsArray.removeAt(0);
    }
    
    // Add 4 default walls
    for (let i = 0; i < 1; i++) {
      this.addWall();
    }
  }
  private loadExistingPanelingData() {
    if (!this.customerId) return;

    this.panelingProvider.getWallPanelingByCustomerId(this.customerId, { delete: 0 })
      .subscribe({
        next: (panelings: Paneling[]) => {
          // Clear existing walls first
          while (this.wallsArray.length) {
            this.wallsArray.removeAt(0);
          }

          if (panelings && panelings.length > 0) {
            panelings.forEach(paneling => {
              const wallGroup = this.createWallFormGroup();
              wallGroup.patchValue({
                panelingId: paneling.panelingId,
                type: paneling.type,
                paintingType: paneling.paintingType,
                panelingType: paneling.panelingType,
                textureType: paneling.textureType,
                wallpaperType: paneling.wallpaperType,
                price: paneling.price,
                lighting: paneling.lighting,
                lightingPrice: paneling.lightingPrice,
                description: paneling.description,
                remarks: paneling.remarks
              });
              this.wallsArray.push(wallGroup);
              this.existingPanelingIds.push(paneling.panelingId);
            });
          } else {
            // If no existing panelings, initialize with default walls
            this.initializeDefaultWalls();
          }

          this.calculateSectionTotal();
        },
        error: (error) => {
          console.error('Error loading paneling data:', error);
          // If there's an error, initialize with default walls
          this.initializeDefaultWalls();
          this.toaster.error('Error loading existing paneling data');
        }
      });
  }

  OnConfirmPaneling() {
    if (!this.customerId) {
      this.toaster.error('Customer Id is required');
      return;
    }

    const userId = localStorage.getItem('UserId');
    if (!userId) {
      this.toaster.error('User ID not found. Please try logging in again.');
      return;
    }

    const newWallPanelings = this.wallsArray.controls
      .filter(control => control.get('panelingId')?.value === 0)
      .map(group => ({
        panelingId: 0,
        generatedId: Math.floor(Math.random() * 10000),
        panelingTabId: 1,
        deleted: false,
        customerId: this.customerId,
        type: group.get('type')?.value.toString(),
        paintingType:group.get('paintingType')?.value.toString(),
        panelingType:group.get('panelingType')?.value.toString(),
        textureType:group.get('textureType')?.value.toString(),
        wallpaperType:group.get('wallpaperType')?.value.toString(),
        price: group.get('price')?.value,
        lighting: group.get('lighting')?.value,
        description: group.get('description')?.value,
        remarks: group.get('remarks')?.value,
        lightingPrice: group.get('lightingPrice')?.value,
        sectionTotal: this.panelingForm.get('sectionTotal')?.value,
        createdBy: parseInt(userId),
        lastModifiedBy: parseInt(userId),
        createdOn: new Date(),
        lastModifiedDate: new Date()
      } as Paneling));

    if (newWallPanelings.length === 0) {
      this.toaster.info('No new wall paneling entries to save.');
      return;
    }

    this.panelingProvider.addWallPaneling(newWallPanelings).subscribe(
      () => {
        this.toaster.success('Wall paneling added successfully!');
        this.loadExistingPanelingData();
      },
      error => {
        this.toaster.error('Error saving wall paneling. Please try again.');
        console.error('Error saving wall paneling:', error);
      }
    );
  }
}