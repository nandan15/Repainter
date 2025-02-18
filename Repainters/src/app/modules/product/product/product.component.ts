import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CatalogService } from 'src/app/Shared/Service/ProductCatalog/ProductCatalog.service';
import { CatalogFileModel, CategoryModel, DashboardStats, FolderModel } from 'src/app/Shared/models/ProductCatalog';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
    // View state
    currentView: 'dashboard' | 'files' | 'settings' = 'dashboard';
    isSidebarCollapsed = false;
    isLoading = false;
    error: string | null = null;

    // Navigation and selection
    currentPath: string[] = [];
    selectedItem: CategoryModel | FolderModel | CatalogFileModel | null = null;
    isRenaming = false;
    newItemName = '';

    // Data
    categories: CategoryModel[] = [];
    currentCategory?: CategoryModel;
    currentFolder?: FolderModel;
    currentFolders: FolderModel[] = [];
    currentFiles: CatalogFileModel[] = [];
    dashboardStats: DashboardStats = {
        totalProducts: 0,
        totalCategories: 0,
        recentUploads: 0
    };

    // User info (should come from auth service)
    readonly userId = 1;
    readonly customerId = 1;

    private destroy$ = new Subject<void>();

    constructor(
        private catalogService: CatalogService,
        private snackBar: MatSnackBar,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.loadInitialData();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    // Change from private to public
public loadInitialData(): void {
  this.isLoading = true;
  this.error = null;
  
  this.catalogService.getCategories(this.customerId, this.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
          next: (categories) => {
              this.categories = categories;
              this.updateDashboardStats();
              this.isLoading = false;
          },
          error: (error) => {
              this.error = error.message;
              this.isLoading = false;
              this.showError('Error loading categories');
          }
      });
}
    getItemIcon(item: CategoryModel | FolderModel | CatalogFileModel): string {
      if (this.isFolder(item)) {
          return 'fas fa-folder';
      } else if (this.isFile(item)) {
          return this.getFileIcon(item);
      } else {
          return 'fas fa-folder-open'; // for categories
      }
  }
  
  onItemDoubleClick(item: CategoryModel | FolderModel | CatalogFileModel): void {
      if (this.isFolder(item)) {
          this.navigateToFolder(item);
      }
  }
    // Navigation methods
    toggleSidebar(): void {
        this.isSidebarCollapsed = !this.isSidebarCollapsed;
    }

    navigateToFolder(folder: FolderModel): void {
        this.isLoading = true;
        this.currentFolder = folder;
        this.currentPath.push(folder.name);
        
        this.loadFiles(folder.folderId);
    }

    navigateUp(): void {
        if (this.currentPath.length === 0) return;

        this.currentPath.pop();
        this.isLoading = true;

        if (this.currentPath.length === 0) {
            this.currentFolder = undefined;
            this.loadFolders(this.currentCategory!.categoryId);
        } else if (this.currentFolder?.parentFolderId) {
            this.loadParentFolder(this.currentFolder.parentFolderId);
        }
    }

    // CRUD operations
    async createCategory(): Promise<void> {
        const newCategory: CategoryModel = {
            categoryId: 0,
            name: 'New Category',
            customerId: this.customerId,
            userId: this.userId,
            createdBy: this.userId,
            createdOn: new Date(),
            isDeleted: false
        };

        this.isLoading = true;
        this.catalogService.createCategory(newCategory)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (category) => {
                    this.categories.push(category);
                    this.selectedItem = category;
                    this.isRenaming = true;
                    this.newItemName = category.name;
                    this.isLoading = false;
                    this.showSuccess('Category created');
                },
                error: (error) => {
                    this.isLoading = false;
                    this.showError('Error creating category');
                }
            });
    }

    createNewFolder(): void {
        if (!this.currentCategory) {
            this.showError('Please select a category first');
            return;
        }

        const newFolder: FolderModel = {
            folderId: 0,
            name: 'New Folder',
            categoryId: this.currentCategory.categoryId,
            parentFolderId: this.currentFolder?.folderId,
            customerId: this.customerId,
            userId: this.userId,
            createdBy: this.userId,
            createdOn: new Date(),
            isDeleted: false
        };

        this.isLoading = true;
        this.catalogService.createFolder(newFolder)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (folder) => {
                    if (this.currentFolder) {
                        this.loadFiles(this.currentFolder.folderId);
                    } else {
                        this.loadFolders(this.currentCategory!.categoryId);
                    }
                    this.selectedItem = folder;
                    this.isRenaming = true;
                    this.newItemName = folder.name;
                    this.isLoading = false;
                    this.showSuccess('Folder created');
                },
                error: (error) => {
                    this.isLoading = false;
                    this.showError('Error creating folder');
                }
            });
    }

    uploadFile(event: any): void {
        const file = event.target.files[0];
        if (!file || !this.currentFolder) {
            this.showError('Please select a folder and file');
            return;
        }

        const newFile: CatalogFileModel = {
            fileId: 0,
            name: file.name,
            fileType: file.type,
            filePath: '',
            folderId: this.currentFolder.folderId,
            categoryId: this.currentCategory!.categoryId,
            customerId: this.customerId,
            userId: this.userId,
            createdBy: this.userId,
            createdOn: new Date(),
            isDeleted: false
        };

        this.isLoading = true;
        this.catalogService.uploadFile(newFile, file)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (uploadedFile) => {
                    this.loadFiles(this.currentFolder!.folderId);
                    this.isLoading = false;
                    this.showSuccess('File uploaded');
                },
                error: (error) => {
                    this.isLoading = false;
                    this.showError('Error uploading file');
                }
            });
    }

    deleteItem(item: CategoryModel | FolderModel | CatalogFileModel): void {
        const itemType = this.getItemType(item);
        const confirmDelete = confirm(`Are you sure you want to delete this ${itemType}?`);
        
        if (!confirmDelete) return;

        this.isLoading = true;
        
        if ('fileId' in item) {
            this.deleteFile(item as CatalogFileModel);
        } else if ('folderId' in item) {
            this.deleteFolder(item as FolderModel);
        } else if ('categoryId' in item) {
            this.deleteCategory(item as CategoryModel);
        }
    }

    startRename(item: CategoryModel | FolderModel | CatalogFileModel): void {
        this.selectedItem = item;
        this.isRenaming = true;
        this.newItemName = item.name;
    }

    finishRename(): void {
        if (!this.selectedItem || !this.newItemName.trim()) return;

        const updatedItem = { ...this.selectedItem, name: this.newItemName.trim() };
        this.isLoading = true;

        if ('fileId' in updatedItem) {
            // File rename logic would go here
            this.isLoading = false;
        } else if ('folderId' in updatedItem) {
            this.updateFolder(updatedItem as FolderModel);
        } else if ('categoryId' in updatedItem) {
            this.updateCategory(updatedItem as CategoryModel);
        }
    }

    // Private helper methods
    private loadFolders(categoryId: number): void {
        this.isLoading = true;
        this.catalogService.getFolders(categoryId, this.customerId, this.userId)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (folders) => {
                    this.currentFolders = folders;
                    this.currentFiles = [];
                    this.isLoading = false;
                },
                error: (error) => {
                    this.isLoading = false;
                    this.showError('Error loading folders');
                }
            });
    }

    private loadFiles(folderId: number): void {
        this.isLoading = true;
        this.catalogService.getFiles(folderId, this.customerId, this.userId)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (files) => {
                    this.currentFiles = files;
                    this.isLoading = false;
                },
                error: (error) => {
                    this.isLoading = false;
                    this.showError('Error loading files');
                }
            });
    }

   // ... continuing from the previous code

   private loadParentFolder(parentFolderId: number): void {
    this.isLoading = true;
    this.catalogService.getFolders(this.currentCategory!.categoryId, this.customerId, this.userId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
            next: (folders) => {
                const parentFolder = folders.find(f => f.folderId === parentFolderId);
                if (parentFolder) {
                    this.currentFolder = parentFolder;
                    this.loadFiles(parentFolder.folderId);
                } else {
                    this.showError('Parent folder not found');
                    this.isLoading = false;
                }
            },
            error: (error) => {
                this.isLoading = false;
                this.showError('Error loading parent folder');
            }
        });
}

