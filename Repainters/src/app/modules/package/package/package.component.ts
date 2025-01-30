import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { Package } from 'src/app/Shared/models/package';
import { PackageProvider } from 'src/app/Shared/Provider/PackageProvider';

interface PackageData {
  price: string;
  content: string;
  description: string;
}

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css'],
})
export class PackageComponent implements OnInit {
  @Output() formModified = new EventEmitter<void>();
  PackageForm!: FormGroup;
  customerId: number | null = null;
  @Input() currentpackage: Package = new Package();
  packageTypes = ['Classic', 'Prime', 'Azure'];
  furnitureTypes = ['Duo', 'Trio', 'Quad'];
  packageCodes=['2001','2002','2003','2004','2005','3001','3002','3003','3004','3005','4001','4002','4003','4004','4005']
  private readonly packageData: { [key: string]: PackageData } = {
    'DUA2005': {
      price: '80000',
      content: 'I.CEILING : 2 COATS OF BUDGET EMULSION WALLS : PRIMER + 2 COATS PREMIUM EMULSION II.1 WALL PANELING - CUBANO',
      description: 'CEILING : Touch up Putty +  Two Coats  Budget Emulsion Brands :   JSW - Elegant /  Birla Opus - I30 / Asian - Tractor "WALLS:Touch up Putty + One Coat  Primer + Two Coats Premium Emulsion  Brands :  JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion" "WALL PANELING - MOCHA LADDERSupply and Installation of teakwood beading as per catalogue design on 1 wall + premium emulsion paint for the rest of the area on same wall - up to size 10X10 *If the undulations in the wall is high, there might be visible gaps"'
    },
    'DUC4001': {
      price: '76400',
      content: 'I.CEILING : TWO COATS OF BUDGET EMULSIONS',
      description: 'CEILING TOUCH UP PUTTY AND TWO COATS BUDGET ELMUSIONS BRANDS JSW ELEGANT/BIRLA OPUS I30/ASIAN TRACTOR ; WALKS PRIMER PLUS TWO COTAS PREMIUM ELMUSIONS ; WALKS TOUCH UP PUTTY ONE COAT PRIMERS PLUS TWO COTAS PREMIUM ELMUSIONS BRANDS JSW REGAL/BIRLA OPUS I30/ASIAN PREMIUM ELMUSIONS ... II.RE-POLISHING :1 MAIND DOOR AND RE-PAINTING OF ONE BALCONY GRILL ; RE-POLISHING OF DOOR: Staining,color matching and finishing with melamine internal grade top coat (Semi-gloss) RE-PAINTING OF GRILL: Primer+two coats of enamel satin finish paint'
    },
    'DUC4002': {
      price: '84100',
      content: 'I.CEILING : TWO COATS OF BUDGET ELMUSIONS',
      description: 'CEILING TOUCH UP PUTTY AND TWO COAT BUDGET ELMUSIONS BRANDS JSW ELEGANT/BIRLA OPUS I30/ASIAN TRACTOR ; WALKS PRIMER PLUS TWO COTAS PREMIUM ELMUSIONS ; WALKS TOUCH UP PUTTY ONE COAT PRIMERS PLUS TWO COTAS PREMIUM ELMUSIONS BRANDS JSW REGAL/BIRLA OPUS I30/ASIAN PREMIUM ELMUSIONS ; II.1 WAL TEXTURE CLASSIC RANGE ; TEXTURE PAINT APPLICATION CLASSIC RANGE TEXTURES MAKE ASIAN PAINT SERIES ARCHI CONCRETE SERIES OPACO MATT STUCCO DUNE DRIZZLE LITHOS SERIES'
    },
    'DUC4003': {
      price: '76100',
      content: 'I.CEILING TWO COAT BUDGET ELMUSIONS',
      description: 'CEILING TOUCH UP PUTTY AND TWO COAT BUDGET ELMUSIONS BRANDS JSW ELEGANT/BIRLA OPUS I30/ASIAN TRACTOR ; WALKS PRIMER PLUS TWO COTAS PREMIUM ELMUSIONS ; WALKS TOUCH UP PUTTY ONE COAT PRIMERS PLUS TWO COTAS PREMIUM ELMUSIONS BRANDS JSW REGAL/BIRLA OPUS I30/ASIAN PREMIUM ELMUSIONS ; II.1 WAL WALLPAPER CLASSIC RANGE ; PAPER SUPPLY INSTALLATION PAPER FOR ONE WAL SERIES CLASSIC RANGE'
    },
    'DUP2004': {
      price: '70700',
      content: 'I.CEILING : 2 COATS OF BUDGET EMULSION',
      description: 'CEILING : Touch up Putty +  Two Coats  Budget Emulsion Brands :   JSW - Elegant /  Birla Opus - I30 / Asian - Tractor; WALLS : PRIMER + 2 COATS PREMIUM EMULSION; WALLS: Touch up Putty + One Coat  Primer + Two Coats Premium Emulsion Brands :  JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion; II.1 WALL PANELING - MOCHA LADDER; WALL PANELING - MOCHA LADDER Supply and Installation of teakwood beading as per catalogue design on 1 wall + premium emulsion paint for the rest of the area on same wall - up to size 10\'x10\' *If the undulations in the wall is high, there might be visible gaps'
    },
    'DUP3004': {
      price: '84900',
      content: 'I.CEILING : 2 COATS OF BUDGET EMULSION',
      description: 'CEILING : Touch up Putty + Two Coats Budget Emulsion Brands: JSW-Elegant/Birla Opus-I30/Asian-Tractor; WALLS: PRIMER+2 COATS PREMIUM EMULSION; WALLS: Touch up Putty+One Coat Primer+Two Coats Premium Emulsion Brands: JSW-Regal/Birla Opus-I30/Asian-Premium Emulsion; II.1 WALL PANELING-MOCHA LADDER; WAL PANELING-MOCHA LADDER Supply and Installation of teakwood beading as per catalogue design on one wall+premium emulsion paint for the rest of the area on same wall-up to size10\'x10\' *If the undulations in the wall is high, there might be visible gaps'
    },
    'DUP4004': {
      price: '95600',
      content: 'I.CEILING TWO COAT BUDGET ELMUSIONS',
      description: 'CEILING TOUCH UP PUTTY AND TWO COAT BUDGET ELMUSIONS BRANDS JSW ELEGANT/BIRLA OPUS I30/ASIAN TRACTOR ; WALKS PRIMER PLUS TWO COTAS PREMIUM ELMUSIONS ; WALKS TOUCH UP PUTTY ONE COAT PRIMERS PLUS TWO COTAS PREMIUM ELMUSIONS BRANDS JSW REGAL/BIRLA OPUS I30/ASIAN PREMIUM ELMUSIONS ; II.1 WAL PANELING MOCHA LADDER ; WAL PANELING MOCHA LADDER SUPPLY INSTALLATION TEAKWOOD BEADING AS PER CATALOGUE DESIGN ON ONE WAL PLUS PREMIUM ELMUSIONS PAINT FOR THE REST AREA SAME WAL UP TO SIZE TEN FEET BY TEN FEET IF THE UNDLATIONS IN THE WAL IS HIGH THERE MIGHT BE VISIBLE GAPS'
    },
    'TRA2005': {
      price: '92000',
      content: 'I.CEILING : 2 COATS OF BUDGET EMULSION',
      description: 'CEILING : Touch up Putty + Two Coats Budget Emulsion Brands : JSW - Elegant / Birla Opus - I30 / Asian - Tractor'
    },
    'TRC2001':{
  price:'71500',
  content:'I.CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\nII.RE-POLISHING : 1 MAIND DOOR AND RE-PAINTING OF 1 BALCONY GRILL\nIII.1 WALL TEXTURE - CLASSIC RANGE',
  description:'CEILING :\nTouch up Putty +  Two Coats  Budget Emulsion\nBrands :   JSW - Elegant /  Birla Opus - I30 / Asian - Tractor"\nWALLS:\nTouch up Putty + One Coat  Primer + Two Coats Premium Emulsion\nBrands :  JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion"\nRE-POLISHING OF DOOR:\nStaining, colour matching and finishing with melamine internal grade top coat (Semi-gloss)\nRE-PAINTING OF GRILL:\nPrimer + 2 coats of enamel satin finish paint\nTEXTURE PAINT:\nApplication of classic range of texture, make Asian Paints\nSeries : Archi Concrete series, Opaco matt, Stucco, Dune Drizzle, Lithos Series'
},
    'TRC2002':{
      price:'63500',
      content:'I.CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\nII.RE-POLISHING : 1 MAIND DOOR AND RE-PAINTING OF 1 BALCONY GRILL\nIII.1 WALL TEXTURE - CLASSIC RANGE',
      description:'CEILING :\nTouch up Putty +  Two Coats  Budget Emulsion\nBrands :   JSW - Elegant /  Birla Opus - I30 / Asian - Tractor"\nWALLS:\nTouch up Putty + One Coat  Primer + Two Coats Premium Emulsion\nBrands :  JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion"\nRE-POLISHING OF DOOR:\nStaining, colour matching and finishing with melamine internal grade top coat (Semi-gloss)\nRE-PAINTING OF GRILL:\nPrimer + 2 coats of enamel satin finish paint\nWALLPAPER:\nSupply and Installation of Wallpaper for 1 wall\nSeries : Classic Range'
    },
'TRC2003': {
  price: '71200',
  content: 'I.CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\nII.1 WALL TEXTURE - CLASSIC RANGE\nIII.1 WALL TEXTURE - CLASSIC RANGE',
  description: 'CEILING :\nTouch up Putty +  Two Coats  Budget Emulsion\nBrands :   JSW - Elegant /  Birla Opus - I30 / Asian - Tractor"\nWALLS:\nTouch up Putty + One Coat  Primer + Two Coats Premium Emulsion\nBrands :  JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\nTEXTURE PAINT:\nApplication of classic range of texture, make Asian Paints\nSeries : Archi Concrete series, Opaco matt, Stucco, Dune Drizzle, Lithos Series\nWALLPAPER:\nSupply and Installation of Wallpaper for 1 wall\nSeries : Classic Range'
},
'TRC2004': {
  price: '82700',
  content: 'I.CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\nII.1 WALL TEXTURE - CLASSIC RANGE\nIII.1 WALL PANELING - MOCHA LADDER',
  description: 'CEILING :\nTouch up Putty +  Two Coats  Budget Emulsion\nBrands :   JSW - Elegant /  Birla Opus - I30 / Asian - Tractor"\nWALLS:\nTouch up Putty + One Coat  Primer + Two Coats Premium Emulsion\nBrands :  JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\nWALLPAPER:\nSupply and Installation of Wallpaper for 1 wall\nSeries : Classic Range\n"WALL PANELING - MOCHA LADDER:\nSupply and Installation of teakwood beading as per catalogue design on 1 wall + premium emulsion paint for the rest of the area on same wall - up to size 10x10\n*If the undulations in the wall is high, there might be visible gaps"'
},
'TRC2005': {
  price: '92000',
  content: 'I.CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\nII.1 WALL TEXTURE - CLASSIC RANGE\nIII.1 WALL PANELING - CUBANO',
  description: 'CEILING :\nTouch up Putty +  Two Coats  Budget Emulsion\nBrands :   JSW - Elegant /  Birla Opus - I30 / Asian - Tractor"\nWALLS:\nTouch up Putty + One Coat  Primer + Two Coats Premium Emulsion\nBrands :  JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\nWALLPAPER:\nSupply and Installation of Wallpaper for 1 wall\nSeries : Classic Range\nWALL PANELING - CUBANO\nSupply and Installation of 2 designer panels as per selection on 1 wall + premium emulsion paint for the rest of the area on same wall - up to size 10x10\n*Including plywood backing'
},
'TRC3001': {
  price: '85800',
  content: 'I.CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\nII.RE-POLISHING : 1 MAIND DOOR AND RE-PAINTING OF 1 BALCONY GRILL\nIII.1 WALL TEXTURE - CLASSIC RANGE',
  description: 'CEILING :\nTouch up Putty +  Two Coats  Budget Emulsion\nBrands :   JSW - Elegant /  Birla Opus - I30 / Asian - Tractor"\nWALLS:\nTouch up Putty + One Coat  Primer + Two Coats Premium Emulsion\nBrands :  JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion"\nRE-POLISHING OF DOOR:\nStaining, colour matching and finishing with melamine internal grade top coat (Semi-gloss)\nRE-PAINTING OF GRILL:\nPrimer + 2 coats of enamel satin finish paint\nTEXTURE PAINT:\nApplication of classic range of texture, make Asian Paints\nSeries : Archi Concrete series, Opaco matt, Stucco, Dune Drizzle, Lithos Series'
},
'TRC3002': {
  price: '77800',
  content: 'I.CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\nII.RE-POLISHING : 1 MAIND DOOR AND RE-PAINTING OF 1 BALCONY GRILL\nIII.1 WALL TEXTURE - CLASSIC RANGE',
  description: 'CEILING :\nTouch up Putty +  Two Coats  Budget Emulsion\nBrands :   JSW - Elegant /  Birla Opus - I30 / Asian - Tractor"\nWALLS:\nTouch up Putty + One Coat  Primer + Two Coats Premium Emulsion\nBrands :  JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion"\nRE-POLISHING OF DOOR:\nStaining, colour matching and finishing with melamine internal grade top coat (Semi-gloss)\nRE-PAINTING OF GRILL:\nPrimer + 2 coats of enamel satin finish paint\nWALLPAPER:\nSupply and Installation of Wallpaper for 1 wall\nSeries : Classic Range'
},
'DUA3005': {
  price: '94200',
  content: 'I.CEILING : 2 COATS OF BUDGET EMULSION',
  description: 'CEILING : Touch up Putty + Two Coats Budget Emulsion Brands: JSW-Elegant/Birla Opus-I30/Asian-Tractor; WALLS: PRIMER+2 COATS PREMIUM EMULSION; WALLS: Touch up Putty+One Coat Primer+Two Coats Premium Emulsion Brands: JSW-Regal/Birla Opus-I30/Asian-Premium Emulsion; II.1 WALL PANELING-CUBANO'
},

'TRP2004': {
  price: '82700',
  content: 'I.CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\nII.1 WALL WALLPAPER - CLASSIC RANGE\nIII.1 WALL PANELING - MOCHA LADDER',
  description: 'CEILING : Touch up Putty + Two Coats Budget Emulsion Brands : JSW - Elegant / Birla Opus - I30 / Asian - Tractor\nWALLS: Touch up Putty + One Coat Primer + Two Coats Premium Emulsion Brands : JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\nWALLPAPER: Supply and Installation of Wallpaper for 1 wall Series : Classic Range\nWALL PANELING - MOCHA LADDER Supply and Installation of teakwood beading as per catalogue design on 1 wall + premium emulsion paint for the rest of the area on same wall - up to size 10\'x10\' *If the undulations in the wall is high, there might be visible gaps'
},
'DUA4005': {
  price: '104900',
  content: 'I.CEILING TWO COAT BUDGET ELMUSIONS',
  description: 'CEILING TOUCH UP PUTTY AND TWO COAT BUDGET ELMUSIONS BRANDS JSW ELEGANT/BIRLA OPUS I30/ASIAN TRACTOR ; WALKS PRIMER PLUS TWO COTAS PREMIUM ELMUSIONS ; WALKS TOUCH UP PUTTY ONE COAT PRIMERS PLUS TWO COTAS PREMIUM ELMUSIONS BRANDS JSW REGAL/BIRLA OPUS I30/ASIAN PREMIUM ELMUSIONS ; II.1 WAL PANELING CUBANO'
},
'DUC2001': {
  price: '51500',
  content: 'I.CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\nII.RE-POLISHING OF 1 MAIN DOOR AND RE-PAINTING OF 1 BALCONY GRILL',
  description: 'CEILING :\n Touch up Putty +  Two Coats  Budget Emulsion\n Brands :   JSW - Elegant /  Birla Opus - I30 / Asian - Tractor\n WALLS: \nTouch up Putty + One Coat  Primer + Two Coats Premium Emulsion\n Brands :  JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion;\n RE-POLISHING OF DOOR:\n Staining, colour matching and finishing with melamine internal grade top coat (Semi-gloss)\nRE-PAINTING OF GRILL:\n Primer + 2 coats of enamel satin finish paint'
},
'DUC2002': {
  price: '59200',
  content: 'I.CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\nII.1 WALL TEXTURE - CLASSIC RANGE UP TO 100SFT',
  description: 'CEILING :\nTouch up Putty +  Two Coats  Budget Emulsion\nBrands :   JSW - Elegant /  Birla Opus - I30 / Asian - Tractor\n WALLS:\nTouch up Putty + One Coat  Primer + Two Coats Premium Emulsion\nBrands :  JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion;\nTEXTURE PAINT:\nApplication of classic range of texture, make Asian Paints\nSeries : Archi Concrete series, Opaco matt, Stucco, Dune Drizzle, Lithos Series'
},
'DUC2003': {
  price: '51200',
  content: 'I.CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\nII.1 WALL WALLPAPER - CLASSIC RANGE',
  description: 'CEILING :\nTouch up Putty +  Two Coats  Budget Emulsion\nBrands :   JSW - Elegant /  Birla Opus - I30 / Asian - Tractor\n WALLS:\nTouch up Putty + One Coat  Primer + Two Coats Premium Emulsion\nBrands :  JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion;\nWallpaper:\nSupply and Installation of Wallpaper for 1 Wall\nSeries:Classic Range'
},
'DUC3001': {
  price: '65800',
  content: 'I.CEILING : 2 COATS OF BUDGET EMULSION',
  description: 'CEILING : Touch up Putty + Two Coats Budget Emulsion Brands: JSW-Elegant/Birla Opus-I30/Asian-Tractor; WALLS: PRIMER+2 COATS PREMIUM EMULSION; WALLS: Touch up Putty+One Coat Primer+Two Coats Premium Emulsion Brands: JSW-Regal/Birla Opus-I30/Asian-Premium Emulsion; II.RE-POLISHING:1 MAIND DOOR AND RE-PAINTING OF ONE BALCONY GRILL; RE-POLISHING OF DOOR: Staining,color matching and finishing with melamine internal grade top coat (Semi-gloss) RE-PAINTING OF GRILL: Primer+2 coats of enamel satin finish paint'
},
'DUC3002': {
  price: '73400',
  content: 'I.CEILING : 2 COATS OF BUDGET EMULSION',
  description: 'CEILING : Touch up Putty + Two Coats Budget Emulsion Brands: JSW-Elegant/Birla Opus-I30/Asian-Tractor; WALLS: PRIMER+2 COATS PREMIUM EMULSION; WALLS: Touch up Putty+One Coat Primer+Two Coats Premium Emulsion Brands: JSW-Regal/Birla Opus-I30/Asian-Premium Emulsion; II.1 WALL TEXTURE-CLASSIC RANGE; TEXTURE PAINT: Application of classic range of texture, make Asian Paints Series: Archi Concrete series,Opaco matt,Stucco,Dune Drizzle,Lithos Series'
},
'DUC3003': {
  price: '65400',
  content: 'I.CEILING : 2 COATS OF BUDGET EMULSION',
  description: 'CEILING : Touch up Putty + Two Coats Budget Emulsion Brands: JSW-Elegant/Birla Opus-I30/Asian-Tractor; WALLS: PRIMER+2 COATS PREMIUM EMULSION; WALLS: Touch up Putty+One Coat Primer+Two Coats Premium Emulsion Brands: JSW-Regal/Birla Opus-I30/Asian-Premium Emulsion; II.1 WALL WALLPAPER-CLASSIC RANGE; WALLPAPER: Supply and Installation of Wallpaper for one wall Series: Classic Range'
},
'QAC2001':{
  price:'83500',
  content:'I.CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\nII.RE-POLISHING : 1 MAIND DOOR AND RE-PAINTING OF 1 BALCONYGRILL\nIII.1 WALL TEXTURE - CLASSIC RANGE\nIV.1 WALL WALLPAPER - CLASSIC RANGE',
  description:'CEILING :\nTouch up Putty +  Two Coats  Budget Emulsion\nBrands :   JSW - Elegant /  Birla Opus - I30 / Asian - Tractor\nWALLS:Touch up Putty + One Coat  Primer + Two Coats Premium Emulsion\nBrands :  JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\nRE-POLISHING OF DOOR:\nStaining, colour matching and finishing with melamine internal grade top coat (Semi-gloss)\nRE-PAINTING OF GRILL:\nPrimer + 2 coats of enamel satin finish paint\nTEXTURE PAINT:\nApplication of classic range of texture, make Asian Paints\nSeries : Archi Concrete series, Opaco matt, Stucco, Dune Drizzle, Lithos Series\nWALLPAPER:Supply and Installation of Wallpaper for 1 wall\nSeries : Classic Range'
},
'QAC2002':{
  price:'95000',
  content:'I.CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\nII.RE-POLISHING : 1 MAIND DOOR AND RE-PAINTING OF 1 BALCONYGRILL\nIII.1 WALL TEXTURE - CLASSIC RANGE\nIV.1 WALL PANELING - MOCHA LADDER',
  description:'CEILING :\nTouch up Putty +  Two Coats  Budget Emulsion\nBrands :   JSW - Elegant /  Birla Opus - I30 / Asian - Tractor\nWALLS:Touch up Putty + One Coat  Primer + Two Coats Premium Emulsion\nBrands :  JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\nRE-POLISHING OF DOOR:\nStaining, colour matching and finishing with melamine internal grade top coat (Semi-gloss)\nRE-PAINTING OF GRILL:\nPrimer + 2 coats of enamel satin finish paint\nWALLPAPER:Supply and Installation of Wallpaper for 1 wall\nSeries : Classic Range\nWALL PANELING - MOCHA LADDER Supply and Installation of teakwood beading as per catalogue design on 1 wall + premium emulsion paint for the rest of the area on same wall - up to size 10\'x10\' *If the undulations in the wall is high, there might be visible gaps'
},
'QAP2003':{
  price:'102700',
  content:'I.CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\nII.RE-POLISHING : 1 MAIND DOOR AND RE-PAINTING OF 1 BALCONYGRILL\nIII.1 WALL TEXTURE - CLASSIC RANGE\nIV.1 WALL PANELING - MOCHA LADDER',
  description:'CEILING :\nTouch up Putty +  Two Coats  Budget Emulsion\nBrands :   JSW - Elegant /  Birla Opus - I30 / Asian - Tractor\nWALLS:Touch up Putty + One Coat  Primer + Two Coats Premium Emulsion\nBrands :  JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\nTEXTURE PAINT:\nApplication of classic range of texture, make Asian Paints\nSeries : Archi Concrete series, Opaco matt, Stucco, Dune Drizzle, Lithos Series\nWALLPAPER:Supply and Installation of Wallpaper for 1 wall\nSeries : Classic Range\nWALL PANELING - MOCHA LADDER Supply and Installation of teakwood beading as per catalogue design on 1 wall + premium emulsion paint for the rest of the area on same wall - up to size 10\'x10\' *If the undulations in the wall is high, there might be visible gaps'
},
'QAA2004':{
  price:'112000',
  content:'I.CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\nII.RE-POLISHING : 1 MAIND DOOR AND RE-PAINTING OF 1 BALCONYGRILL\nIII.1 WALL TEXTURE - CLASSIC RANGE\nIV.1 WALL PANELING - CUBANO',
  description:'CEILING :\nTouch up Putty +  Two Coats  Budget Emulsion\nBrands :   JSW - Elegant /  Birla Opus - I30 / Asian - Tractor\nWALLS:Touch up Putty + One Coat  Primer + Two Coats Premium Emulsion\nBrands :  JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\nTEXTURE PAINT:\nApplication of classic range of texture, make Asian Paints\nSeries : Archi Concrete series, Opaco matt, Stucco, Dune Drizzle, Lithos Series\nWALLPAPER:Supply and Installation of Wallpaper for 1 wall\nSeries : Classic Range\nWALL PANELING - CUBANO\nSupply and Installation of 2 designer panels as per selection on 1 wall + premium emulsion paint for the rest of the area on same wall - up to size 10x10\n*Including plywood backing'
},
'QAC3001':{
  price:'97800',
  content:'I.CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\nII.RE-POLISHING : 1 MAIND DOOR AND RE-PAINTING OF 1 BALCONYGRILL\nIII.1 WALL TEXTURE - CLASSIC RANGE\nIV.1 WALL WALLPAPER - CLASSIC RANGE',
  description:'CEILING :\nTouch up Putty +  Two Coats  Budget Emulsion\nBrands :   JSW - Elegant /  Birla Opus - I30 / Asian - Tractor\nWALLS:Touch up Putty + One Coat  Primer + Two Coats Premium Emulsion\nBrands :  JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\nRE-POLISHING OF DOOR:\nStaining, colour matching and finishing with melamine internal grade top coat (Semi-gloss)\nRE-PAINTING OF GRILL:\nPrimer + 2 coats of enamel satin finish paint\nTEXTURE PAINT:\nApplication of classic range of texture, make Asian Paints\nSeries : Archi Concrete series, Opaco matt, Stucco, Dune Drizzle, Lithos Series\nWALLPAPER:Supply and Installation of Wallpaper for 1 wall\nSeries : Classic Range'
},
'QAP3002':{
  price:'109300',
  content:'I.CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\nII.RE-POLISHING : 1 MAIND DOOR AND RE-PAINTING OF 1 BALCONYGRILL\nIII.1 WALL TEXTURE - CLASSIC RANGE\nIV.1 WALL PANELING - MOCHA LADDER',
  description:'CEILING :\nTouch up Putty +  Two Coats  Budget Emulsion\nBrands :   JSW - Elegant /  Birla Opus - I30 / Asian - Tractor\nWALLS:Touch up Putty + One Coat  Primer + Two Coats Premium Emulsion\nBrands :  JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\nRE-POLISHING OF DOOR:\nStaining, colour matching and finishing with melamine internal grade top coat (Semi-gloss)\nRE-PAINTING OF GRILL:\nPrimer + 2 coats of enamel satin finish paint\nWALLPAPER:Supply and Installation of Wallpaper for 1 wall\nSeries : Classic Range\nWALL PANELING - MOCHA LADDER Supply and Installation of teakwood beading as per catalogue design on 1 wall + premium emulsion paint for the rest of the area on same wall - up to size 10\'x10\' *If the undulations in the wall is high, there might be visible gaps'
},
'QAP3003':{
  price:'116900',
  content:'I.CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\nII.RE-POLISHING : 1 MAIND DOOR AND RE-PAINTING OF 1 BALCONYGRILL\nIII.1 WALL TEXTURE - CLASSIC RANGE\nIV.1 WALL PANELING - MOCHA LADDER',
  description:'CEILING :\nTouch up Putty +  Two Coats  Budget Emulsion\nBrands :   JSW - Elegant /  Birla Opus - I30 / Asian - Tractor\nWALLS:Touch up Putty + One Coat  Primer + Two Coats Premium Emulsion\nBrands :  JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\nTEXTURE PAINT:\nApplication of classic range of texture, make Asian Paints\nSeries : Archi Concrete series, Opaco matt, Stucco, Dune Drizzle, Lithos Series\nWALLPAPER:Supply and Installation of Wallpaper for 1 wall\nSeries : Classic Range\nWALL PANELING - MOCHA LADDER Supply and Installation of teakwood beading as per catalogue design on 1 wall + premium emulsion paint for the rest of the area on same wall - up to size 10\'x10\' *If the undulations in the wall is high, there might be visible gaps'
},
'QAA3004':{
  price:'126200',
  content:'I.CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\nII.RE-POLISHING : 1 MAIND DOOR AND RE-PAINTING OF 1 BALCONYGRILL\nIII.1 WALL TEXTURE - CLASSIC RANGE\nIV.1 WALL PANELING - CUBANO',
  description:'CEILING :\nTouch up Putty +  Two Coats  Budget Emulsion\nBrands :   JSW - Elegant /  Birla Opus - I30 / Asian - Tractor\nWALLS:Touch up Putty + One Coat  Primer + Two Coats Premium Emulsion\nBrands :  JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\nTEXTURE PAINT:\nApplication of classic range of texture, make Asian Paints\nSeries : Archi Concrete series, Opaco matt, Stucco, Dune Drizzle, Lithos Series\nWALLPAPER:Supply and Installation of Wallpaper for 1 wall\nSeries : Classic Range\nWALL PANELING - CUBANO\nSupply and Installation of 2 designer panels as per selection on 1 wall + premium emulsion paint for the rest of the area on same wall - up to size 10x10\n*Including plywood backing'
},
'QAC4001':{
  price:'108400',
  content:'I.CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\nII.RE-POLISHING : 1 MAIND DOOR AND RE-PAINTING OF 1 BALCONYGRILL\nIII.1 WALL TEXTURE - CLASSIC RANGE\nIV.1 WALL WALLPAPER - CLASSIC RANGE',
  description:'CEILING :\nTouch up Putty +  Two Coats  Budget Emulsion\nBrands :   JSW - Elegant /  Birla Opus - I30 / Asian - Tractor\nWALLS:Touch up Putty + One Coat  Primer + Two Coats Premium Emulsion\nBrands :  JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\nRE-POLISHING OF DOOR:\nStaining, colour matching and finishing with melamine internal grade top coat (Semi-gloss)\nRE-PAINTING OF GRILL:\nPrimer + 2 coats of enamel satin finish paint\nTEXTURE PAINT:\nApplication of classic range of texture, make Asian Paints\nSeries : Archi Concrete series, Opaco matt, Stucco, Dune Drizzle, Lithos Series\nWALLPAPER:Supply and Installation of Wallpaper for 1 wall\nSeries : Classic Range'
},
'QAC4002':{
  price:'120000',
  content:'I.CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\nII.RE-POLISHING : 1 MAIND DOOR AND RE-PAINTING OF 1 BALCONYGRILL\nIII.1 WALL TEXTURE - CLASSIC RANGE\nIV.1 WALL PANELING - MOCHA LADDER',
  description:'CEILING :\nTouch up Putty +  Two Coats  Budget Emulsion\nBrands :   JSW - Elegant /  Birla Opus - I30 / Asian - Tractor\nWALLS:Touch up Putty + One Coat  Primer + Two Coats Premium Emulsion\nBrands :  JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\nRE-POLISHING OF DOOR:\nStaining, colour matching and finishing with melamine internal grade top coat (Semi-gloss)\nRE-PAINTING OF GRILL:\nPrimer + 2 coats of enamel satin finish paint\nWALLPAPER:Supply and Installation of Wallpaper for 1 wall\nSeries : Classic Range\nWALL PANELING - MOCHA LADDER Supply and Installation of teakwood beading as per catalogue design on 1 wall + premium emulsion paint for the rest of the area on same wall - up to size 10\'x10\' *If the undulations in the wall is high, there might be visible gaps'
},
'QAP4003':{
  price:'116900',
  content:'I.CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\nII.RE-POLISHING : 1 MAIND DOOR AND RE-PAINTING OF 1 BALCONYGRILL\nIII.1 WALL TEXTURE - CLASSIC RANGE\nIV.1 WALL PANELING - MOCHA LADDER',
  description:'CEILING :\nTouch up Putty +  Two Coats  Budget Emulsion\nBrands :   JSW - Elegant /  Birla Opus - I30 / Asian - Tractor\nWALLS:Touch up Putty + One Coat  Primer + Two Coats Premium Emulsion\nBrands :  JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\nTEXTURE PAINT:\nApplication of classic range of texture, make Asian Paints\nSeries : Archi Concrete series, Opaco matt, Stucco, Dune Drizzle, Lithos Series\nWALLPAPER:Supply and Installation of Wallpaper for 1 wall\nSeries : Classic Range\nWALL PANELING - MOCHA LADDER Supply and Installation of teakwood beading as per catalogue design on 1 wall + premium emulsion paint for the rest of the area on same wall - up to size 10\'x10\' *If the undulations in the wall is high, there might be visible gaps'
},
'QAA4004':{
  price:'136900',
  content:'I.CEILING : 2 COATS OF BUDGET EMULSION\nWALLS : PRIMER + 2 COATS PREMIUM EMULSION\nII.RE-POLISHING : 1 MAIND DOOR AND RE-PAINTING OF 1 BALCONYGRILL\nIII.1 WALL TEXTURE - CLASSIC RANGE\nIV.1 WALL PANELING - CUBANO',
  description:'CEILING :\nTouch up Putty +  Two Coats  Budget Emulsion\nBrands :   JSW - Elegant /  Birla Opus - I30 / Asian - Tractor\nWALLS:Touch up Putty + One Coat  Primer + Two Coats Premium Emulsion\nBrands :  JSW - Regal / Birla Opus - I30 / Asian - Premium Emulsion\nTEXTURE PAINT:\nApplication of classic range of texture, make Asian Paints\nSeries : Archi Concrete series, Opaco matt, Stucco, Dune Drizzle, Lithos Series\nWALLPAPER:Supply and Installation of Wallpaper for 1 wall\nSeries : Classic Range\nWALL PANELING - CUBANO\nSupply and Installation of 2 designer panels as per selection on 1 wall + premium emulsion paint for the rest of the area on same wall - up to size 10x10\n*Including plywood backing'
},
  };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private packageProvider: PackageProvider,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.PackageForm = this.fb.group({
      package: this.fb.array([])
    });

