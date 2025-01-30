import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-send-quote-dialog-component',
  templateUrl: './send-quote-dialog-component.component.html',
  styleUrls: ['./send-quote-dialog-component.component.css']
})
export class SendQuoteDialogComponentComponent {
  activeTab: 'email' | 'whatsapp' | 'download' = 'email'; // Added 'download' option
  emailForm = {
    to: '',
    subject: 'Quote from Espresso',
    attachment: null as File | null
  };
  whatsappForm = {
    number: ''
  };
  sendAndDownload = false; // Checkbox state

  constructor(
    public dialogRef: MatDialogRef<SendQuoteDialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.emailForm.to = data.customerEmail || '';
    this.whatsappForm.number = data.customerPhone || '';
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.emailForm.attachment = file;
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSend() {
    const sendData = this.activeTab === 'email' 
      ? { type: 'email', ...this.emailForm }
      : { type: 'whatsapp', ...this.whatsappForm };

    if (this.sendAndDownload) {
      // Logic for downloading the quote
      this.downloadQuote();
    }

    this.dialogRef.close(sendData);
  }

  private downloadQuote() {
    // Implement your download logic here
    console.log("Downloading quote...");
  }
}