private deleteFile(file: CatalogFileModel): void {
    this.catalogService.deleteFile(file.fileId, this.userId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
            next: () => {
                this.loadFiles(this.currentFolder!.folderId);
                this.showSuccess('File deleted');
            },
            error: (error) => {
                this.isLoading = false;
                this.showError('Error deleting file');
            }
        });
}

private deleteFolder(folder: FolderModel): void {
    this.catalogService.deleteFolder(folder.folderId, this.userId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
            next: () => {
                if (this.currentFolder) {
                    this.loadFiles(this.currentFolder.folderId);
                } else {
                    this.loadFolders(this.currentCategory!.categoryId);
                }
                this.showSuccess('Folder deleted');
            },
            error: (error) => {
                this.isLoading = false;
                this.showError('Error deleting folder');
            }
        });
}

private deleteCategory(category: CategoryModel): void {
    this.catalogService.deleteCategory(category.categoryId, this.userId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
            next: () => {
                this.loadInitialData();
                this.showSuccess('Category deleted');
            },
            error: (error) => {
                this.isLoading = false;
                this.showError('Error deleting category');
            }
        });
}

private updateFolder(folder: FolderModel): void {
    this.catalogService.updateFolder(folder)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
            next: () => {
                if (this.currentFolder) {
                    this.loadFiles(this.currentFolder.folderId);
                } else {
                    this.loadFolders(this.currentCategory!.categoryId);
                }
                this.isRenaming = false;
                this.showSuccess('Folder updated');
            },
            error: (error) => {
                this.isLoading = false;
                this.showError('Error updating folder');
            }
        });
}