    this.addPackage();
    this.extractCustomerId();

    this.PackageForm.valueChanges.subscribe(() => {
      this.formModified.emit();
    });
  }

  get package(): FormArray {
    return this.PackageForm.get('package') as FormArray;
  }

  private extractCustomerId() {
    this.route.paramMap.subscribe(params => {
      const customerIdParam = params.get('customerId');
      if (customerIdParam) {
        this.customerId = parseInt(customerIdParam, 10);
      }
      
      if (this.currentpackage && this.currentpackage.customerId) {
        this.customerId = this.currentpackage.customerId;
      }
    });
  }

  createPackage(): FormGroup {
    const packageGroup = this.fb.group({
      packageType: ['', Validators.required],
      productCode: [''],
      type: ['', Validators.required],
      selectCode: ['', Validators.required],
      description: [''],
      content: [''],
      price: [''],
      remarks: [''],
      sectionTotalPretax: [''],
      sectionTotalPosttax: ['']
    });

    // Handle furniture type changes
    packageGroup.get('packageType')?.valueChanges.subscribe(packageType => {
      if (packageType) {
        const prefix = packageType.substring(0, 2).toUpperCase();
        packageGroup.patchValue({
          productCode: prefix
        }, { emitEvent: false });
      }
    });

    // Handle type changes
    packageGroup.get('type')?.valueChanges.subscribe(type => {
      const packageType = packageGroup.get('packageType')?.value;
      if (packageType && type) {
        const prefix = packageType.substring(0, 2).toUpperCase();
        const typeSuffix = type.substring(0, 1).toUpperCase();
        packageGroup.patchValue({
          productCode: `${prefix}${typeSuffix}`
        }, { emitEvent: false });
      }
    });

    // Handle code changes
    packageGroup.get('selectCode')?.valueChanges.subscribe(code => {
      const packageType = packageGroup.get('packageType')?.value;
      const type = packageGroup.get('type')?.value;
      if (packageType && type && code) {
        const prefix = packageType.substring(0, 2).toUpperCase();
        const typeSuffix = type.substring(0, 1).toUpperCase();
        const fullCode = `${prefix}${typeSuffix}${code}`;
        
        packageGroup.patchValue({
          productCode: fullCode
        }, { emitEvent: true });

        // Check if data exists for this product code
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

  confirmPackage() {
    this.PackageForm.markAllAsTouched();
  
    if (!this.PackageForm.valid) {
      return;
    }
  
    const invalidPackages = this.package.controls.filter(packageControl => {
      const preTaxValue = parseFloat(packageControl.get('sectionTotalPretax')?.value || '0');
      return preTaxValue > 50000;
    });
    if (invalidPackages.length > 0) {
      alert('Section total pre-tax value should not exceed 50,000 for any package');
      return;
    }
  
    const packagesToSubmit: Package[] = this.package.controls.map(packageControl => {
      const currentPackage = new Package();
      
      this.customerId = this.customerId;
  
      currentPackage.packageType = packageControl.get('packageType')?.value;
      currentPackage.productCode = packageControl.get('productCode')?.value;
      currentPackage.type = packageControl.get('type')?.value;
      currentPackage.amount = packageControl.get('price')?.value;
      currentPackage.remarks = packageControl.get('remarks')?.value;
      currentPackage.specification = packageControl.get('description')?.value;
      currentPackage.condition = packageControl.get('content')?.value;
      currentPackage.sectionTotalPreTax = packageControl.get('sectionTotalPretax')?.value;
      currentPackage.sectionTotalPostTax = packageControl.get('sectionTotalPosttax')?.value;
  
      return currentPackage;
    });
  
    try {
      if (packagesToSubmit.some(pkg => pkg.packageId)) {
        packagesToSubmit.forEach(pkg => {
          if (pkg.packageId) {
            this.packageProvider.updatePackage(pkg);
          }
        });
      } else {
        this.packageProvider.addPackage(packagesToSubmit);
      }
    } catch (error) {
      console.error('Package submission failed:', error);
      alert('Failed to submit packages. Please try again.');
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