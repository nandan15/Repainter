import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WhatsAppService } from 'src/app/Shared/Service/whatsapp.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
interface EmailForm {
  to: string[];
  subject: string;
  attachment: File | null;
  attachmentContent: string | null;
  bodyContent: string;
}
@Component({
    selector: 'app-send-quote-dialog-component',
    templateUrl: './send-quote-dialog-component.component.html',
    styleUrls: ['./send-quote-dialog-component.component.css']
})
export class SendQuoteDialogComponentComponent {
  activeTab: 'email' | 'whatsapp' | 'download' = 'email';
  emailForm: EmailForm = {
      to: [], 
      subject: 'Hello from ESPRESSO! Estimate for your Home Renovation',
      attachment: null,
      attachmentContent: null,
      bodyContent: `Dear Valued Customer,

We thank you for your enquiry for the renovation of your home. Please find appended quote estimate for the same.

At Vibgyor, we take immense pride in our 50 years legacy built on transparency and integrity. We cherish our association and are excited to be a part of your home improvement journey.

Best Regards,
TEAM VIBGYOR`
  };
  emailInput: string = ''; 
  whatsappForm = {
      number: ''
  };
  sendAndDownload = false;
    isLoading = false;
    quotationFile: Blob | null = null;
    quotationFileName: string = '';

    constructor(
      public dialogRef: MatDialogRef<SendQuoteDialogComponentComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private whatsAppService: WhatsAppService,
      private snackBar: MatSnackBar,
      private http: HttpClient
  ) {
      if (data.customerPhone) {
          this.whatsappForm.number = data.customerPhone;
      }
      if (data.quotationFile) {
          this.quotationFile = data.quotationFile;
          this.quotationFileName = data.quotationFileName;
      }
  }
  onEmailInputChange(value: string) {
    // Split the input string into an array of emails and trim whitespace
    this.emailForm.to = value
        .split(',')
        .map(email => email.trim())
        .filter(email => email.length > 0);
}

// New method to validate email addresses
validateEmails(): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const invalidEmails = this.emailForm.to.filter(email => !emailRegex.test(email));
    
    if (invalidEmails.length > 0) {
        this.snackBar.open(
            `Invalid email address(es): ${invalidEmails.join(', ')}`, 
            'Close', 
            { duration: 5000 }
        );
        return false;
    }
    return true;
}

    onCancel() {
        this.dialogRef.close();
    }
    onSend() {
      if (this.activeTab === 'download') {
        this.downloadQuote();
        this.dialogRef.close({ type: 'download', success: true });
      } else if (this.activeTab === 'whatsapp') {
        this.sendWhatsAppMessage();
      } else if (this.activeTab === 'email') {
        this.sendEmail();
      }
    }

    sendEmail() {
      if (this.emailForm.to.length === 0 || !this.emailForm.subject) {
          this.snackBar.open('Please fill in all required fields', 'Close', { duration: 3000 });
          return;
      }

      if (!this.validateEmails()) {
          return;
      }

      this.isLoading = true;

      if (this.emailForm.attachment && this.quotationFileName) {
          this.emailForm.attachment = new File(
              [this.emailForm.attachment], 
              this.quotationFileName, 
              { type: 'application/pdf' }
          );
      }

      // Format the email body with HTML
      const formattedBody = this.formatEmailBody(this.emailForm.bodyContent);

      const emailData = {
          to: this.emailForm.to,
          subject: this.emailForm.subject,
          body: formattedBody,
          isHtml: true,
          attachments: this.emailForm.attachment && this.emailForm.attachmentContent 
              ? [{
                  FileName: this.emailForm.attachment.name,
                  Content: this.emailForm.attachmentContent
              }] 
              : []
      };

      this.http.post(`${environment.backend.baseURL}api/email/send-quote-email`, emailData)
          .subscribe({
              next: () => {
                  this.snackBar.open('Email sent successfully!', 'Close', { duration: 3000 });
                  this.isLoading = false;
                  if (this.sendAndDownload) {
                      this.downloadQuote();
                  }
                  this.dialogRef.close({ type: 'email', success: true });
              },
              error: (error) => {
                  console.error('Error sending email:', error);
                  this.snackBar.open(
                      'Failed to send email: ' + (error.message || error), 
                      'Close', 
                      { duration: 3000 }
                  );
                  this.isLoading = false;
              }
          });
  }

  private formatEmailBody(content: string): string {
    // Convert plain text to HTML with proper formatting
    return `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto;">
            ${content.split('\n\n').map(paragraph => `<p>${paragraph}</p>`).join('')}
        </div>
    `;
}

    sendWhatsAppMessage() {
        if (!this.whatsappForm.number || !this.isValidIndianPhoneNumber(this.whatsappForm.number)) {
            this.snackBar.open('Please enter a valid WhatsApp number', 'Close', { duration: 3000 });
            return;
        }
    
        this.isLoading = true;
    
        const requestBody = {
            phoneNumber: this.whatsappForm.number,
            message: 'Your quote details: [Quote Details Here]' // Replace with actual message
        };
    
        this.http.post(`${environment.backend.baseURL}api/whatsapp/send-message`, requestBody)
            .subscribe({
                next: () => {
                    this.snackBar.open('WhatsApp message sent successfully!', 'Close', { duration: 3000 });
                    this.isLoading = false;
                },
                error: (error) => {
                    console.error('Error sending WhatsApp message:', error);
                    this.snackBar.open('Failed to send WhatsApp message: ' + (error.message || error), 'Close', { duration: 3000 });
                    this.isLoading = false;
                }
            });
    }

    private isValidIndianPhoneNumber(number: string): boolean {
        const indianPhoneNumberRegex = /^[6-9]\d{9}$/;
        return indianPhoneNumberRegex.test(number);
    }

    downloadQuote() {
      if (this.data.quotationFile && this.data.quotationFileName) {
        const url = window.URL.createObjectURL(this.data.quotationFile);
        const link = document.createElement('a');
        link.href = url;
        link.download = this.data.quotationFileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        this.snackBar.open('Error: Quote file not available', 'Close', { duration: 3000 });
      }
    }
    onFileSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
          this.emailForm.attachment = file;
          this.readFile(file);
        } else {
          this.emailForm.attachment = null;
          this.emailForm.attachmentContent = null;
        }
      }
      attachQuotationFile() {
        if (this.quotationFile) {
          const file = new File([this.quotationFile], this.quotationFileName, { type: 'application/pdf' });
          this.emailForm.attachment = file;
          this.readFile(file);
        }
      }
      ngOnInit() {
        this.attachQuotationFile();
      }
    readFile(file: File) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.emailForm.attachmentContent = e.target.result.split(',')[1];  // Extract base64
        };
        reader.onerror = (error) => {
            console.error('Error reading file:', error);
            this.snackBar.open('Error reading file', 'Close', { duration: 3000 });
            this.emailForm.attachmentContent = null;
            this.emailForm.attachment = null;
        };
        reader.readAsDataURL(file);
    }
    
}
