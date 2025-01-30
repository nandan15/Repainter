import { Component, HostListener } from '@angular/core';
import jsPDF from 'jspdf';
import { MatDialog } from '@angular/material/dialog';
import { SendQuoteDialogComponentComponent } from '../send-quote-dialog-component/send-quote-dialog-component.component';

interface PackageItem {
  id: number;
  name: string;
  section: string;
  total: number;
}

interface CustomerDetails {
  name: string;
  company: string;
  address: string;
  city: string;
  email: string;
  phone: string;
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
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent {
  selectedDate: Date | null = null;
  showColumn: { [columnName: string]: boolean } = {
    discount: false,
  };
  showRow: { [rowName: string]: boolean } = {
    SummaryDiscount: false,
    SummaryToVendor: false
  };
  
  discount: number = 0;
  summaryDiscount: number = 0;

  // Package & Furniture Items
  packageItems: PackageItem[] = [
    { id: 1, name: 'Package', section: 'A', total: 5000 },
    { id: 2, name: 'Furniture', section: 'B', total: 3000 }
  ];

  // Additional Items
  additionalItems: PackageItem[] = [
    { id: 1, name: 'Internal Painting', section: 'C', total: 2000 },
    { id: 2, name: 'Door & Grills', section: 'D', total: 1500 }
  ];

  customerDetails: CustomerDetails = {
    name: "John Smith",
    company: "Espresso",
    address: "New Bel Road, Bengalore, Karnataka",
    city: "Bengaluru, Karnataka",
    email: "Smith.John@espresso.com",
    phone: "9898922323"
  };

  // Calculated properties
  get preTaxTotal(): number {
    return [...this.packageItems, ...this.additionalItems]
      .reduce((acc, curr) => acc + curr.total, 0);
  }

  get toVendorAmount(): number {
    return this.showRow['SummaryToVendor'] ? this.preTaxTotal * 0.1 : 0;
  }

  get discountValue(): number {
    return this.showRow['SummaryDiscount'] ? this.preTaxTotal * 0.08 : 0;
  }

  get preTaxPostDiscount(): number {
    return this.preTaxTotal - this.discountValue;
  }

  get gstAmount(): number {
    return this.preTaxPostDiscount * 0.18;
  }

  get grandTotal(): number {
    return this.preTaxPostDiscount + this.gstAmount;
  }

  // Payment Terms calculations
  get orderConfirmationAmount(): number {
    return this.grandTotal * 0.25; // 25% of total amount
  }

  get designConfirmationAmount(): number {
    const paintingAndGrillsTotal = this.additionalItems
      .filter(item => ['Internal Painting', 'Door & Grills'].includes(item.name))
      .reduce((acc, curr) => acc + curr.total, 0);
    
    const restTotal = this.preTaxTotal - paintingAndGrillsTotal;
    
    return (paintingAndGrillsTotal * 0.5) + (restTotal * 0.75);
  }

  get projectStartAmount(): number {
    const paintingAndGrillsTotal = this.additionalItems
      .filter(item => ['Internal Painting', 'Door & Grills'].includes(item.name))
      .reduce((acc, curr) => acc + curr.total, 0);
    
    return paintingAndGrillsTotal * 0.25;
  }

  constructor(private dialog: MatDialog) {}

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key.toLowerCase() === 'x' && event.shiftKey) {
      this.showColumn['discount'] = !this.showColumn['discount'];
      this.showRow['SummaryDiscount'] = false;
    }
    else if (event.key.toLowerCase() === 'y' && event.shiftKey) {
      this.showRow['SummaryDiscount'] = !this.showRow['SummaryDiscount'];
    }
    else if (event.key.toLowerCase() === 'v' && event.shiftKey) {
      this.showRow['SummaryToVendor'] = !this.showRow['SummaryToVendor'];
    }
  }

  onDateSelect(event: any): void {
    this.selectedDate = event.value;
    console.log('Selected Date:', this.selectedDate);
  }

  validateDiscount() {
    if (this.discount > 10) {
      this.discount = 10;
    }
  }

  openSendQuoteDialog() {
    const dialogRef = this.dialog.open(SendQuoteDialogComponentComponent, {
      width: '500px',
      data: {
        customerEmail: this.customerDetails.email,
        customerPhone: this.customerDetails.phone
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Quote sent:', result);
      }
    });
  }

  exportToPDF() {
    const pdf = new jsPDF('p', 'mm', 'a4');
    let currentY = 0;
    
    // Function to check if we need a new page
    const checkForNewPage = (requiredSpace: number): boolean => {
      if (currentY + requiredSpace > (pdf.internal as any).pageSize.height - 20) {
        pdf.addPage();
        currentY = 20; // Reset Y position on new page
        return true;
      }
      return false;
    };

    // Header Section
    pdf.setFillColor(117, 186, 157);
    pdf.rect(0, 0, 210, 60, 'F');
    pdf.setFillColor(255, 255, 255, 0.1);
    pdf.rect(0, 45, 210, 2, 'F');
    
    // Company Name and Quote Title
    pdf.setTextColor(255, 255, 255);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(32);
    pdf.text('Espresso', 20, 30);
    pdf.setFontSize(14);
    pdf.text('QUOTATION', 20, 45);
    
    // Quote Details
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const quoteDate = this.selectedDate ? this.selectedDate.toLocaleDateString() : new Date().toLocaleDateString();
    const quoteNumber = `QT-${Math.floor(Math.random() * 10000)}`;
    pdf.text(`Date: ${quoteDate}  |  Quote #: ${quoteNumber}`, 140, 45);

    currentY = 75;

    // Customer Information Card
    pdf.setDrawColor(240, 240, 240);
    pdf.setFillColor(250, 250, 250);
    pdf.setLineWidth(0.5);
    pdf.roundedRect(15, currentY, 180, 80, 4, 4, 'FD');
    pdf.setFillColor(117, 186, 157);
    pdf.rect(15, currentY, 5, 80, 'F');
    
    // Customer Details
    pdf.setTextColor(60, 60, 60);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.text('Customer Information', 25, currentY + 13);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    
    const customerDetails = [
      ['Company', this.customerDetails?.company || ''],
      ['Contact Person', this.customerDetails?.name || ''],
      ['Address', this.customerDetails?.address || ''],
      ['City', this.customerDetails?.city || ''],
      ['Email', this.customerDetails?.email || ''],
      ['Phone', this.customerDetails?.phone || '']
    ];

    let leftColY = currentY + 25;
    let rightColY = currentY + 25;
    customerDetails.forEach((detail, index) => {
      const xPos = index % 2 === 0 ? 25 : 105;
      const yPos = index % 2 === 0 ? leftColY : rightColY;
      
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(120, 120, 120);
      pdf.text(detail[0] + ':', xPos, yPos);
      
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(60, 60, 60);
      pdf.text(detail[1], xPos, yPos + 7);
      
      if (index % 2 === 1) {
        leftColY += 25;
        rightColY += 25;
      }
    });

    currentY = 170;

    // Package & Furniture Table
    pdf.setFillColor(117, 186, 157);
    pdf.rect(15, currentY, 180, 10, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Package & Furniture', 20, currentY + 7);
    
    currentY += 15;
    const packageHeaders = ['SI NO', 'Section Name', 'Section ID', 'Pre-Tax Total'];
    const packageColumnWidths = [20, 70, 40, 40];
    
    // Draw package table headers
    packageHeaders.forEach((header, index) => {
      let xPos = 15;
      for (let i = 0; i < index; i++) {
        xPos += packageColumnWidths[i];
      }
      pdf.setTextColor(60, 60, 60);
      pdf.text(header, xPos + 5, currentY);
    });

    // Draw package items
    currentY += 10;
    if (this.packageItems) {
      this.packageItems.forEach((item, index) => {
        checkForNewPage(15);
        let xPos = 15;
        pdf.setFont('helvetica', 'normal');
        pdf.text(item.id.toString(), xPos + 5, currentY);
        xPos += packageColumnWidths[0];
        pdf.text(item.name, xPos + 5, currentY);
        xPos += packageColumnWidths[1];
        pdf.text(item.section, xPos + 5, currentY);
        xPos += packageColumnWidths[2];
        pdf.text(item.total.toLocaleString('en-IN', { minimumFractionDigits: 2 }), xPos + 5, currentY);
        currentY += 10;
      });
    }

    // Additional Items Table
    currentY += 10;
    pdf.setFillColor(117, 186, 157);
    pdf.rect(15, currentY, 180, 10, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Additional Items', 20, currentY + 7);
    
    currentY += 15;
    if (this.additionalItems) {
      this.additionalItems.forEach((item, index) => {
        checkForNewPage(15);
        let xPos = 15;
        pdf.setTextColor(60, 60, 60);
        pdf.setFont('helvetica', 'normal');
        pdf.text(item.id.toString(), xPos + 5, currentY);
        xPos += packageColumnWidths[0];
        pdf.text(item.name, xPos + 5, currentY);
        xPos += packageColumnWidths[1];
        pdf.text(item.section, xPos + 5, currentY);
        xPos += packageColumnWidths[2];
        pdf.text(item.total.toLocaleString('en-IN', { minimumFractionDigits: 2 }), xPos + 5, currentY);
        currentY += 10;
      });
    }

    // Summary Section
    currentY += 20;
    pdf.setFillColor(117, 186, 157);
    pdf.rect(15, currentY, 180, 10, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Summary', 20, currentY + 7);
    
    currentY += 20;
    const summaryItems: SummaryItem[] = [
      { label: 'Pre-tax Total', value: this.preTaxTotal },
      { label: 'GST (18%)', value: this.gstAmount },
      { label: 'Grand Total', value: this.grandTotal, isBold: true }
    ];

    if (this.showRow['SummaryToVendor']) {
      summaryItems.splice(1, 0, { label: 'To Vendor', value: this.toVendorAmount });
    }

    if (this.showRow['SummaryDiscount']) {
      summaryItems.splice(1, 0, 
        { label: 'Discount (8%)', value: this.discountValue },
        { label: 'Pre Tax (Post Discount)', value: this.preTaxPostDiscount }
      );
    }

    summaryItems.forEach(item => {
      checkForNewPage(15);
      pdf.setTextColor(60, 60, 60);
      if (item.isBold) {
        pdf.setFont('helvetica', 'bold');
      } else {
        pdf.setFont('helvetica', 'normal');
      }
      pdf.text(item.label, 25, currentY);
      pdf.text(`₹ ${item.value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, 175, currentY, { align: 'right' });
      currentY += 10;
    });

    // Payment Terms Section
    currentY += 20;
    pdf.setFillColor(117, 186, 157);
    pdf.rect(15, currentY, 180, 10, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Payment Terms', 20, currentY + 7);
    
    currentY += 20;
    const paymentTerms: PaymentTerm[] = [
      {
        stage: 'Order Confirmation',
        amount: this.orderConfirmationAmount,
        note: '(25% of total amount)'
      },
      {
        stage: 'Design Confirmation',
        amount: this.designConfirmationAmount,
        note: '(50% of Internal Painting & Door Grills + 75% of rest)'
      },
      {
        stage: '2 Days Before Project',
        amount: this.projectStartAmount || 0,
        note: '(25% of Internal Painting & Door Grills)'
      }
    ];

    // Draw payment terms rows
    paymentTerms.forEach((term, index) => {
      checkForNewPage(20);
      pdf.setTextColor(60, 60, 60);
      pdf.setFont('helvetica', 'normal');
      pdf.text(term.stage, 20, currentY);
      pdf.text(`₹ ${term.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, 120, currentY);
      
      // Add note in smaller font
      pdf.setFontSize(8);
      pdf.text(term.note, 120, currentY + 4);
      pdf.setFontSize(10);
      
      currentY += 15;
    });

    // Footer on each page
    // const pageCount = pdf.internal.getNumberOfPages();
    // for (let i = 1; i <= pageCount; i++) {
    //   pdf.setPage(i);
    //   pdf.setTextColor(150, 150, 150);
    //   pdf.setFontSize(8);
    //   pdf.text('This is a computer-generated document. No signature required.', pdf.internal.pageSize.width / 2, pdf.internal.pageSize.height - 10, { align: 'center' });
    // }

    pdf.save('quotation.pdf');
}
}