import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CatalogFileModel } from 'src/app/Shared/models/ProductCatalog';
import { environment } from 'src/environment/environment';
@Component({
  selector: 'app-add-preview',
  templateUrl: './add-preview.component.html',
  styleUrls: ['./add-preview.component.css']
})
export class AddPreviewComponent {
  fileUrl: SafeResourceUrl;
  isImage!: boolean;
  isPdf!: boolean;
  isVideo!: boolean;
  isAudio!: boolean;
  isSupported!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { file: CatalogFileModel },
    private sanitizer: DomSanitizer
  ) {
    this.determineFileType();
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `${environment.backend.baseURL}${data.file.filePath}`
    );
  }

  private determineFileType(): void {
    const fileType = this.data.file.fileType.toLowerCase();
    this.isImage = fileType.startsWith('image/');
    this.isPdf = fileType === 'application/pdf';
    this.isVideo = fileType.startsWith('video/');
    this.isAudio = fileType.startsWith('audio/');
    this.isSupported = this.isImage || this.isPdf || this.isVideo || this.isAudio;
  }
}
