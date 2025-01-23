import { Component, HostListener } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { SendQuoteDialogComponentComponent } from '../send-quote-dialog-component/send-quote-dialog-component.component';
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
  };
  toVendor:{[rowName:string]:boolean}={
    toVendor:false,
  }
  discount: number = 0;
  summaryDiscount: number = 0;

  customerDetails = {
    name: "John Smith",
    company: "Espresso",
    address: "New Bel Road, Bengalore, Karnataka",
    city: "Bengaluru, Karnataka",
    email: "Smith.John@espresso.com",
    phone: "9898922323"
  };
  preTaxTotal: number = 6000;
  discountValue: number = 0;
  preTaxPostDiscount: number = 0;
  gstAmount: number = 0;
  grandTotal: number = 0;

  constructor(private dialog: MatDialog) {
    this.calculateTotals();
  }

  calculateTotals() {
    this.discountValue = (this.preTaxTotal * (this.showRow['SummaryDiscount'] ? 8 : 0)) / 100;
    this.preTaxPostDiscount = this.preTaxTotal - this.discountValue;
    this.gstAmount = this.preTaxPostDiscount * 0.18; // 18% GST
    this.grandTotal = this.preTaxPostDiscount + this.gstAmount;
  }
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key.toLowerCase() === 'x' && event.shiftKey) {
      this.showColumn['discount'] = !this.showColumn['discount'];
      this.showRow['SummaryDiscount'] = false;
      this.calculateTotals();
    }
    else if (event.key.toLowerCase() === 'y' && event.shiftKey) {
      this.showRow['SummaryDiscount'] = !this.showRow['SummaryDiscount'];
      this.calculateTotals();
    }
    else if (event.key.toLowerCase() === 'v' && event.shiftKey) {
      this.toVendor['SummaryToVendor'] = !this.toVendor['SummaryToVendor'];
    }
  }
  onDateSelect(event: any): void {
    this.selectedDate = event.value; // Store the selected date
    console.log('Selected Date:', this.selectedDate); // Debugging line to check selected date
  }

  // Called when the date picker is closed
  onDateClose(): void {
    console.log('Date picker closed'); // Debugging line to check if picker closes
  }
  toggleColumnVisibility(columnName: string) {
    this.showColumn[columnName] = !this.showColumn[columnName];
  }

  toggleRowVisibility(rowName: string) {
    this.showRow[rowName] = !this.showRow[rowName];
  }
