import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SendQuoteDialogComponentComponent } from '../send-quote-dialog-component/send-quote-dialog-component.component';
import { ActivatedRoute } from '@angular/router';
import { QuotationService } from 'src/app/Shared/Service/quotation.service';
import { ToastrService } from 'ngx-toastr';
import { SummaryProvider } from 'src/app/Shared/Provider/SummaryProvider';
import { Summary } from 'src/app/Shared/models/summary';
import jsPDF from 'jspdf';
interface PackageItem {
  id: number;
  name: string;
  section: string;
  total: number;
  discount?: number;
  actualPrice?: number;
  discountError?: boolean;
  isDisabled?: boolean; 
}
interface PaymentTerm {
  stage: string;
  amount: number;
  note: string;
}
interface SummaryItem {
  label: string;
  value: number;
  isBold?: boolean;
}
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  summaryDiscount: number = 0;
  sections: any[] = [];
  customerId: number | null = null;
  userId: number | null = null;
  selectedDate: Date | null = null;
  summaryData: Summary | null = null;
  totalCalculated: number = 0;
  packageItems: PackageItem[] = [];
  additionalItems: PackageItem[] = [];
  today = new Date().toISOString().slice(0, 10); 
  summaryDiscountError: boolean = false;
  discountErrorMessage: string = 'Discount cannot exceed 10%';
  showColumn: { [columnName: string]: boolean } = {
    discount: false,
  };
  showRow: { [rowName: string]: boolean } = {
    SummaryDiscount: false,
    SummaryToVendor: false,
  };
  discount: number = 0;
  toVendorInput: number = 0;
  customerDetails = {
    custId:'',
    name: '',
    address: '',
    city: '',
    email: '',
    phoneNumber: '',
    projectName:'',
  };
  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private quotationService: QuotationService,
    private toaster: ToastrService,
    private summaryProvider: SummaryProvider
  ) {}
  ngOnInit() {
    const userIdStr = localStorage.getItem('UserId');
    if (!userIdStr) {
      console.error('User ID not found in localStorage');
      this.toaster.error('User ID not found. Please log in again.');
      return;
    }
    this.userId = parseInt(userIdStr, 10);
    console.log('User ID from localStorage:', this.userId); 
    this.route.params.subscribe((params) => {
      this.customerId = params['customerId'] ? Number(params['customerId']) : null;
      console.log('Customer ID from route:', this.customerId); 
      if (this.userId && this.customerId) {
        console.log('Fetching data with:', { userId: this.userId, customerId: this.customerId }); 
        this.loadSummaryData();
      } else {
        console.error('Missing required IDs:', { userId: this.userId, customerId: this.customerId });
      }
    });
    this.quotationService.currentSections.subscribe((sections) => {
      this.sections = sections;
      this.calculatePaymentTerms();
    });
  }
  addToVendorAmount() {
    if (this.toVendorInput > 0 && this.userId && this.customerId) {
      this.summaryProvider.getSummaryDataById(
        this.userId, 
        this.customerId, 
        this.toVendorInput
      ).subscribe({
        next: (data: Summary[]) => {
          if (data && data.length > 0) {
            this.summaryData = data[0];
            this.updateTables();
          }
        },
        error: (error) => {
          console.error('Error adding ToVendor amount:', error);
          this.toaster.error('Failed to add ToVendor amount');
        }
      });
    }
  }
  private loadSummaryData() {
    if (!this.userId || !this.customerId) {
      console.error('Missing required IDs in loadSummaryData:', {
        userId: this.userId,
        customerId: this.customerId
      });
      return;
    }

    console.log('Calling API with:', { userId: this.userId, customerId: this.customerId });
    this.summaryProvider.getSummaryDataById(this.userId, this.customerId)
      .subscribe({
        next: (data: Summary[]) => {
          console.log('Raw API response:', data); 
          if (data && data.length > 0) {
            this.summaryData = data[0];
            console.log('Mapped summary data:', {
              overallTotal: this.summaryData.overallTotal,
              overallTotal_PreTax: this.summaryData.overallTotal_PreTax
            });
            this.updateTables();
          }
        },
        error: (error) => {
          console.error('Error fetching summary data:', error);
          this.toaster.error('Failed to load summary data');
        }
      });
  }
  openBooking(): void {
    const appointyUrl = 'https://booking.appointy.com/EspressoByVibgyor';
    window.open(appointyUrl, '_blank');
  }
  private updateTables() {
    if (!this.summaryData) return;
    this.packageItems = [
      {
        id: 1,
        name: 'Package',
        section: 'PKG',
        total: this.summaryData.packageTotal,
        actualPrice: this.summaryData.packageTotal * 1.25,
        discount: 0,
        isDisabled: false
      },
      {
        id: 2,
        name: 'Furniture',
        section: 'FUR',
        total: this.summaryData.furnitureTotal,
        actualPrice: this.summaryData.furnitureTotal * 1.25,
        discount: 0,
        isDisabled: false
      }
    ];
    this.additionalItems = [
      {
        id: 1,
        name: 'Internal Painting',
        section: 'INT',
        total: this.summaryData.internalPaintingTotal,
        actualPrice: this.summaryData.internalPaintingTotal * 1.25,
        discount: 0,
        isDisabled: false
      },
      {
        id: 2,
        name: 'Texture Painting',
        section: 'TEX',
        total: this.summaryData.texturePaintingTotal,
        actualPrice: this.summaryData.texturePaintingTotal * 1.25,
        discount: 0,
        isDisabled: false
      },
      {
        id: 3,
        name: 'Wallpaper',
        section: 'WAL',
        total: this.summaryData.wallpaperTotal,
        actualPrice: this.summaryData.wallpaperTotal * 1.25,
        discount: 0,
        isDisabled: false
      },
      {
        id:4,
        name:'Curtain',
        section:'CUR',
        total:this.summaryData.curtainsTotal,
        actualPrice: this.summaryData.curtainsTotal * 1.25,
        discount: 0,
        isDisabled: false
      },
      {
        id: 5,
        name: 'Paneling',
        section: 'PAN',
        total: this.summaryData.panelingTotal,
        actualPrice: this.summaryData.panelingTotal * 1.25,
        discount: 0,
        isDisabled: false
      },
      {
        id: 6,
        name:'Doors / Grills',
        section:'DG',
        total:this.summaryData.doorGrillTotal,
        actualPrice: this.summaryData.doorGrillTotal * 1.25,
        discount: 0,
        isDisabled: false
      }
    ];
    this.customerDetails = {
      custId:this.summaryData.enquiryId||'',
      name: this.summaryData.customerName || '',
      projectName:this.summaryData.projectName || '',
      address: this.summaryData.address || '',
      city: '',
      email: '',
      phoneNumber: ''
    };
    this.calculateTotals();
    this.verifyTotals();
  }
  private calculateTotals() {
    this.totalCalculated = this.additionalItems.reduce((sum, item) => sum + item.total, 0) +
                          this.packageItems.reduce((sum, item) => sum + item.total, 0);
  }
  get preTaxTotal(): number {
    return this.summaryData?.overallTotal_PreTax || 0;
  }

  get grandTotal(): number {
    return this.preTaxPostDiscount + this.gstAmount;
  }


  get discountValue(): number {
    if (!this.showRow['SummaryDiscount']) return 0;
    const discountableItems = [
      ...this.packageItems,
      ...this.additionalItems
    ];
    const totalIndividualDiscount = discountableItems.reduce((sum, item) => {
      return sum + (item.total * (item.discount || 0) / 100);
    }, 0);
    
    return totalIndividualDiscount;
  }
  get preTaxPostDiscount(): number {
    if (!this.showRow['SummaryDiscount'] || !this.summaryDiscount) {
      return this.preTaxTotal;
    }
    return this.preTaxTotal * (1 - (this.summaryDiscount / 100));
  }
  get gstAmount(): number {
    return this.preTaxPostDiscount * 0.18;
  }
  get orderConfirmationAmount(): number {
    return this.summaryData?.orderConfirmation || 0;
  }
  get designConfirmationAmount(): number {
    return this.summaryData?.designConfirmation || 0;
  }
  get projectStartAmount(): number {
    return this.summaryData?.projectHandover || 0;
  }
  get toVendorAmount(): number {
    return this.summaryData?.toVendorAmount || 0;
  }

  get overallTotalToVendor(): number {
    return this.summaryData?.overallTotalToVendor || this.grandTotal;
  }
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key.toLowerCase() === 'x' && event.shiftKey) {
      this.showColumn['discount'] = !this.showColumn['discount'];
      this.showRow['SummaryDiscount'] = false;
    } else if (event.key.toLowerCase() === 'y' && event.shiftKey) {
      this.showRow['SummaryDiscount'] = !this.showRow['SummaryDiscount'];
    } else if (event.key.toLowerCase() === 'v' && event.shiftKey) {
      this.showRow['SummaryToVendor'] = !this.showRow['SummaryToVendor'];
    }
  }
  onDateSelect(event: any): void {
    this.selectedDate = event.value;
    console.log('Selected Date:', this.selectedDate);
  }
  validateDiscount(item: PackageItem) {
    if (item.discount === undefined) {
      item.discount = 0;
    }
    if (item.discount > 10) {
      item.discountError = true;
      item.discount = 10;
      item.isDisabled = true; 
    } else {
      item.discountError = false;
      item.isDisabled = false;
    }
    this.calculateTotals();
  }
  validateSummaryDiscount(): void {
    if (this.summaryDiscount > 10) {
      this.summaryDiscountError = true;
      this.summaryDiscount = 10;
    } else {
      this.summaryDiscountError = false;
    }
  }
  openSendQuoteDialog() {
    const pdfBlob = this.exportToPDF();
  
    const dialogRef = this.dialog.open(SendQuoteDialogComponentComponent, {
      width: '500px',
      data: {
        customerEmail: this.customerDetails.email,
        customerPhone: this.customerDetails.phoneNumber,
        quotationFile: pdfBlob,
        quotationFileName: `Quotation_${this.customerDetails.name}_${this.today}.pdf` 
      },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Quote sent:', result);
      }
    });
  }
  private calculatePaymentTerms() {
    if (this.summaryData) {
      this.calculateTotals();
    }
  }
  private verifyTotals(): void {
    if (this.summaryData) {
      const calculatedPreTax = 
        (this.summaryData.packageTotal || 0) +
        (this.summaryData.curtainsTotal || 0) +
        (this.summaryData.furnitureTotal || 0) +
        (this.summaryData.internalPaintingTotal || 0) +
        (this.summaryData.texturePaintingTotal || 0) +
        (this.summaryData.wallpaperTotal || 0) +
        (this.summaryData.panelingTotal || 0) +
        (this.summaryData.doorGrillTotal || 0);

      console.log('Totals verification:', {
        calculatedPreTax,
        storedPreTax: this.summaryData.overallTotal_PreTax,
        difference: calculatedPreTax - (this.summaryData.overallTotal_PreTax || 0)
      });
    }
  }
  private exportToPDF(): Blob {
    const pdf = new jsPDF('l', 'mm', 'a4');
    let currentY = 0;
    const pageWidth = (pdf.internal as any).pageSize.width;
    const pageHeight = (pdf.internal as any).pageSize.height;
    const margins = { left: 15, right: 15, top: 20 };
    const availableWidth = pageWidth - margins.left - margins.right;
  
    // Format number function to remove superscript and decimal points
    const formatCurrency = (value: number): string => {
      // Round off the value to the nearest integer
      const roundedValue = Math.round(value);
  
      // Convert to string and split by decimal point if any
      const parts = roundedValue.toString().split('.');
      const number = parts[0];
  
      // Handle grouping manually
      const result = [];
      let count = 0;
  
      // Process from right to left
      for (let i = number.length - 1; i >= 0; i--) {
        if (count === 3 && i !== 0) {
          result.unshift(',');
          count = 0;
        }
        result.unshift(number[i]);
        count++;
      }
  
      return result.join('');
    };
  
    // Helper function for page breaks
    const checkForNewPage = (requiredSpace: number): boolean => {
      if (currentY + requiredSpace > pageHeight - 20) {
        pdf.addPage();
        currentY = margins.top;
        return true;
      }
      return false;
    };
  
    const wrapText = (text: string, maxWidth: number): string[] => {
      const words = text.split(' ');
      const lines: string[] = [];
      let currentLine = '';
  
      words.forEach(word => {
        const testLine = currentLine + (currentLine ? ' ' : '') + word;
        if (pdf.getStringUnitWidth(testLine) * pdf.getFontSize() / pdf.internal.scaleFactor > maxWidth) {
          if (currentLine) lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      });
      if (currentLine) lines.push(currentLine);
      return lines;
    };
  
    // Calculate dynamic column widths based on visible columns
    const getColumnWidths = () => {
      let columns = [
        { header: 'SI NO', minWidth: 20, weight: 1 },
        { header: 'Section Name', minWidth: 50, weight: 3 },
        { header: 'Section ID', minWidth: 30, weight: 2 },
        { header: 'Actual Price', minWidth: 35, weight: 2 },
        { header: 'Discounted Price', minWidth: 35, weight: 2 }
      ];
  
      if (this.showColumn['discount']) {
        columns.push(
          { header: 'Discount (%)', minWidth: 30, weight: 1.5 },
          { header: 'Total After Discount', minWidth: 40, weight: 2.5 }
        );
      }
  
      // Calculate total weight
      const totalWeight = columns.reduce((sum, col) => sum + col.weight, 0);
  
      // Calculate width per weight unit
      const widthPerUnit = availableWidth / totalWeight;
  
      // Calculate actual widths while respecting minimum widths
      return columns.map(col => {
        const calculatedWidth = col.weight * widthPerUnit;
        return Math.max(col.minWidth, calculatedWidth);
      });
    };
  
    // Header Section
    pdf.setFillColor(181, 172, 156);
    pdf.rect(0, 0, pageWidth, 40, 'F');
    pdf.setFillColor(255, 255, 255, 0.1);
    pdf.rect(0, 30, pageWidth, 2, 'F');
  
    pdf.setTextColor(255, 255, 255);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(32);
    pdf.text('Espresso', margins.left, 25);
    pdf.setFontSize(14);
    pdf.text('QUOTATION', margins.left, 38);
  
    // Quote Details
    const quoteDate = this.selectedDate ? this.selectedDate.toLocaleDateString() : new Date().toLocaleDateString();
    const quoteNumber = `QT-${Math.floor(Math.random() * 10000)}`;
    pdf.setFontSize(10);
    pdf.text(`Date: ${quoteDate}  |  Quote #: ${quoteNumber}`, pageWidth - 60, 25);
  
    // Customer Information Section
    currentY = 50;
    const customerInfoWidth = pageWidth - (margins.left + margins.right);
    pdf.setDrawColor(240, 240, 240);
    pdf.setFillColor(250, 250, 250);
    pdf.setLineWidth(0.5);
    pdf.roundedRect(margins.left, currentY, customerInfoWidth, 60, 4, 4, 'FD');
  
    pdf.setFillColor(181, 172, 156);
    pdf.rect(margins.left, currentY, 5, 60, 'F');
  
    pdf.setTextColor(60, 60, 60);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.text('Customer Information', margins.left + 10, currentY + 13);
  
    // Customer Details
    const customerDetails = [
      ['CustId', this.customerDetails?.custId || ''],
      ['Contact Person', this.customerDetails?.name || ''],
      ['Project Name', this.customerDetails?.projectName || ''],
      ['Address', this.customerDetails?.address || ''],
      ['Phone', this.customerDetails?.phoneNumber || '']
    ];
  
    let leftColY = currentY + 25;
    let rightColY = currentY + 25;
    const colWidth = (customerInfoWidth - 40) / 2;
    customerDetails.forEach((detail, index) => {
      const xPos = index % 2 === 0 ? margins.left + 10 : margins.left + (customerInfoWidth / 2) + 10;
      const yPos = index % 2 === 0 ? leftColY : rightColY;
  
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(120, 120, 120);
      pdf.text(detail[0] + ':', xPos, yPos);
  
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(60, 60, 60);
  
      // Special handling for address field
      if (detail[0] === 'Address') {
        const lines = wrapText(detail[1], colWidth - 10);
        lines.forEach((line, lineIndex) => {
          pdf.text(line, xPos, yPos + 7 + (lineIndex * 5));
        });
      } else {
        pdf.text(detail[1], xPos, yPos + 7);
      }
  
      if (index % 2 === 1) {
        leftColY += 20;
        rightColY += 20;
      }
    });
  
    // Package & Furniture Section
    currentY = 120;
  
    // Section header
    pdf.setFillColor(181, 172, 156); // #b5ac9c
    pdf.rect(margins.left, currentY, customerInfoWidth, 10, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Package & Furniture', margins.left + 5, currentY + 7);
    currentY += 15;
  
    // Get dynamic column widths
    const columnWidths = getColumnWidths();
    const headers = ['SI NO', 'Section Name', 'Section ID', 'Actual Price', 'Discounted Price'];
    if (this.showColumn['discount']) {
      headers.push('Discount (%)', 'Total After Discount');
    }
  
    // Draw table headers
    let xPos = margins.left;
    pdf.setFillColor(240, 240, 240);
    pdf.rect(margins.left, currentY - 5, customerInfoWidth, 10, 'F');
  
    headers.forEach((header, index) => {
      pdf.setTextColor(60, 60, 60);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
  
      // Center align the header text
      const textWidth = pdf.getStringUnitWidth(header) * pdf.getFontSize() / pdf.internal.scaleFactor;
      const centerX = xPos + (columnWidths[index] - textWidth) / 2;
  
      pdf.text(header, centerX, currentY);
      xPos += columnWidths[index];
    });
  
    currentY += 10;
  
    // Draw table rows with dynamic widths
    const drawTableRow = (item: any) => {
      let xPos = margins.left;
      pdf.setFont('helvetica', 'normal');
  
      // SI NO
      pdf.text(item.id.toString(), xPos + 5, currentY);
      xPos += columnWidths[0];
  
      // Section Name
      pdf.text(item.name, xPos + 5, currentY);
      xPos += columnWidths[1];
  
      // Section ID
      pdf.text(item.section, xPos + 5, currentY);
      xPos += columnWidths[2];
  
      // Actual Price
      const actualPrice = formatCurrency(item.total * 1.25);
      const actualPriceX = xPos + columnWidths[3] - 
        pdf.getStringUnitWidth(actualPrice) * pdf.getFontSize() / pdf.internal.scaleFactor - 5;
      pdf.text(actualPrice, actualPriceX, currentY);
      xPos += columnWidths[3];
  
      // Discounted Price
      const discountedPrice = formatCurrency(item.total);
      const discountedPriceX = xPos + columnWidths[4] - 
        pdf.getStringUnitWidth(discountedPrice) * pdf.getFontSize() / pdf.internal.scaleFactor - 5;
      pdf.text(discountedPrice, discountedPriceX, currentY);
      xPos += columnWidths[4];
  
      if (this.showColumn['discount']) {
        // Discount
        const discountText = `${item.discount || 0}%`;
        const discountX = xPos + columnWidths[5] - 
          pdf.getStringUnitWidth(discountText) * pdf.getFontSize() / pdf.internal.scaleFactor - 5;
        pdf.text(discountText, discountX, currentY);
        xPos += columnWidths[5];
  
        // Total After Discount
        const afterDiscount = formatCurrency(item.total * (1 - (item.discount || 0) / 100));
        const afterDiscountX = xPos + columnWidths[6] - 
          pdf.getStringUnitWidth(afterDiscount) * pdf.getFontSize() / pdf.internal.scaleFactor - 5;
        pdf.text(afterDiscount, afterDiscountX, currentY);
      }
  
      // Draw row border
      pdf.setDrawColor(220, 220, 220);
      pdf.line(margins.left, currentY + 2, margins.left + customerInfoWidth, currentY + 2);
  
      currentY += 8;
    };
  
    // Draw Package Items
    if (this.packageItems) {
      this.packageItems.forEach(item => {
        if (checkForNewPage(10)) {
          // Redraw headers on new page
          xPos = margins.left;
          pdf.setFillColor(240, 240, 240);
          pdf.rect(margins.left, currentY - 5, customerInfoWidth, 10, 'F');
  
          headers.forEach((header, index) => {
            pdf.setTextColor(60, 60, 60);
            pdf.setFont('helvetica', 'bold');
            const textWidth = pdf.getStringUnitWidth(header) * pdf.getFontSize() / pdf.internal.scaleFactor;
            const centerX = xPos + (columnWidths[index] - textWidth) / 2;
            pdf.text(header, centerX, currentY);
            xPos += columnWidths[index];
          });
          currentY += 10;
        }
        drawTableRow(item);
      });
    }
  
    // Custom Options Section
    currentY += 10;
    if (checkForNewPage(45)) {
      currentY += 10;
    }
  
    pdf.setFillColor(181, 172, 156); // #b5ac9c
    pdf.rect(margins.left, currentY, customerInfoWidth, 10, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Custom Options', margins.left + 5, currentY + 7);
    currentY += 15;
  
    // Draw Custom Options headers
    xPos = margins.left;
    pdf.setFillColor(240, 240, 240);
    pdf.rect(margins.left, currentY - 5, customerInfoWidth, 10, 'F');
  
    headers.forEach((header, index) => {
      pdf.setTextColor(60, 60, 60);
      pdf.setFont('helvetica', 'bold');
      const textWidth = pdf.getStringUnitWidth(header) * pdf.getFontSize() / pdf.internal.scaleFactor;
      const centerX = xPos + (columnWidths[index] - textWidth) / 2;
      pdf.text(header, centerX, currentY);
      xPos += columnWidths[index];
    });
  
    currentY += 10;
  
    // Draw Custom Options items
    if (this.additionalItems) {
      this.additionalItems.forEach(item => {
        if (checkForNewPage(10)) {
          // Redraw headers on new page
          xPos = margins.left;
          pdf.setFillColor(240, 240, 240);
          pdf.rect(margins.left, currentY - 5, customerInfoWidth, 10, 'F');
  
          headers.forEach((header, index) => {
            pdf.setTextColor(60, 60, 60);
            pdf.setFont('helvetica', 'bold');
            const textWidth = pdf.getStringUnitWidth(header) * pdf.getFontSize() / pdf.internal.scaleFactor;
            const centerX = xPos + (columnWidths[index] - textWidth) / 2;
            pdf.text(header, centerX, currentY);
            xPos += columnWidths[index];
          });
          currentY += 10;
        }
        drawTableRow(item);
      });
    }
  
    currentY += 20;
    if (checkForNewPage(80)) { // Increased space check for two sections
      currentY += 10;
    }
  
    const summaryWidth = (customerInfoWidth - 10) / 2;
  
    currentY += 20;
    if (checkForNewPage(120)) {
      currentY += 10;
    }
  
    // Create table header
    pdf.setFillColor(181, 172, 156);
    pdf.rect(margins.left, currentY, customerInfoWidth, 10, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Summary', margins.left + 5, currentY + 7);
  
    currentY += 15;
  
    const hasVendorData = this.showRow['SummaryToVendor'] && this.toVendorAmount > 0;
    const vibgyorWidth = hasVendorData ? summaryWidth : customerInfoWidth;
  
    // Table headers
    pdf.setFillColor(240, 240, 240);
    pdf.rect(margins.left, currentY, vibgyorWidth, 10, 'F');
    if (hasVendorData) {
      pdf.rect(margins.left + summaryWidth + 10, currentY, summaryWidth, 10, 'F');
    }
  
    pdf.setTextColor(60, 60, 60);
    pdf.setFont('helvetica', 'bold');
    pdf.text('To Vibgyor', margins.left + 5, currentY + 7);
    if (hasVendorData) {
      pdf.text('Direct To Vendor', margins.left + summaryWidth + 15, currentY + 7);
    }
  
    currentY += 15;
  
    let vibgyorY = currentY;
    let vendorY = currentY;
  
    // Summary items with new formatting
    const toVibgyorItems = [
      { label: 'Pre-tax Total', value: this.preTaxTotal }
    ];
  
    if (this.showRow['SummaryDiscount']) {
      toVibgyorItems.push(
        { label: 'Discount', value: this.discountValue },
        { label: 'Pre Tax (Post Discount)', value: this.preTaxPostDiscount }
      );
    }
  
    toVibgyorItems.push(
      { label: 'GST (18%)', value: this.gstAmount },
      { label: 'Grand Total', value: this.grandTotal }
    );
  
    const tableHeight = (toVibgyorItems.length * 10) + 10;
  
    // Draw table borders
    pdf.setDrawColor(200, 200, 200);
    pdf.rect(margins.left, currentY - 5, vibgyorWidth, tableHeight);
    if (hasVendorData) {
      pdf.rect(margins.left + summaryWidth + 10, currentY - 5, summaryWidth, tableHeight);
    }
  
    // Draw To Vibgyor Items
    toVibgyorItems.forEach((item, index) => {
      if (index % 2 === 0) {
        pdf.setFillColor(250, 250, 250);
        pdf.rect(margins.left, vibgyorY - 4, vibgyorWidth, 10, 'F');
      }
  
      pdf.setTextColor(60, 60, 60);
      pdf.setFont('helvetica', item.label === 'Grand Total' ? 'bold' : 'normal');
      pdf.text(item.label, margins.left + 5, vibgyorY + 4);
  
      // Format and position value
      const valueText = `₹ ${formatCurrency(item.value)}`;
      const valueWidth = pdf.getStringUnitWidth(valueText) * pdf.getFontSize() / pdf.internal.scaleFactor;
      const valueX = margins.left + vibgyorWidth - valueWidth - 5;
      pdf.text(valueText, valueX, vibgyorY + 4);
  
      vibgyorY += 10;
    });
  
    if (hasVendorData) {
      const toVendorItems = [
        { label: 'Amount', value: this.toVendorAmount }
      ];
  
      toVendorItems.forEach((item, index) => {
        if (index % 2 === 0) {
          pdf.setFillColor(250, 250, 250);
          pdf.rect(margins.left + summaryWidth + 10, vendorY - 4, summaryWidth, 10, 'F');
        }
  
        pdf.setTextColor(60, 60, 60);
        pdf.setFont('helvetica', item.label === 'Grand Total' ? 'bold' : 'normal');
        pdf.text(item.label, margins.left + summaryWidth + 15, vendorY + 4);
  
        const valueText = `₹ ${formatCurrency(item.value)}`;
        const valueWidth = pdf.getStringUnitWidth(valueText) * pdf.getFontSize() / pdf.internal.scaleFactor;
        const valueX = margins.left + summaryWidth + 10 + summaryWidth - valueWidth - 5;
        pdf.text(valueText, valueX, vendorY + 4);
  
        vendorY += 10;
      });
    }
  
    // Ensure payment terms start on the same page
    currentY += tableHeight + 20;
    if (currentY + 100 > pageHeight) { // Check if enough space for payment terms
      pdf.addPage();
      currentY = margins.top;
    }
  
    // Payment Terms Section
    pdf.setFillColor(181, 172, 156);
    pdf.rect(margins.left, currentY, customerInfoWidth, 10, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Payment Terms', margins.left + 5, currentY + 7);
    currentY += 20;
  
    const paymentTerms = [
      {
        stage: 'Order Confirmation',
        amount: this.orderConfirmationAmount,
        note: '(20% of total amount)'
      },
      {
        stage: 'Design Confirmation',
        amount: this.designConfirmationAmount,
        note: '(70% of total amount)'
      },
      {
        stage: '2 Days Before Project',
        amount: this.projectStartAmount,
        note: '(10% of total amount)'
      }
    ];
  
    paymentTerms.forEach((term) => {
      pdf.setTextColor(60, 60, 60);
      pdf.setFont('helvetica', 'normal');
  
      const maxWidth = 90;
      const words = term.stage.split(' ');
      let line = '';
      let yOffset = 0;
  
      words.forEach((word) => {
        const testLine = line + word + ' ';
        if (pdf.getStringUnitWidth(testLine) * pdf.getFontSize() / pdf.internal.scaleFactor > maxWidth) {
          pdf.text(line, margins.left + 5, currentY + yOffset);
          line = word + ' ';
          yOffset += 5;
        } else {
          line = testLine;
        }
      });
      pdf.text(line, margins.left + 5, currentY + yOffset);
  
      const amountText = `₹ ${formatCurrency(term.amount)}`;
      pdf.text(amountText, margins.left + 100, currentY + yOffset);
  
      pdf.setFontSize(8);
      pdf.text(term.note, margins.left + 100, currentY + yOffset + 4);
      pdf.setFontSize(10);
  
      currentY += yOffset + 15;
    });
    const imgData = '/assets/images/handover.jpg'; 
    const imgWidth = 265;
    const imgHeight = 70; 
    
    pdf.addImage(imgData, 'JPG', margins.left, currentY + 10, imgWidth, imgHeight);
    
    currentY += imgHeight + 20;
    
    return pdf.output('blob');
  }
}