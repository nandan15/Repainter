import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { Package } from 'src/app/Shared/models/package';
import { PackageProvider } from 'src/app/Shared/Provider/PackageProvider';
interface PackageData {
  price: string;
  content: string;
  description: string;
  formattedDescription?: string;
}
type CodeRangePrefix = 'DUA' | 'DUC' | 'DUP' | 'TRA' | 'TRC' | 'TRP' | 'QAA' | 'QAC' | 'QAP';
@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css'],
})
export class PackageComponent implements OnInit {
  @Output() formModified = new EventEmitter<void>();
  private destroy$ = new Subject<void>();
  @Input() currentPackage: Package = new Package();
  PackageForm!: FormGroup;
  customerId: number = 0;
  @Input() currentpackage: Package = new Package();
  packageTypes = ['Classic', 'Prime', 'Azzure'];
  furnitureTypes = ['Duo', 'Trio', 'Quad'];
  private readonly packageData: { [key: string]: PackageData } = {
    'DUA2005': {
    price: '80000',
    content: '(I). CEILING: 2 COATS OF BUDGET EMULSION\nWALLS: PRIMER + 2 COATS PREMIUM EMULSION\n(II).WALL PANELING- CUBANO',
    description: '<strong><u>CEILING</u></strong>:\nTouch up Putty +  Two Coats  Budget Emulsion\nBrands :   JSW - Elegant /  Birla Opus - I30 / Asian - Tractor\n<strong><u>WALLS</u></strong>:\nTouch up Putty + One Coat  Primer + Two Coats Premium Emulsion\nBrands :  JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\n<strong><u>WALL PANELING - CUBANO</u></strong>:\nSSupply and Installation of 2 designer panels as per selection on 1 wall + premium emulsion paint for the rest of the area on same wall - up to size 10x10\n*Including plywood backing'
  },
   'DUC4001': {
  price: '76400',
  content: '(I). CEILING : TWO COATS OF BUDGET EMULSIONS\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\n(II). RE-POLISHING : 1 MAIN DOOR AND RE-PAINTING OF 1 BALCONY GRILL',
  description: '<strong><u>CEILING</u></strong>:\nTouch up Putty + Two Coats Budget Emulsion\nBrands: JSW - Elegant / Birla Opus - I30 / Asian - Tractor\n<strong><u>WALLS</u></strong>:\nTouch up Putty + One Coat Primer + Two Coats Premium Emulsion\nBrands: JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\n<strong><u>RE-POLISHING OF DOOR</u></strong>:\nStaining, color matching, and finishing with melamine internal grade top coat (Semi-gloss)\n<strong><u>RE-PAINTING OF GRILL</u></strong>:\nPrimer + Two Coats of Enamel Satin Finish Paint'
},
'DUC4002': {
  price: '84100',
  content: '(I). CEILING: TWO COATS OF BUDGET EMULSIONS\nWALLS: PRIMER + 2 COATS PREMIUM EMULSION\n(II). 1 WALL TEXTURE - CLASSIC RANGE',
  description: '<strong><u>CEILING</u></strong>:\nTouch up Putty + Two Coats Budget Emulsion\nBrands: JSW - Elegant / Birla Opus - I30 / Asian - Tractor\n<strong><u>WALLS</u></strong>:\nTouch up Putty + One Coat Primer + Two Coats Premium Emulsion\nBrands: JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\n<strong><u>TEXTURE PAINT</u></strong>:\nApplication Classic Range Textures Make: Asian Paints\nSeries: Archi Concrete Series, Opaco Matt, Stucco, Dune, Drizzle, Lithos Series'
},
    'DUC4003': {
  price: '76100',
  content: '(I). CEILING: TWO COATS OF BUDGET EMULSIONS\nWALLS: PRIMER + 2 COATS PREMIUM EMULSION\n(II). 1 WALL WALLPAPER - CLASSIC RANGE',
  description: '<strong><u>CEILING</u></strong>:\nTouch up Putty + Two Coats Budget Emulsion\nBrands: JSW - Regal / Birla Opus - I30 / Asian - Tractor\n<strong><u>WALLS</u></strong>:\nTouch up Putty + One Coat Primer + Two Coats Premium Emulsion\nBrands: JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\n<strong><u>WALLPAPER</u></strong>:\nSupply and Installation of Wallpaper for 1 Wall\nSeries: Classic Range'
},

'DUP2004': {
  price: '70700',
  content: '(I). CEILING: 2 COATS OF BUDGET EMULSION\nWALLS: PRIMER + 2 COATS PREMIUM EMULSION\n(II). 1 WALL PANELING - MOCHA LADDER',
  description: '<strong><u>CEILING</u></strong>:\nTouch up Putty + Two Coats Budget Emulsion\nBrands: JSW - Elegant / Birla Opus - I30 / Asian - Tractor\n<strong><u>WALLS</u></strong>:\nTouch up Putty + One Coat Primer + Two Coats Premium Emulsion\nBrands: JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\n<strong><u>WALL PANELING - MOCHA LADDER</u></strong>:\nSupply and Installation of Teakwood Beading as per Catalogue Design on 1 Wall + Premium Emulsion Paint for the Rest of the Area on the Same Wall - Up to Size 10\'x10\'\n*If the undulations in the wall are high, there might be visible gaps'
},
   'DUP3004': {
  price: '84900',
  content: '(I). CEILING: 2 COATS OF BUDGET EMULSION\nWALLS: PRIMER + 2 COATS PREMIUM EMULSION\n(II). 1 WALL PANELING - MOCHA LADDER',
  description: '<strong><u>CEILING</u></strong>:\nTouch up Putty + Two Coats Budget Emulsion\nBrands: JSW - Elegant / Birla Opus - I30 / Asian - Tractor\n<strong><u>WALLS</u></strong>:\nTouch up Putty + One Coat Primer + Two Coats Premium Emulsion\nBrands: JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\n<strong><u>WALL PANELING - MOCHA LADDER</u></strong>:\nSupply and Installation of teakwood beading as per catalogue design on one wall + premium emulsion paint for the rest of the area on the same wall (up to size 10\'x10\')\n*If the undulations in the wall are high, there might be visible gaps.'
},

'DUP4004': {
  price: '95600',
  content: '(I). CEILING: 2 COATS OF BUDGET EMULSION\nWALLS: PRIMER + 2 COATS PREMIUM EMULSION\n(II). 1 WALL PANELING - MOCHA LADDER',
  description: '<strong><u>CEILING</u></strong>:\nTouch up Putty + Two Coats Budget Emulsion\nBrands: JSW - Elegant / Birla Opus - I30 / Asian - Tractor\n<strong><u>WALLS</u></strong>:\nTouch up Putty + One Coat Primer + Two Coats Premium Emulsion\nBrands: JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\n<strong><u>WALL PANELING - MOCHA LADDER</u></strong>:\nSupply and Installation of teakwood beading as per catalogue design on one wall + premium emulsion paint for the rest of the area on the same wall (up to size 10\'x10\')\n*If the undulations in the wall are high, there might be visible gaps.'
},

'TRA2005': {
  price: '92000',
  content: '(I). CEILING: 2 COATS OF BUDGET EMULSION\nWALLS: PRIMER + 2 COATS PREMIUM EMULSION\n(II). 1 WALL WALLPAPER - CLASSIC RANGE\n(III). 1 WALL PANELING - CUBANO',
  description: '<strong><u>CEILING</u></strong>:\nTouch up Putty + Two Coats Budget Emulsion\nBrands: JSW - Elegant / Birla Opus - I30 / Asian - Tractor\n<strong><u>WALLS</u></strong>:\nTouch up Putty + One Coat Primer + Two Coats Premium Emulsion\nBrands: JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\n<strong><u>WALLPAPER</u></strong>:\nSupply and Installation of wallpaper for 1 wall\nSeries:Classic Range\n<strong><u>WALL PANELING - CUBANO</u></strong>:\nSupply and Installation of 2 designer panels as per selection on one wall + premium emulsion paint for the rest of the area on the same wall (up to size 10\'x10\')\n*Including plywood backing.'
},
   'TRC2001': {
  price: '71500',
  content: '(I). CEILING: 2 COATS OF BUDGET EMULSION\nWALLS: PRIMER + 2 COATS PREMIUM EMULSION\n(II). RE-POLISHING: 1 MAIN DOOR AND RE-PAINTING OF 1 BALCONY GRILL\n(III). 1 WALL TEXTURE - CLASSIC RANGE',
  description: '<strong><u>CEILING</u></strong>:\nTouch up Putty + Two Coats Budget Emulsion\nBrands: JSW - Elegant / Birla Opus - I30 / Asian - Tractor\n<strong><u>WALLS</u></strong>:\nTouch up Putty + One Coat Primer + Two Coats Premium Emulsion\nBrands: JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\n<strong><u>RE-POLISHING OF DOOR</u></strong>:\nStaining, color matching, and finishing with melamine internal grade top coat (Semi-gloss)\n<strong><u>RE-PAINTING OF GRILL</u></strong>:\nPrimer + Two Coats of Enamel Satin Finish Paint\n<strong><u>TEXTURE PAINT</u></strong>:\nApplication of Classic Range of Texture, Make: Asian Paints\nSeries: Archi Concrete Series, Opaco Matt, Stucco, Dune Drizzle, Lithos Series'
},

'TRC2002': {
  price: '63500',
  content: '(I). CEILING: 2 COATS OF BUDGET EMULSION\nWALLS: PRIMER + 2 COATS PREMIUM EMULSION\n(II). RE-POLISHING: 1 MAIN DOOR AND RE-PAINTING OF 1 BALCONY GRILL\n(III). 1 WALL WALLPAPER - CLASSIC RANGE',
  description: '<strong><u>CEILING</u></strong>:\nTouch up Putty + Two Coats Budget Emulsion\nBrands: JSW - Elegant / Birla Opus - I30 / Asian - Tractor\n<strong><u>WALLS</u></strong>:\nTouch up Putty + One Coat Primer + Two Coats Premium Emulsion\nBrands: JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\n<strong><u>RE-POLISHING OF DOOR</u></strong>:\nStaining, color matching, and finishing with melamine internal grade top coat (Semi-gloss)\n<strong><u>RE-PAINTING OF GRILL</u></strong>:\nPrimer + Two Coats of Enamel Satin Finish Paint\n<strong><u>WALLPAPER</u></strong>:\nSupply and Installation of Wallpaper for One Wall\nSeries: Classic Range'
},

'TRC2003': {
  price: '71200',
  content: '(I). CEILING: 2 COATS OF BUDGET EMULSION\nWALLS: PRIMER + 2 COATS PREMIUM EMULSION\n(II). 1 WALL WALLPAPER - CLASSIC RANGE\n(III). 1 WALL TEXTURE - CLASSIC RANGE',
  description: '<strong><u>CEILING</u></strong>:\nTouch up Putty + Two Coats Budget Emulsion\nBrands: JSW - Elegant / Birla Opus - I30 / Asian - Tractor\n<strong><u>WALLS</u></strong>:\nTouch up Putty + One Coat Primer + Two Coats Premium Emulsion\nBrands: JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\n<strong><u>TEXTURE PAINT</u></strong>:\nApplication of Classic Range of Texture, Make: Asian Paints\nSeries: Archi Concrete Series, Opaco Matt, Stucco, Dune Drizzle, Lithos Series\n<strong><u>WALLPAPER</u></strong>:\nSupply and Installation of Wallpaper for One Wall\nSeries: Classic Range'
},

'TRC2004': {
  price: '82700',
  content: '(I). CEILING: 2 COATS OF BUDGET EMULSION\nWALLS: PRIMER + 2 COATS PREMIUM EMULSION\n(II). 1 WALL TEXTURE - CLASSIC RANGE\n(III). 1 WALL PANELING - MOCHA LADDER',
  description: '<strong><u>CEILING</u></strong>:\nTouch up Putty + Two Coats Budget Emulsion\nBrands: JSW - Elegant / Birla Opus - I30 / Asian - Tractor\n<strong><u>WALLS</u></strong>:\nTouch up Putty + One Coat Primer + Two Coats Premium Emulsion\nBrands: JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\n<strong><u>TEXTURE PAINT</u></strong>:\nApplication of Classic Range of Texture, Make: Asian Paints\nSeries: Archi Concrete Series, Opaco Matt, Stucco, Dune Drizzle, Lithos Series\n<strong><u>WALL PANELING - MOCHA LADDER</u></strong>:\nSupply and Installation of Teakwood Beading as per Catalogue Design on One Wall + Premium Emulsion Paint for the Rest of the Area on the Same Wall (Up to Size 10\'x10\')\n*If the Undulations in the Wall are High, There Might Be Visible Gaps'
},
'TRC2005': {
  price: '92000',
  content: '(I). CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\n(II). 1 WALL TEXTURE - CLASSIC RANGE\n(III). 1 WALL PANELING - CUBANO',
  description: 'CEILING :\nTouch up Putty +  Two Coats  Budget Emulsion\nBrands :   JSW - Elegant /  Birla Opus - I30 / Asian - Tractor"\nWALLS:\nTouch up Putty + One Coat  Primer + Two Coats Premium Emulsion\nBrands :  JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\nWALLPAPER:\nSupply and Installation of Wallpaper for 1 wall\nSeries : Classic Range\nWALL PANELING - CUBANO\nSupply and Installation of 2 designer panels as per selection on 1 wall + premium emulsion paint for the rest of the area on same wall - up to size 10x10\n*Including plywood backing'
},
'TRC3001': {
  price: '85800',
  content: '(I). CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\n(II). RE-POLISHING : 1 MAIND DOOR AND RE-PAINTING OF 1 BALCONY GRILL\n(III). 1 WALL TEXTURE - CLASSIC RANGE',
  'description': '<strong><u>CEILING</u></strong>:\nTouch up Putty + Two Coats Budget EmulsionBrands: JSW - Elegant / Birla Opus - I30 / Asian - Tractor\n<strong><u>WALLS</u></strong>:\nTouch up Putty + One Coat Primer + Two Coats Premium EmulsionBrands: JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\n<strong><u>RE-POLISHING OF DOOR</u></strong>:\nStaining, Colour Matching and Finishing with Melamine Internal Grade Top Coat (Semi-gloss)\n<strong><u>RE-PAINTING OF GRILL</u></strong>:\nPrimer + Two Coats of Enamel Satin Finish Paint\n<strong><u>TEXTURE PAINTING</u></strong>:\nApplication of classic range of texture, make Asian Paints\nSeries : Archi Concrete series, Opaco matt, Stucco, Dune Drizzle, Lithos Series\nSeries: Classic Range'
},
'TRC3002': {
  price: '77800',
  content: '(I). CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\n(II). RE-POLISHING : 1 MAIND DOOR AND RE-PAINTING OF 1 BALCONY GRILL\n(III). 1 WALL TEXTURE - CLASSIC RANGE',
  description: '<strong><u>CEILING</u></strong>:\nTouch up Putty + Two Coats Budget EmulsionBrands: JSW - Elegant / Birla Opus - I30 / Asian - Tractor\n<strong><u>WALLS</u></strong>:\nTouch up Putty + One Coat Primer + Two Coats Premium EmulsionBrands: JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\n<strong><u>RE-POLISHING OF DOOR</u></strong>:\nStaining, Colour Matching and Finishing with Melamine Internal Grade Top Coat (Semi-gloss)\n<strong><u>RE-PAINTING OF GRILL</u></strong>:\nPrimer + Two Coats of Enamel Satin Finish Paint\n<strong><u>WALLPAPER</u></strong>:\nSupply and Installation of Wallpaper for 1 wall\nSeries: Classic Range'
},
'TRC3003': {
  price: '85400',
  content: '(I).CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\n(II).1 WALL TEXTURE-CLASSIC RANGE\n(III). 1 WALL WALLPAPER - CLASSIC RANGE',
  description: '<strong><u>CEILING</u></strong>:\nTouch up Putty + Two Coats Budget \n: JSW - Elegant / Birla Opus - I30 / Asian - Tractor\n<strong><u>WALLS</u></strong>:\nTouch up Putty + One Coat Primer + Two Coats Premium Emulsion\nBrands: JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\n<strong><u>TEXTURE PAINTING</u></strong>:\nApplication of classic range of texture, make Asian PaintsSeries: Archi Concrete series, Opaco matt, Stucco, Dune Drizzle, Lithos Series\n<strong><u>WALLPAPER</u></strong>:\nSupply and Installation of Wallpaper for 1 wall\nSeries: Classic Range'
},
'TRP3004': {
  price: '96900',
  content: '(I). CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\n(II). 1 WALL WALLPAPER-CLASSIC RANGE\n(III). 1 WALL PANELING - MOCHA LADDER',
  description: '<strong><u>CEILING</u></strong>:\nTouch up Putty + Two Coats Budget EmulsionBrands: JSW - Elegant / Birla Opus - I30 / Asian - Tractor\n<strong><u>WALLS</u></strong>:\nTouch up Putty + One Coat Primer + Two Coats Premium Emulsion\nBrands: JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\n<strong><u>WALLPAPER</u></strong>:\nSupply and Installation of Wallpaper for 1 wallSeries: Classic Range\n<strong><u>WALL PANELING - MOCHA LADDER</u></strong>:\nSupply and Installation of teakwood beading as per catalogue design on 1 wall + premium emulsion paint for the rest of the area on same wall - up to size 10\'x10\'\n*If the undulations in the wall are high, there might be visible gaps'
},
'TRA3005': {
  price: '106200',
  content: '(I). CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\n(II).1 Wall WALLPAPER-CLASSIC RANGE\n(III).1 WALL PANELING - CUBAN',
  description: '<strong><u>CEILING</u></strong> : Touch up Putty + Two Coats Budget Emulsion\nBrands: JSW-Elegant/Birla Opus-I30/Asian-Tractor\n<strong><u>WALLS</u></strong>: Touch up Putty+One Coat Primer+Two Coats Premium Emulsion\nBrands: JSW-Regal/Birla Opus-I30/Asian-Premium Emulsion\n<strong><u>WALLPAPER</u></strong>:\nSupply and Installation of Wallpaper for 1 wall\nSeries : Classic Range\n<strong><u>WALL PANELING - CUBANO</u></strong>:\nSupply and installation of 2 designer panels as per selection on 1 wall + premium emulsion paint for the rest of the area on same wall - up to size 10x10\n*Including plywood backing'
},
'TRC4001': {
  price: '96400',
  content: '(I). CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\n(II). RE-POLISHING : 1 MAIND DOOR AND RE-PAINTING OF 1 BALCONY GRILL\n(III). 1 WALL TEXTURE - CLASSIC RANGE',
  description: '<strong><u>CEILING</u></strong>:\nTouch up Putty +  Two Coats  Budget Emulsion\nBrands :   JSW - Elegant /  Birla Opus - I30 / Asian - Tractor\n<strong><u>WALLS</u></strong>:\nTouch up Putty + One Coat  Primer + Two Coats Premium Emulsion\nBrands :  JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\n<strong><u>RE-POLISHING OF DOOR</u></strong>:\nStaining, colour matching and finishing with melamine internal grade top coat (Semi-gloss)\n<strong><u>RE-PAINTING OF GRILL</u></strong>:\nPrimer + 2 coats of enamel satin finish paint\n<strong><u>TEXTURE PAINT</u></strong>:\nApplication of classic range of texture, make Asian Paints\nSeries : Archi Concrete series, Opaco matt, Stucco, Dune Drizzle, Lithos Series'
},
'TRC4002': {
  price: '88400',
  content: '(I). CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\n(II). RE-POLISHING : 1 MAIND DOOR AND RE-PAINTING OF 1 BALCONY GRILL\n(III). 1 WALL TEXTURE - CLASSIC RANGE',
  description: '<strong><u>CEILING</u></strong>:\nTouch up Putty +  Two Coats  Budget Emulsion\nBrands :   JSW - Elegant /  Birla Opus - I30 / Asian - Tractor\n<strong><u>WALLS</u></strong>:\nTouch up Putty + One Coat  Primer + Two Coats Premium Emulsion\nBrands :  JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\n<strong><u>RE-POLISHING OF DOOR</u></strong>:\nStaining, colour matching and finishing with melamine internal grade top coat (Semi-gloss)\n<strong><u>RE-PAINTING OF GRILL</u></strong>:\nPrimer + 2 coats of enamel satin finish paint\n<strong><u>WALLPAPER</u></strong>:\nSupply and Installation of Wallpaper for 1 wall\nSeries : Classic Range'
},
'TRC4003': {
  price: '96100',
  content:'(I). CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\n(II). 1 WALL TEXTURE-CLASSIC RANGE \n(III). 1 WALL WALLPAPER - CLASSIC RANGE',
  description:'<strong><u>CEILING</u></strong>:\nTouch up Putty +  Two Coats  Budget Emulsion\nBrands :   JSW - Elegant /  Birla Opus - I30 / Asian - Tractor\n<strong><u>WALLS</u></strong>:\nTouch up Putty +  One Coat  Primer + Two Coat Premium Emulsion\nBrands :  JSW - Regal /  Birla Opus - I30 / Asian - Premium Emulsion\n<strong><u>TEXTURE PAINTING</u></strong>:\nApplication of classic range of texture, make Asian Paints\nSeries :  Archi Concrete series.Opaco matt, Stucco,Dune Drizzle,Lithos Series\n<strong><u>WALLPAPER</u></strong>:\nSupply and installation of Wallpaper for 1\nSeries:Classic Range'
},
'TRP4004': {
  price: '107600',
  content: '(I). CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\n(II). 1 WALL WALLPAPER-CLASSIC RANGE \n(III).1 WALL PANELING - MOCHA LADDER',
  description: '<strong><u>CEILING</u></strong>:\nTouch up Putty + Two Coats Budget Emulsion\nBrands: JSW-Elegant/Birla Opus-I30/Asian-Tractor\n<strong><u>WALLS</u></strong>:\nTouch up Putty+One Coat Primer+Two Coats Premium Emulsion\nBrands: JSW-Regal/Birla Opus-I30/Asian-Premium Emulsion\n<strong><u>WALLPAPER</u></strong>:\nSupply and Installation of Wallpaper for 1 wall\nSeries : Classic Range\n<strong><u>WALL PANELING-MOCHA LADDER</u></strong>\nSupply and Installation of teakwood beading as per catalogue design on 1 wall+premium emulsion paint for the rest of the area on same wall-up to size10\'x10\'\n*If the undulations in the wall is high, there might be visible gaps'
},
'TRA4005': {
  price: '116900',
  content: '(I). CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\n(II). 1 WALL TEXTURE-CLASSIC RANGE \n(III). 1 WALL PANELING - CUBANO',
  description: '<strong><u>CEILING</u></strong>:\nTouch up Putty + Two Coats Budget Emulsion\nBrands: JSW-Elegant/Birla Opus-I30/Asian-Tractor\n<strong><u>WALLS</u></strong>:\nTouch up Putty + One Coat Primer + Two Coats Premium Emulsion\nBrands: JSW-Regal/Birla Opus-I30/Asian-Premium Emulsion\n<strong><u>WALLPAPER</u></strong>:\nSupply and Installation of Wallpaper for 1 wall\nSeries : Classic Range\n<strong><u>WALL PANELING - CUBANO</strong></u>\nSupply and Installation of 2 designer panels as per selection on 1 wall + premium emulsion paint for the rest of the area on same wall - up size 10x10 \n*Including plywood backing '
},
'DUA3005': {
  price: '94200',
  content: '(I). CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\n(II). 1 WALL PANELING - CUBANO',
  description: '<strong><u>CEILING</u></strong>:\nTouch up Putty +  Two Coats  Budget EmulsionBrands :   JSW - Elegant /  Birla Opus - I30 / Asian - Tractor\n<strong><u>WALLS</u></strong>:\nTouch up Putty+One Coat Primer+Two Coats Premium Emulsion\nBrands:\nJSW-Regal/Birla Opus-I30/Asian-Premium Emulsion\n<strong><u>WALL PANELING-CUBANO</u></strong>\nSupply and Installation of 2 designer panels as per selection on 1 wall + premium emulsion paint for the rest of the area on same wall -up to size 10x10\n*including plywood backing'
},
'TRP2004': {
  price: '82700',
  content: '(I). CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\n(II). 1 WALL WALLPAPER - CLASSIC RANGE\n(III). 1 WALL PANELING - MOCHA LADDER',
  description: '<strong><u>CEILING</u></strong>:\nTouch up Putty + Two Coats Budget Emulsion Brands : JSW - Elegant / Birla Opus - I30 / Asian - Tractor\n<strong><u>WALLS</u></strong>:\nTouch up Putty + One Coat Primer + Two Coats Premium Emulsion Brands : JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\n<strong><u>WALLPAPER</u></strong>:\nSupply and Installation of Wallpaper for 1 wall Series : Classic Range\n<strong><u>WALL PANELING - MOCHA LADDER</u></strong>\nSupply and Installation of teakwood beading as per catalogue design on 1 wall + premium emulsion paint for the rest of the area on same wall - up to size 10\'x10\'\n*If the undulations in the wall is high, there might be visible gaps'
},

'DUA4005': {
  price: '104900',
  content: '(I). CEILING 2 COATS OF BUDGET ELMUSIONS\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\n(II). 1 WALL PANELING - CUBANO',
  description: '<strong><u>CEILING</u></strong> : Touch up Putty +  Two Coats  Budget Emulsion\nBrands :   JSW - Elegant /  Birla Opus - I30 / Asian - Tractor\n<strong><u>WALLS</u></strong>:Touch up Putty + One Coat  Primer + Two Coats Premium Emulsion\nBrands :  JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\n<strong><u>WALL PANELING - CUBANO</u></strong>\nSupply and Installation of 2 designer panels as per selection on 1 wall + premium emulsion paint for the rest of the area on same wall - up to size 10x10\n*Including plywood backing '
},
'DUC2001': {
  price: '51500',
  content: '(I). CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\n(II). RE-POLISHING OF 1 MAIN DOOR AND RE-PAINTING OF 1 BALCONY GRILL',
  description: '<strong><u>CEILING</u></strong> :\n Touch up Putty +  Two Coats  Budget Emulsion\n Brands :   JSW - Elegant /  Birla Opus - I30 / Asian - Tractor\n<strong><u>WALLS</u></strong>: \nTouch up Putty + One Coat  Primer + Two Coats Premium Emulsion\n Brands :  JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion;\n<strong><u>RE-POLISHING OF DOOR</u></strong>:\n Staining, colour matching and finishing with melamine internal grade top coat (Semi-gloss)\n<strong><u>RE-PAINTING OF GRILL</u></strong>:\n Primer + 2 coats of enamel satin finish paint'
},
'DUC2002': {
  price: '59200',
  content: '(I). CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\n(II). 1 WALL TEXTURE - CLASSIC RANGE UP TO 100SFT',
  description: '<strong><u>CEILING</u></strong>:\nTouch up Putty +  Two Coats  Budget Emulsion\nBrands :   JSW - Elegant /  Birla Opus - I30 / Asian - Tractor\n<strong><u>WALLS</u></strong>:\nTouch up Putty + One Coat  Primer + Two Coats Premium Emulsion\nBrands :  JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion;\n<strong><u>TEXTURE PAINT</u></strong>:\nApplication of classic range of texture, make Asian Paints\nSeries : Archi Concrete series, Opaco matt, Stucco, Dune Drizzle, Lithos Series'
},
'DUC2003': {
  price: '51200',
  content: '(I). CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\n(II). 1 WALL WALLPAPER - CLASSIC RANGE',
  description: '<strong><u>CEILING</u></strong>:\nTouch up Putty +  Two Coats  Budget Emulsion\nBrands :   JSW - Elegant /  Birla Opus - I30 / Asian - Tractor\n<strong><u>WALLS</u></strong>:\nTouch up Putty + One Coat  Primer + Two Coats Premium Emulsion\nBrands :  JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion;\n<strong><u>Wallpaper</u></strong>:\nSupply and Installation of Wallpaper for 1 Wall\nSeries:Classic Range'
},
'DUC3001': {
  price: '65800',
  content: '(I).CEILING : 2 COATS OF BUDGET EMULSION\nWALLS:PRIMER + 2COATS PREMIUM EMULSION\n(II). RE-POLISHING : 1 MAIND DOOR AND RE-PAINTING OF 1 BALCONYGRILL',
  description: '<strong><u>CEILING</u></strong>:\nTouch up Putty + Two Coats Budget Emulsion\nBrands: JSW-Elegant/Birla Opus-I30/Asian-Tractor\n<strong><u>WALLS</u></strong>:\nTouch up Putty+One Coat Primer+Two Coats Premium Emulsion\nBrands: JSW-Regal/Birla Opus-I30/Asian-Premium Emulsion\n<strong><u>RE-POLISHING OF DOOR</u></strong>:\nStaining,color matching and finishing with melamine internal grade top coat (Semi-gloss)\n<strong><u>RE-PAINTING OF GRILL</u></strong>:\nPrimer+2 coats of enamel satin finish paint'
},
'DUC3002': {
  price: '73400',
  content: '(I). CEILING : 2 COATS OF BUDGET EMULSION\nWALLS:PRIMER + 2COATS PREMIUM EMULSION\n(II). 1 WALL TEXTURE - CLASSIC RANGE',
  description: '<strong><u>CEILING</u></strong>:\nTouch up Putty + Two Coats Budget Emulsion\nBrands: JSW-Elegant/Birla Opus-I30/Asian-Tractor\n<strong><u>WALLS</u></strong>:\nTouch up Putty+One Coat Primer+Two Coats Premium Emulsion\nBrands: JSW-Regal/Birla Opus-I30/Asian-Premium Emulsion\n<strong><u>TEXTURE PAINT</u></strong>:\nApplication of classic range of texture, make Asian Paints\nSeries: Archi Concrete series,Opaco matt,Stucco,Dune Drizzle,Lithos Series'
},
'DUC3003': {
  price: '65400',
  content: '(I).CEILING : 2 COATS OF BUDGET EMULSION\nWALLS:PRIMER + 2COATS PREMIUM EMULSION\n(II). 1 WALL WALLPAPER - CLASSIC RANGE',
  description: '<strong><u>CEILING</u></strong>:\n Touch up Putty + Two Coats Budget Emulsion\nBrands: JSW-Elegant/Birla Opus-I30/Asian-Tractor\n<strong><u>WALLS</u></strong>:\nTouch up Putty+One Coat Primer+Two Coats Premium Emulsion\nBrands: JSW-Regal/Birla Opus-I30/Asian-Premium Emulsion\n<strong><u>WALLPAPER</u></strong>:\nSupply and Installation of Wallpaper for one wall Series: Classic Range'
},
'QAC2001':{
  price:'83500',
  content:'(I). CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\n(II). RE-POLISHING : 1 MAIND DOOR AND RE-PAINTING OF 1 BALCONYGRILL\n(III). 1 WALL TEXTURE - CLASSIC RANGE\n(IV). 1 WALL WALLPAPER - CLASSIC RANGE',
  description:'<strong><u>CEILING</u></strong>:\nTouch up Putty +  Two Coats  Budget Emulsion\nBrands :\nJSW - Elegant /  Birla Opus - I30 / Asian - Tractor\n<strong><u>WALLS</u></strong>:\nTouch up Putty + One Coat  Primer + Two Coats Premium Emulsion\nBrands :  JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\n<strong><u>RE-POLISHING OF DOOR</u></strong>:\nStaining, colour matching and finishing with melamine internal grade top coat (Semi-gloss)\n<strong><u>RE-PAINTING OF GRILL</u></strong>:\nPrimer + 2 coats of enamel satin finish paint\n<strong><u>TEXTURE PAINT</u></strong>:\nApplication of classic range of texture, make Asian Paints\nSeries:\n Archi Concrete series, Opaco matt, Stucco, Dune Drizzle, Lithos Series\n<strong><u>WALLPAPER</u></strong>:\nSupply and Installation of Wallpaper for 1 wall\nSeries : Classic Range'
},
'QAC2002':{
  price:'95000',
  content:'(I). CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\n(II). RE-POLISHING : 1 MAIND DOOR AND RE-PAINTING OF 1 BALCONYGRILL\n(III). 1 WALL TEXTURE - CLASSIC RANGE\n(IV). 1 WALL PANELING - MOCHA LADDER',
  description:'<strong><u>CEILING</u></strong>:\nTouch up Putty +  Two Coats  Budget Emulsion\nBrands :   JSW - Elegant /  Birla Opus - I30 / Asian - Tractor\n<strong><u>WALLS</u></strong>:\nTouch up Putty + One Coat  Primer + Two Coats Premium Emulsion\nBrands: JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\n<strong><u>RE-POLISHING OF DOOR</u></strong>:\nStaining, colour matching and finishing with melamine internal grade top coat (Semi-gloss)\n<strong><u>RE-PAINTING OF GRILL</u></strong>:\nPrimer + 2 coats of enamel satin finish paint\n<strong><u>WALLPAPER</u></strong>:Supply and Installation of Wallpaper for 1 wall\nSeries : Classic Range\n<strong><u>WALL PANELING - MOCHA LADDER</u></strong>:\nSupply and Installation of teakwood beading as per catalogue design on 1 wall + premium emulsion paint for the rest of the area on same wall - up to size 10\'x10\'\n*If the undulations in the wall is high, there might be visible gaps'
},
'QAP2003':{
  price:'102700',
  content:'(I). CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\n(II).WALL TEXTURE -  CLASSIC RANGE\n(III). 1 WALL WALLPAPER - CLASSIC RANGE\n(IV). 1 WALL PANELING - MOCHA LADDER',
  description:'<strong><u>CEILING</u></strong>:\nTouch up Putty +  Two Coats  Budget Emulsion\nBrands: JSW - Elegant /  Birla Opus - I30 / Asian - Tractor\n<strong><u>WALLS</u></strong>:\nTouch up Putty + One Coat  Primer + Two Coats Premium Emulsion\nBrands: JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\n<strong><u>TEXTURE PAINT</u></strong>:\nApplication of classic range of texture, make Asian Paints\nSeries : Archi Concrete series, Opaco matt, Stucco, Dune Drizzle, Lithos Series\n<strong><u>WALLPAPER</u></strong>:\nSupply and Installation of Wallpaper for 1 wall\nSeries : Classic Range\n<strong><u>WALL PANELING - MOCHA LADDER</u></strong>\nSupply and Installation of teakwood beading as per catalogue design on 1 wall + premium emulsion paint for the rest of the area on same wall - up to size 10\'x10\'\n*If the undulations in the wall is high, there might be visible gaps'
},
'QAA2004':{
  price:'112000',
  content:'(I). CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\n(II).1 WALL WALLPAPER - CLASSIC RANGE\n(III). 1 WALL WALLPAPER - CLASSIC RANGE\n(IV). 1 WALL PANELING - CUBANO',
  description:'<strong><u>CEILING</u></strong>:\nTouch up Putty +  Two Coats  Budget Emulsion\nBrands: JSW - Elegant /  Birla Opus - I30 / Asian - Tractor\n<strong><u>WALLS</u></strong>:Touch up Putty + One Coat  Primer + Two Coats Premium Emulsion\nBrands: JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\n<strong><u>TEXTURE PAINT</u></strong>:\nApplication of classic range of texture, make Asian Paints\nSeries : Archi Concrete series, Opaco matt, Stucco, Dune Drizzle, Lithos Series\n<strong><u>WALLPAPER</u></strong>:Supply and Installation of Wallpaper for 1 wall\nSeries: Classic Range\n<strong><u>WALL PANELING - CUBANO</u></strong>\nSupply and Installation of 2 designer panels as per selection on 1 wall + premium emulsion paint for the rest of the area on same wall - up to size 10x10\n*Including plywood backing'
},
'QAC3001':{
  price:'97800',
  content:'(I). CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\n(II). RE-POLISHING : 1 MAIN DOOR AND RE-PAINTING OF 1 BALCONY GRILL\n(III). 1 WALL TEXTURE - CLASSIC RANGE\n(IV). 1 WALL WALLPAPER - CLASSIC RANGE',
  description:'<strong><u>CEILING</u></strong>:\nTouch up Putty +  Two Coats  Budget Emulsion\nBrands: JSW - Elegant /  Birla Opus - I30 / Asian - Tractor\n<strong><u>WALLS</u></strong>:\nTouch up Putty + One Coat  Primer + Two Coats Premium Emulsion\nBrands :  JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\n<strong><u>RE-POLISHING OF DOOR</u></strong>:\nStaining, colour matching and finishing with melamine internal grade top coat (Semi-gloss)\n<strong><u>RE-PAINTING OF GRILL</u></strong>:\nPrimer + 2 coats of enamel satin finish paint\n<strong><u>TEXTURE PAINT</u></strong>:\nApplication of classic range of texture, make Asian Paints\nSeries : Archi Concrete series, Opaco matt, Stucco, Dune Drizzle, Lithos Series\n<strong><u>WALLPAPER</u></strong>:\NSupply and Installation of Wallpaper for 1 wall\nSeries : Classic Range'
},
'QAC3002':{
  price:'109300',
  content:'(I). CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\n(II). RE-POLISHING : 1 MAIN DOOR AND RE-PAINTING OF 1 BALCONY GRILL\n(III). 1 WALL WALLPAPER - CLASSIC RANGE\n(IV). 1 WALL PANELING - MOCHA LADDER',
  description:'<strong><u>CEILING</u></strong>:\nTouch up Putty +  Two Coats  Budget Emulsion\nBrands :   JSW - Elegant /  Birla Opus - I30 / Asian - Tractor\n<strong><u>WALLS</u></strong>:Touch up Putty + One Coat  Primer + Two Coats Premium Emulsion\nBrands :  JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\n<strong><u>RE-POLISHING OF DOOR</u></strong>:\nStaining, colour matching and finishing with melamine internal grade top coat (Semi-gloss)\n<strong><u>RE-PAINTING OF GRILL</u></strong>:\nPrimer + 2 coats of enamel satin finish paint\n<strong><u>WALLPAPER</u></strong>:Supply and Installation of Wallpaper for 1 wall\nSeries: Classic Range\n<strong><u>WALL PANELING - MOCHA LADDER</u></strong>\nSupply and Installation of teakwood beading as per catalogue design on 1 wall + premium emulsion paint for the rest of the area on same wall - up to size 10\'x10\'\n*If the undulations in the wall is high, there might be visible gaps'
},
'QAP3003':{
  price:'116900',
  content:'(I). CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\n(II). 1 WALL TEXTURE-CLASSIC RANGE\n(III).1 WALL PANELING - MOCHA LADDER',
  description:'<strong><u>CEILING</u></strong>:\nTouch up Putty +  Two Coats  Budget Emulsion\nBrands :   JSW - Elegant /  Birla Opus - I30 / Asian - Tractor\n<strong><u>WALLS</u></strong>:Touch up Putty + One Coat  Primer + Two Coats Premium Emulsion\nBrands :  JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\n<strong><u>TEXTURE PAINT</u></strong>:\nApplication of classic range of texture, make Asian Paints\nSeries : Archi Concrete series, Opaco matt, Stucco, Dune Drizzle, Lithos Series\n<strong><u>WALLPAPER</u></strong>:\nSupply and Installation of Wallpaper for 1 wall\nSeries : Classic Range\n<strong><u>WALL PANELING - MOCHA LADDER</u></strong>\n Supply and Installation of teakwood beading as per catalogue design on 1 wall + premium emulsion paint for the rest of the area on same wall - up to size 10\'x10\'\n*If the undulations in the wall is high, there might be visible gaps'
},
'QAA3004':{
  price:'126200',
  content:'(I). CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\n(II). 1 WALL TEXTURE-CLASSIC RANGE\n(III). 1 WALL WALLPAPER - CLASSIC RANGE\n(IV). 1 WALL PANELING - CUBANO',
  description:'<strong><u>CEILING</u></strong>:\nTouch up Putty +  Two Coats  Budget Emulsion\nBrands :   JSW - Elegant /  Birla Opus - I30 / Asian - Tractor\n<strong><u>WALLS</u></strong>:Touch up Putty + One Coat  Primer + Two Coats Premium Emulsion\nBrands :  JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\n<strong><u>TEXTURE PAINT</u></strong>:\nApplication of classic range of texture, make Asian Paints\nSeries:Archi Concrete series, Opaco matt, Stucco, Dune Drizzle, Lithos Series\n<strong><u>WALLPAPER</u></strong>:\n Supply and Installation of Wallpaper for 1 wall\nSeries:Classic Range\n<strong><u>WALL PANELING - CUBANO</u></strong>\nSupply and Installation of 2 designer panels as per selection on 1 wall + premium emulsion paint for the rest of the area on same wall - up to size 10x10\n*Including plywood backing'
},
'QAC4001':{
  price:'108400',
  content:'(I). CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\n(II). RE-POLISHING : 1 MAIN DOOR AND RE-PAINTING OF 1 BALCONY GRILL\n(III). 1 WALL TEXTURE - CLASSIC RANGE\n(IV). 1 WALL WALLPAPER - CLASSIC RANGE',
  description:'<strong><u>CEILING</u></strong>:\nTouch up Putty +  Two Coats  Budget Emulsion\nBrands: JSW - Elegant /  Birla Opus - I30 / Asian - Tractor\n<strong><u>WALLS</u></strong>:\nTouch up Putty + One Coat  Primer + Two Coats Premium Emulsion\nBrands :  JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\n<strong><u>RE-POLISHING OF DOOR</u></strong>:\nStaining, colour matching and finishing with melamine internal grade top coat (Semi-gloss)\n<strong><u>RE-PAINTING OF GRILL</u></strong>:\nPrimer + 2 coats of enamel satin finish paint\n<strong><u>TEXTURE PAINT</u></strong>:\nApplication of classic range of texture, make Asian Paints\nSeries : Archi Concrete series, Opaco matt, Stucco, Dune Drizzle, Lithos Series\n<strong><u>WALLPAPER</u></strong>:\nSupply and Installation of Wallpaper for 1 wall\nSeries : Classic Range'
},
'QAC4002':{
  price:'120000',
  content:'(I). CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\n(II). RE-POLISHING : 1 MAIN DOOR AND RE-PAINTING OF 1 BALCONY GRILL\n(III). 1 WALL WALLPAPER - CLASSIC RANGE\n(IV). 1 WALL PANELING - MOCHA LADDER',
  description:'<strong><u>CEILING</u></strong>:\nTouch up Putty +  Two Coats  Budget Emulsion\nBrands: JSW - Elegant /  Birla Opus - I30 / Asian - Tractor\n<strong><u>WALLS</u></strong>:Touch up Putty + One Coat  Primer + Two Coats Premium Emulsion\nBrands: JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\n<strong><u>RE-POLISHING OF DOOR</u></strong>:\nStaining, colour matching and finishing with melamine internal grade top coat (Semi-gloss)\n<strong><u>RE-PAINTING OF GRILL</u></strong>:\nPrimer + 2 coats of enamel satin finish paint\n<strong><u>WALLPAPER</u></strong>:Supply and Installation of Wallpaper for 1 wall\nSeries : Classic Range\n<strong><u>WALL PANELING - MOCHA LADDER</u></strong>:\nSupply and Installation of teakwood beading as per catalogue design on 1 wall + premium emulsion paint for the rest of the area on same wall - up to size 10\'x10\'\n*If the undulations in the wall is high, there might be visible gaps'
},
'QAP4003':{
  price:'127600',
  content:'(I). CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\n(II).1 WALL TEXTURE-CLASSIC RANGE\n(III). 1 WALL WALLPAPER - CLASSIC RANGE\n(IV). 1 WALL PANELING - MOCHA LADDER',
  description:'<strong><u>CEILING</u></strong>:\nTouch up Putty +  Two Coats  Budget Emulsion\nBrands :   JSW - Elegant /  Birla Opus - I30 / Asian - Tractor\n<strong><u>WALLS</u></strong>:\nTouch up Putty + One Coat  Primer + Two Coats Premium Emulsion\nBrands :  JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\n<strong><u>TEXTURE PAINT</u></strong>:\nApplication of classic range of texture, make Asian Paints\nSeries : Archi Concrete series, Opaco matt, Stucco, Dune Drizzle, Lithos Series\n<strong><u>WALLPAPER</u></strong>:\nSupply and Installation of Wallpaper for 1 wall\nSeries : Classic Range\n<strong><u>WALL PANELING - MOCHA LADDER</u></strong>:\nSupply and Installation of teakwood beading as per catalogue design on 1 wall + premium emulsion paint for the rest of the area on same wall - up to size 10\'x10\'\n*If the undulations in the wall is high, there might be visible gaps'
},
'QAA4004':{
  price:'136900',
  content:'(I). CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\n(II). 1 WALL WALLPAPER - CLASSIC RANGE\n(III). 1 WALL TEXTURE - CLASSIC RANGE\n(IV). 1 WALL PANELING - CUBANO',
  description:'<strong><u>CEILING</u></strong>:\nTouch up Putty +  Two Coats  Budget Emulsion\nBrands: JSW - Elegant /  Birla Opus - I30 / Asian - Tractor\n<strong><u>WALLS</u></strong>:Touch up Putty + One Coat  Primer + Two Coats Premium Emulsion\nBrands :  JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\n<strong><u>WALLPAPER</u></strong>:\n Supply and Installation of Wallpaper for 1 wall\nSeries:Classic Range\n<strong><u>TEXTURE PAINT</u></strong>:\nApplication of classic range of texture, make Asian Paints\nSeries : Archi Concrete series, Opaco matt, Stucco, Dune Drizzle, Lithos Series\n<strong><u>WALLPAPER</u></strong>:Supply and Installation of Wallpaper for 1 wall\nSeries : Classic Range\n<strong><u>WALL PANELING - CUBANO</u></strong>\nSupply and Installation of 2 designer panels as per selection on 1 wall + premium emulsion paint for the rest of the area on same wall - up to size 10x10\n*Including plywood backing'
},

  };
  private readonly codeRanges: Record<CodeRangePrefix, string[]> = {
    'DUA': ['2005','3005','4005'],
    'DUC': ['2001', '2002','2003','3001','3002','3003','4001', '4002', '4003'],
    'DUP': ['2004', '3004', '4004'],
    'TRA': ['2005','3005','4005'],
    'TRC': ['2001', '2002', '2003','3001', '3002', '3003', '4001', '4002','4003'],
    'TRP': ['2004', '3004', '4004'],
    'QAA': ['2004','3004','4004'],
    'QAC': ['2001', '2002','3001','3002','4001', '4002'],
    'QAP': ['2003', '3003', '4003']
  };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private packageProvider: PackageProvider,
    private cd: ChangeDetectorRef,
    private toaster:ToastrService,
    private router:Router
  ) {}

  ngOnInit() {
    this.PackageForm = this.fb.group({
      package: this.fb.array([])
    });

    this.addPackage();
    this.extractCustomerId();
    this.loadExistingPackages();
    this.PackageForm.valueChanges.subscribe(() => {
      this.formModified.emit();
    });
  }

  get package(): FormArray {
    return this.PackageForm.get('package') as FormArray;
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  navigateBack(): void {
    if (this.customerId) {
      this.router.navigate(['/quotation-builder/view', this.customerId]);
    } else {
      this.router.navigate(['/quotation-builder/view']);
    }
  }
  private extractCustomerId(): void {
    if (this.route.parent) {
      this.route.parent.paramMap
        .pipe(takeUntil(this.destroy$))
        .subscribe(params => {
          const customerIdParam = params.get('customerId');
          if (customerIdParam) {
            this.customerId = parseInt(customerIdParam, 10);
            console.log('Parent Route Customer ID:', this.customerId);
          }
        });
    }
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const customerIdParam = params.get('customerId');
        if (customerIdParam) {
          this.customerId = parseInt(customerIdParam, 10);
          console.log('Current Route Customer ID:', this.customerId);
        }
      });
    if (this.currentPackage?.customerId) {
      this.customerId = this.currentPackage.customerId;
      console.log('Current Package Customer ID:', this.customerId);
    }
  }
  getAvailableCodes(packageType: string, type: string): string[] {
    if (!packageType || !type) return [];
    let prefix = '';
    if (packageType.toLowerCase() === 'quad') {
      prefix = 'QA';
    } else if (packageType.toLowerCase() === 'duo') {
      prefix = 'DU';
    } else if (packageType.toLowerCase() === 'trio') {
      prefix = 'TR';
    }
    if (type.toLowerCase() === 'classic') {
      prefix += 'C';
    } else if (type.toLowerCase() === 'prime') {
      prefix += 'P';
    } else if (type.toLowerCase() === 'azzure') {
      prefix += 'A';
    }
    return this.codeRanges[prefix as CodeRangePrefix] || [];
  }

  createPackage(): FormGroup {
    const packageGroup = this.fb.group({
      packageId: [null],
      packageType: ['', [Validators.required]], 
      productCode: [''],
      type: ['', [Validators.required]], 
      selectCode: ['', [Validators.required]],
      description: [''],
      content: [''],
      price: [''],
      remarks: [''],
      sectionTotalPretax: [''],
      sectionTotalPosttax: ['']
    });
    packageGroup.get('packageType')?.valueChanges.subscribe(packageType => {
      if (packageType) {
        let prefix;
        if (packageType.toLowerCase() === 'quad') {
          prefix = 'QA';
        } else {
          prefix = packageType.substring(0, 2).toUpperCase();
        }
        
        packageGroup.patchValue({
          productCode: prefix,
          selectCode: '' 
        }, { emitEvent: false });
      }
    });
    packageGroup.get('type')?.valueChanges.subscribe(type => {
      const packageType = packageGroup.get('packageType')?.value;
      if (packageType && type) {
        let prefix;
        if (packageType.toLowerCase() === 'quad') {
          prefix = 'QA';
        } else {
          prefix = packageType.substring(0, 2).toUpperCase();
        }
        const typeSuffix = type.substring(0, 1).toUpperCase();
        
        packageGroup.patchValue({
          productCode: `${prefix}${typeSuffix}`,
          selectCode: '' 
        }, { emitEvent: false });
      }
    });
    packageGroup.get('selectCode')?.valueChanges.subscribe(code => {
      const packageType = packageGroup.get('packageType')?.value;
      const type = packageGroup.get('type')?.value;
      
      if (packageType && type && code) {
        let prefix;
        if (packageType.toLowerCase() === 'quad') {
          prefix = 'QA';
        } else {
          prefix = packageType.substring(0, 2).toUpperCase();
        }
        const typeSuffix = type.substring(0, 1).toUpperCase();
        const fullCode = `${prefix}${typeSuffix}${code}`;
        packageGroup.patchValue({
          productCode: fullCode
        }, { emitEvent: true });
        const data = this.packageData[fullCode];
        if (data) {
          const pretaxAmount = parseFloat(data.price);
          const posttaxAmount = pretaxAmount * 1.18;
          
          packageGroup.patchValue({
            price: data.price,
            description: data.description,
            content: data.content,
            sectionTotalPretax: pretaxAmount.toFixed(2),
            sectionTotalPosttax: posttaxAmount.toFixed(2)
          }, { emitEvent: false });
          
          this.cd.detectChanges();
        }
      }
    });
    
    return packageGroup;
  }
  private loadExistingPackages(): void {
    if (this.customerId && this.customerId > 0) {
      this.packageProvider.getPackageDataByCustomerId(this.customerId, {deleted: 0})
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (packages: Package[]) => {
            if (packages && packages.length > 0) {
              // Clear existing packages
              while (this.package.length !== 0) {
                this.package.removeAt(0);
              }
  
              // Populate form with existing packages
              packages.forEach(pkg => {
                const packageGroup = this.createPackage();
                
                // Ensure type and select code are set from the existing data
                packageGroup.patchValue({
                  packageType: pkg.packageType || '',
                  type: pkg.type || '',
                  selectCode: pkg.selectedCode || '',
                  productCode: pkg.productCode || '',
                  price: pkg.amount || '',
                  description: pkg.specification || '',
                  content: pkg.condition || '',
                  remarks: pkg.remarks || '',
                  sectionTotalPretax: pkg.sectionTotalPreTax || '',
                  sectionTotalPosttax: pkg.sectionTotalPostTax || ''
                }, { emitEvent: false }); // Prevent unnecessary value changes
  
                this.package.push(packageGroup);
              });
  
              this.cd.detectChanges();
            } else {
              this.addPackage();
            }
          },
          error: (error) => {
            console.error('Error loading packages:', error);
            this.toaster.error('Failed to load existing packages');
            this.addPackage();
          }
        });
    } else {
      this.addPackage();
    }
  }
  confirmPackage(): void {
    console.log('Confirm Package Called');
    console.log('Form Valid:', this.PackageForm.valid);
    console.log('Form Value:', this.PackageForm.value);
  
    // Mark all form controls as touched to trigger validation display
    this.PackageForm.markAllAsTouched();
    
    // Detailed form validation
    if (!this.PackageForm.valid) {
      console.log('Form Validation Errors:');
      Object.keys(this.PackageForm.controls).forEach(key => {
        const controlErrors = this.PackageForm.get(key)?.errors;
        if (controlErrors) {
          console.log(`${key} errors:`, controlErrors);
        }
      });
      
        // More precise validation checking
    this.package.controls.forEach((packageControl, index) => {
      // Check each individual form group
      if (packageControl instanceof FormGroup) {
        Object.keys(packageControl.controls).forEach(controlName => {
          const control = packageControl.get(controlName);
          if (control?.invalid) {
            console.log(`Package ${index} - ${controlName} is invalid`, control.errors);
          }
        });
      }
    });

      this.toaster.error('Please fill all required fields correctly');
      return;
    }
  
    // Check customer ID
    if (!this.customerId || this.customerId <= 0) {
      console.error('Invalid Customer ID:', this.customerId);
      this.toaster.error('Valid Customer ID is required');
      return;
    }
  
    // Check user ID
    const userId = localStorage.getItem('UserId');
    if (!userId) {
      console.error('User ID not found in localStorage');
      this.toaster.error('User ID not found. Please log in again.');
      return;
    }
  
    // Prepare packages for submission
    const packagesToSubmit: Package[] = this.package.controls
      .filter(packageControl => {
        // Only new packages or packages without an existing ID
        const hasPackageId = packageControl.get('packageId')?.value;
        console.log('Package has ID:', hasPackageId);
        return !hasPackageId;
      })
      .map(packageControl => {
        const currentPackage = new Package();
        
        // Log form control values for debugging
        console.log('Package Control Values:', packageControl.value);
  
        // Set package properties
        currentPackage.customerId = this.customerId;
        currentPackage.packageType = packageControl.get('packageType')?.value;
        currentPackage.productCode = packageControl.get('productCode')?.value;
        currentPackage.selectedCode = packageControl.get('selectCode')?.value;
        currentPackage.type = packageControl.get('type')?.value;
        currentPackage.amount = packageControl.get('price')?.value;
        currentPackage.remarks = packageControl.get('remarks')?.value;
        currentPackage.specification = packageControl.get('description')?.value;
        currentPackage.condition = packageControl.get('content')?.value;
        currentPackage.sectionTotalPreTax = packageControl.get('sectionTotalPretax')?.value;
        currentPackage.sectionTotalPostTax = packageControl.get('sectionTotalPosttax')?.value;
        
        // Set audit fields
        currentPackage.createdBy = parseInt(userId);
        currentPackage.createdOn = new Date();
        currentPackage.lastModifiedBy = parseInt(userId);
        currentPackage.lastModifiedDate = new Date();
  
        return currentPackage;
      });
  
    // Log packages to submit
    console.log('Packages to Submit:', packagesToSubmit);
  
    try {
      if (packagesToSubmit.length > 0) {
        this.packageProvider.addPackage(packagesToSubmit);
      } else {
        console.log('No new packages to save');
        this.toaster.info('No new packages to save');
      }
    } catch (error) {
      console.error('Package submission failed:', error);
      this.toaster.error('Failed to submit packages. Please try again.');
    }
  }
  addPackage() {
    const packageGroup = this.createPackage();
    this.package.push(packageGroup);
  }

  removePackage(index: number) {
    this.package.removeAt(index);
  }

  calculateSectionTotal(): string {
    const total = this.package.controls.reduce((total, control) => {
      const postTaxValue = parseFloat(control.get('sectionTotalPosttax')?.value || '0');
      return total + postTaxValue;
    }, 0);
    return total.toFixed(2);
  }
}