toggleToVendorVisibility(rowName:string){
  this.showRow[rowName]=!this.showRow[rowName];
}
  validateDiscount() {
    if (this.discount > 10) {
      this.discount = 10;
    }
  }

  validateSummaryDiscount() {
    if (this.summaryDiscount > 10) {
      this.summaryDiscount = 10;
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
        // Handle the send quote action
        console.log('Quote sent:', result);
      }
    });
  }
  exportToPDF() {
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Modern header with gradient effect
    pdf.setFillColor(117, 186, 157);
    pdf.rect(0, 0, 210, 60, 'F');
    
    // Add subtle accent line
    pdf.setFillColor(255, 255, 255, 0.1);
    pdf.rect(0, 45, 210, 2, 'F');
    
    // Company branding
    pdf.setTextColor(255, 255, 255);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(32);
    pdf.text('Espresso', 20, 30);
    
    // Quote label with modern positioning
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(14);
    pdf.text('QUOTATION', 20, 45);
    
    // Quote details with clean layout
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const quoteDate = new Date().toLocaleDateString();
    const quoteNumber = `QT-${Math.floor(Math.random() * 10000)}`;
    pdf.text(`Date: ${quoteDate}  |  Quote #: ${quoteNumber}`, 140, 45);

    // Customer Details Section with modern card design
    pdf.setDrawColor(240, 240, 240);
    pdf.setFillColor(250, 250, 250);
    pdf.setLineWidth(0.5);
    pdf.roundedRect(15, 75, 180, 80, 4, 4, 'FD');
    
    // Section title with accent
    pdf.setFillColor(117, 186, 157);
    pdf.rect(15, 75, 5, 80, 'F');
    
    pdf.setTextColor(60, 60, 60);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.text('Customer Information', 25, 88);
    
    // Customer details in two columns
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    const customerDetails = [
      ['Company', this.customerDetails.company],
      ['Contact Person', this.customerDetails.name],
      ['Address', this.customerDetails.address],
      ['City', this.customerDetails.city],
      ['Email', this.customerDetails.email],
      ['Phone', this.customerDetails.phone]
    ];

    let leftColY = 100;
    let rightColY = 100;
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

    // Terms section with modern card design
    pdf.setFillColor(250, 250, 250);
    pdf.roundedRect(15, 170, 180, 50, 4, 4, 'FD');
    
    // Terms accent
    pdf.setFillColor(117, 186, 157);
    pdf.rect(15, 170, 5, 50, 'F');
    
    pdf.setTextColor(60, 60, 60);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    pdf.text('Terms & Conditions', 25, 182);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    const terms = [
      '1. Validity: This quotation is valid for 30 days',
      '2. Payment: 50% advance payment required',
      '3. Timeline: Project completion within 45 working days',
      '4. Warranty: 1 year warranty on workmanship'
    ];
    
    let termsY = 190;
    terms.forEach(term => {
      pdf.text(term, 25, termsY);
      termsY += 7;
    });

    // Add new page for quotation details
    pdf.addPage();

    // Subtle header for second page
    pdf.setFillColor(117, 186, 157);
    pdf.rect(0, 0, 210, 30, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text('Quotation Details', 20, 20);

    // Capture and add table content
    const tableContent = document.createElement('div');
    tableContent.innerHTML = `
      <div style="padding: 20px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 34px;">
          ${document.querySelector('.wall-card table')?.innerHTML || ''}
        </table>
      </div>
    `;
    document.body.appendChild(tableContent);

    html2canvas(tableContent, {
      scale: 2,
      backgroundColor: 'white',
      removeContainer: true
    }).then(canvas => {
      document.body.removeChild(tableContent);
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 170;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Add table content
      pdf.addImage(imgData, 'PNG', 20, 40, imgWidth, imgHeight);

      // Modern Summary Section
      const summaryY = 40 + imgHeight + 20;
      
      // Summary card with shadow effect
      pdf.setFillColor(250, 250, 250);
      pdf.roundedRect(15, summaryY, 180, 70, 4, 4, 'FD');
      
      // Summary accent
      pdf.setFillColor(117, 186, 157);
      pdf.rect(15, summaryY, 5, 70, 'F');
      
      pdf.setTextColor(60, 60, 60);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.text('Summary', 25, summaryY + 15);

      const summaryItems = [
        { label: 'Subtotal', value: '6,000.00' },
        { label: 'Discount', value: '0.00' },
        { label: 'GST (18%)', value: '1,080.00' },
        { label: 'Total Amount', value: '7,080.00', isTotal: true }
      ];

      let itemY = summaryY + 30;
      summaryItems.forEach(item => {
        if (item.isTotal) {
          pdf.setDrawColor(200, 200, 200);
          pdf.line(25, itemY - 5, 185, itemY - 5);
          pdf.setFont('helvetica', 'bold');
        } else {
          pdf.setFont('helvetica', 'normal');
        }

        pdf.setTextColor(item.isTotal ? 60 : 100, item.isTotal ? 60 : 100, item.isTotal ? 60 : 100);
        pdf.text(item.label, 25, itemY);
        pdf.text(`₹ ${item.value}`, 175, itemY, { align: 'right' });
        
        itemY += 10;
      });

      // Payment Terms Card
      const paymentY = summaryY + 85;
      pdf.setFillColor(250, 250, 250);
      pdf.roundedRect(15, paymentY, 180, 40, 4, 4, 'FD');
      
      // Payment terms accent
      pdf.setFillColor(117, 186, 157);
      pdf.rect(15, paymentY, 5, 40, 'F');
      
      pdf.setTextColor(60, 60, 60);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      pdf.text('Payment Terms', 25, paymentY + 15);
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.text('50% advance payment required', 25, paymentY + 25);
      pdf.text('Remaining payment due within 30 days of invoice', 25, paymentY + 32);

      // Modern signature section
      const signatureY = pdf.internal.pageSize.height - 50;
      
      // Signature boxes with subtle styling
      pdf.setFillColor(250, 250, 250);
      pdf.roundedRect(15, signatureY, 85, 35, 4, 4, 'FD');
      pdf.roundedRect(110, signatureY, 85, 35, 4, 4, 'FD');
      
      // Signature lines with modern style
      pdf.setDrawColor(200, 200, 200);
      pdf.setLineWidth(0.5);
      pdf.line(25, signatureY + 20, 90, signatureY + 20);
      pdf.line(120, signatureY + 20, 185, signatureY + 20);
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9);
      pdf.text('Authorized Signature', 25, signatureY + 10);
      pdf.text('Customer Signature', 120, signatureY + 10);
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      pdf.text('Date: ' + new Date().toLocaleDateString(), 25, signatureY + 28);
      pdf.text('Date: _____________', 120, signatureY + 28);

      // Footer with page numbers
      const pageCount = pdf.internal.pages.length;
      for(let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setTextColor(150, 150, 150);
        pdf.setFontSize(8);
        pdf.text(`Page ${i} of ${pageCount}`, pdf.internal.pageSize.width / 2, pdf.internal.pageSize.height - 10, { align: 'center' });
      }

      pdf.save('quotation.pdf');
    });
}
}