private updateCategory(category: CategoryModel): void {
    this.catalogService.updateCategory(category)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
            next: () => {
                this.loadInitialData();
                this.isRenaming = false;
                this.showSuccess('Category updated');
            },
            error: (error) => {
                this.isLoading = false;
                this.showError('Error updating category');
            }
        });
}

private updateDashboardStats(): void {
    let recentUploads = 0;
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Count recent uploads across all folders
    this.categories.forEach(category => {
        category.folders?.forEach(folder => {
            folder.files?.forEach(file => {
                if (new Date(file.createdOn) > oneWeekAgo) {
                    recentUploads++;
                }
            });
        });
    });

    this.dashboardStats = {
        totalProducts: this.calculateTotalFiles(),
        totalCategories: this.categories.length,
        recentUploads
    };
}

private calculateTotalFiles(): number {
    let total = 0;
    this.categories.forEach(category => {
        category.folders?.forEach(folder => {
            total += folder.files?.length || 0;
        });
    });
    return total;
}

private getItemType(item: CategoryModel | FolderModel | CatalogFileModel): string {
    if ('fileId' in item) return 'file';
    if ('folderId' in item) return 'folder';
    if ('categoryId' in item) return 'category';
    return 'item';
}

getCurrentItems(): Array<CategoryModel | FolderModel | CatalogFileModel> {
    if (this.currentFolder) {
        return this.currentFiles;
    } else if (this.currentCategory) {
        return this.currentFolders;
    }
    return this.categories;
}

// UI feedback methods
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

// UI helper methods
isCategory(item: any): item is CategoryModel {
  return item?.itemType === 'category';
}

isFolder(item: any): item is FolderModel {
  return item?.itemType === 'folder';
}

isFile(item: any): item is CatalogFileModel {
  return item?.itemType === 'file';
}

getFileIcon(file: CatalogFileModel): string {
    const fileType = file.fileType.toLowerCase();
    if (fileType.includes('image')) return 'image';
    if (fileType.includes('pdf')) return 'picture_as_pdf';
    if (fileType.includes('word')) return 'description';
    if (fileType.includes('excel')) return 'table_chart';
    return 'insert_drive_file';
}

formatFileSize(size: number): string {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

formatDate(date: Date | string): string {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}
}