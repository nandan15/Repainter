import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Note {
  content: string;
  attachment?: string;
  timestamp: Date;
}

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  noteForm: FormGroup;
  selectedFile: File | null = null;
  notes: Note[] = [];

  constructor(private fb: FormBuilder) {
    this.noteForm = this.fb.group({
      noteContent: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Initialize any required data
  }

  redirectToNotes(): void {
    const tabGroup = document.querySelector('mat-tab-group');
    if (tabGroup) {
      // Assuming Notes is the last tab (index 7)
      (tabGroup as any).selectedIndex = 7;
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  removeAttachment(): void {
    this.selectedFile = null;
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  onSubmit(): void {
    if (this.noteForm.valid) {
      const newNote: Note = {
        content: this.noteForm.get('noteContent')?.value,
        attachment: this.selectedFile?.name,
        timestamp: new Date()
      };
      
      this.notes.unshift(newNote);
      this.noteForm.reset();
      this.selectedFile = null;
      
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    }
  }
}