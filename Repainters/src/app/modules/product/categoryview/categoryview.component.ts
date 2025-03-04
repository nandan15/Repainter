import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryModel, FolderModel, CatalogFileModel } from 'src/app/Shared/models/ProductCatalog';
import { CatalogService } from 'src/app/Shared/Service/ProductCatalog/ProductCatalog.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddPreviewComponent } from '../add-preview/add-preview.component';

@Component({
  selector: 'app-categoryview',
  templateUrl: './categoryview.component.html',
  styleUrls: ['./categoryview.component.css']
})
export class CategoryviewComponent implements OnInit, OnDestroy {
  categoryId!: number;
  categoryName: string = '';
  category?: CategoryModel;
  folders: FolderModel[] = [];
  files: CatalogFileModel[] = [];
  filteredFiles: CatalogFileModel[] = [];
  selectedFile: CatalogFileModel | null = null;
  isLoading = false;
  error: string | null = null;
  searchText = '';
  
  private readonly CUSTOMER_ID = 1;
  private readonly USER_ID = 1;
  private destroy$ = new Subject<void>();


  constructor(
    private route: ActivatedRoute,
    private catalogService: CatalogService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog, // Add this
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const categoryIdParam = this.route.snapshot.paramMap.get('categoryId');
    this.route.queryParams.subscribe(params => {
      this.categoryName = params['categoryName'] || 'Category';
      document.title = `Repainters - ${this.categoryName}`;
    });
    if (categoryIdParam) {
      this.categoryId = +categoryIdParam;
      this.loadCategoryDetails();
    } else {
      this.error = 'Invalid category ID';
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  getFilesForFolder(folderId: number): CatalogFileModel[] {
    return this.files.filter(file => file.folderId === folderId);
  }

  filterItems(): void {
    if (!this.searchText) {
      this.filteredFiles = this.files;
      return;
    }
    
    const searchLower = this.searchText.toLowerCase();
    this.filteredFiles = this.files.filter(file => 
      file.name.toLowerCase().includes(searchLower) ||
      file.fileType.toLowerCase().includes(searchLower)
    );
  }

  previewFile(file: CatalogFileModel): void {
    this.dialog.open(AddPreviewComponent, {
      data: { file },
      width: '80vw',
      maxWidth: '1200px',
      maxHeight: '90vh'
    });
  }
  closePreview(): void {
    this.selectedFile = null;
  }
 
  getFileType(file: CatalogFileModel): string {
    if (!file.fileType) return 'unknown';
    
    const fileType = file.fileType.toLowerCase();
    if (fileType.includes('image')) return 'image';
    if (fileType.includes('pdf')) return 'pdf';
    if (fileType.includes('word')) return 'word';
    if (fileType.includes('excel')) return 'excel';
    return 'unknown';
  }
  getSafeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  loadCategoryDetails(): void {
    this.isLoading = true;
    this.error = null;

    this.catalogService.getCategories(this.CUSTOMER_ID, this.USER_ID)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (categories) => {
          const foundCategory = categories.find(cat => cat.categoryId === this.categoryId);
          if (foundCategory) {
            this.category = foundCategory;
            this.loadFolders();
          } else {
            this.error = 'Category not found';
            this.isLoading = false;
          }
        },
        error: (error) => {
          console.error('Error loading category:', error);
          this.error = 'Failed to load category details';
          this.isLoading = false;
        }
      });
  }

  loadFolders(): void {
    if (!this.categoryId) {
      this.error = 'Invalid category ID';
      this.isLoading = false;
      return;
    }

    this.catalogService.getFolders(this.categoryId, this.CUSTOMER_ID, this.USER_ID)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (folders) => {
          this.folders = folders;
          this.loadFiles();
        },
        error: (error) => {
          console.error('Error loading folders:', error);
          this.error = 'Failed to load folders';
          this.isLoading = false;
        }
      });
  }

  loadFiles(): void {
    if (this.folders.length === 0) {
      this.isLoading = false;
      return;
    }

    let loadedFolders = 0;
    this.files = []; // Reset files array

    this.folders.forEach(folder => {
      this.catalogService.getFiles(folder.folderId, this.CUSTOMER_ID, this.USER_ID)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (files) => {
            this.files = [...this.files, ...files];
            loadedFolders++;
            
            // Check if all folders have been processed
            if (loadedFolders === this.folders.length) {
              this.isLoading = false;
            }
          },
          error: (error) => {
            console.error(`Error loading files for folder ${folder.folderId}:`, error);
            loadedFolders++;
            
            // Continue even if one folder fails
            if (loadedFolders === this.folders.length) {
              this.isLoading = false;
            }
          }
        });
    });
  }

  getFileTypeIcon(file: CatalogFileModel): string {
    if (!file || !file.fileType) return 'fa-file';
  
    const fileType = file.fileType.toLowerCase();
    if (fileType.includes('image')) return 'fa-file-image';
    if (fileType.includes('pdf')) return 'fa-file-pdf';
    if (fileType.includes('word') || fileType.includes('document')) return 'fa-file-word';
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) return 'fa-file-excel';
    if (fileType.includes('zip') || fileType.includes('archive')) return 'fa-file-archive';
    if (fileType.includes('text')) return 'fa-file-alt';
    return 'fa-file';
  }
  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }
}