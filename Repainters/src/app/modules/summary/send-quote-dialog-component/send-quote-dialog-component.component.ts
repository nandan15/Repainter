import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-send-quote-dialog-component',
  templateUrl: './send-quote-dialog-component.component.html',
  styleUrls: ['./send-quote-dialog-component.component.css']
})
export class SendQuoteDialogComponentComponent {
  activeTab: 'email' | 'whatsapp' = 'email';
  emailForm = {
    to: '',
    subject: 'Quote from Espresso',
    attachment: null as File | null
  };
  whatsappForm = {
    number: ''
  };

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
    if (this.activeTab === 'email') {
      this.dialogRef.close({ type: 'email', ...this.emailForm });
    } else {
      this.dialogRef.close({ type: 'whatsapp', ...this.whatsappForm });
    }
  }
}
