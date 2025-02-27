import { Component, OnInit, OnDestroy } from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
import { finalize, map, mergeMap, takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CatalogService } from 'src/app/Shared/Service/ProductCatalog/ProductCatalog.service';
import { CatalogFileModel, CategoryModel, DashboardStats, FolderModel } from 'src/app/Shared/models/ProductCatalog';
import { AddproductComponent } from '../addproduct/addproduct.component';
import { AddPreviewComponent } from '../add-preview/add-preview.component';
import { RouterModule } from '@angular/router';

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
    currentPath: string[] = [];
    selectedItem: CategoryModel | FolderModel | CatalogFileModel | null = null;
    isRenaming = false;
    newItemName = '';
    categories: CategoryModel[] = [];
    currentCategory?: CategoryModel;
    currentFolder?: FolderModel;
    currentFolders: FolderModel[] = [];
    currentFiles: CatalogFileModel[] = [];
    selectedCategory: CategoryModel | null = null;
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
        private dialog: MatDialog,
        private router:RouterModule
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
openCategoryInNewTab(category: CategoryModel): void {
  const url = `/product/customerview/${category.categoryId}?categoryName=${encodeURIComponent(category.name)}`;
  const newWindow = window.open(url, '_blank');
  
  if (newWindow) {
    newWindow.document.title = `Repainters - ${category.name}`;
  }
}
getTotalFiles(): number {
    let total = 0;
    this.categories.forEach(category => {
      this.catalogService.getFolders(category.categoryId, this.customerId, this.userId)
        .pipe(takeUntil(this.destroy$))
        .subscribe(folders => {
          folders.forEach(folder => {
            this.catalogService.getFiles(folder.folderId, this.customerId, this.userId)
              .pipe(takeUntil(this.destroy$))
              .subscribe(files => {
                total += files.length;
              });
          });
        });
    });
    return total;
  }
  getRecentUploads(): number {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    let recentCount = 0;
    this.categories.forEach(category => {
      this.catalogService.getFolders(category.categoryId, this.customerId, this.userId)
        .pipe(takeUntil(this.destroy$))
        .subscribe(folders => {
          folders.forEach(folder => {
            this.catalogService.getFiles(folder.folderId, this.customerId, this.userId)
              .pipe(takeUntil(this.destroy$))
              .subscribe(files => {
                recentCount += files.filter(file => 
                  new Date(file.createdOn) > oneWeekAgo
                ).length;
              });
          });
        });
    });
    return recentCount;
  }
  getCategoryFolderCount(category: CategoryModel): number {
  let folderCount = 0;
  this.catalogService.getFolders(category.categoryId, this.customerId, this.userId)
    .pipe(takeUntil(this.destroy$))
    .subscribe(folders => {
      folderCount = folders.length;
    });
  return folderCount;
}

getCategoryFileCount(category: CategoryModel): number {
  let fileCount = 0;
  this.catalogService.getFolders(category.categoryId, this.customerId, this.userId)
    .pipe(takeUntil(this.destroy$))
    .subscribe(folders => {
      folders.forEach(folder => {
        this.catalogService.getFiles(folder.folderId, this.customerId, this.userId)
          .pipe(takeUntil(this.destroy$))
          .subscribe(files => {
            fileCount += files.length;
          });
      });
    });
  return fileCount;
}

viewCategoryContents(category: CategoryModel): void {
    this.selectedCategory = category;
    this.loadCategoryContents(category.categoryId);
  }
  loadCategoryContents(categoryId: number): void {
    this.isLoading = true;
    this.error = null;
    this.catalogService.getFolders(categoryId, this.customerId, this.userId)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (folders) => {
          this.currentFolders = folders;
          folders.forEach(folder => {
            this.catalogService.getFiles(folder.folderId, this.customerId, this.userId)
              .pipe(takeUntil(this.destroy$))
              .subscribe({
                next: (files) => {
                  this.currentFiles = [...this.currentFiles, ...files];
                },
                error: (error) => {
                  this.error = 'Error loading files';
                  console.error('Error loading files:', error);
                }
              });
          });
        },
        error: (error) => {
          this.error = 'Error loading folders';
          console.error('Error loading folders:', error);
        }
      });
  }
  
  closeModal(): void {
    this.selectedCategory = null;
    this.currentFolders = [];
    this.currentFiles = [];
  }
  private updateDashboardStats(): void {
    this.isLoading = true;
    let totalProducts = 0;
    let recentUploads = 0;
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const categoryObservables = this.categories.map(category =>
      this.catalogService.getFolders(category.categoryId, this.customerId, this.userId).pipe(
        mergeMap(folders => {
          const folderObservables = folders.map(folder =>
            this.catalogService.getFiles(folder.folderId, this.customerId, this.userId)
          );
          return forkJoin(folderObservables).pipe(
            map(folderFiles => {
              const files = folderFiles.flat();
              totalProducts += files.length;
              recentUploads += files.filter(file => 
                new Date(file.createdOn) > oneWeekAgo
              ).length;
              return files;
            })
          );
        })
      )
    );
    forkJoin(categoryObservables)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: () => {
          this.dashboardStats = {
            totalProducts,
            totalCategories: this.categories.length,
            recentUploads
          };
        },
        error: (error) => {
          console.error('Error updating dashboard stats:', error);
          this.isLoading = false;
        }
      });
  }
getFileTypeIcon(file: CatalogFileModel | any): string {
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
  
   onItemDoubleClick(item: CategoryModel | FolderModel | CatalogFileModel): void {
    if (this.isFolder(item)) {
        this.navigateToFolder(item);
    } else if (this.isCategory(item)) {
        this.navigateToCategory(item);
    }
}
    toggleSidebar(): void {
        this.isSidebarCollapsed = !this.isSidebarCollapsed;
    }
    navigateToCategory(category: CategoryModel): void {
        this.currentView = 'files';
        this.currentCategory = category;
        this.currentFolder = undefined; 
        this.currentPath = [category.name];
        this.loadFolders(category.categoryId);
      }
      
      navigateToFolder(folder: FolderModel): void {
        this.currentFolder = folder;
        this.currentPath.push(folder.name);
        this.loadFiles(folder.folderId);
      }

      navigateUp(): void {
        if (this.currentPath.length === 0) return;
      
        this.currentPath.pop();
        this.isLoading = true;
      
        if (this.currentPath.length === 0) {
          this.currentCategory = undefined;
          this.currentFolder = undefined;
          this.currentFiles = [];
          this.currentFolders = [];
          this.loadInitialData();
        } else if (this.currentCategory && !this.currentFolder) {
          this.currentFolder = undefined;
          this.loadFolders(this.currentCategory.categoryId);
        } else if (this.currentFolder?.parentFolderId) {
          this.loadParentFolder(this.currentFolder.parentFolderId);
        }
      }
    previewFile(file: CatalogFileModel): void {
        this.dialog.open(AddPreviewComponent, {
          data: { file },
          width: '80vw',
          maxWidth: '1200px',
          maxHeight: '90vh'
        });
      }
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
      if (!file) {
        this.showError('Please select a file');
        return;
      }
    
      if (!this.currentFolder?.folderId || !this.currentCategory?.categoryId) {
        this.showError('Please select a folder first');
        return;
      }
    
      this.isLoading = true;
      this.catalogService.uploadFile(file, this.currentFolder.folderId, this.currentCategory.categoryId)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => {
            this.isLoading = false;
            if (event.target) {
              event.target.value = ''; // Reset file input
            }
          })
        )
        .subscribe({
          next: (uploadedFile) => {
            this.loadFiles(this.currentFolder!.folderId);
            this.showSuccess('File uploaded successfully');
          },
          error: (error) => {
            console.error('Upload error:', error);
            this.showError(error.message || 'Error uploading file: Unknown error');
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
            this.isLoading = false;
        } else if ('folderId' in updatedItem) {
            this.updateFolder(updatedItem as FolderModel);
        } else if ('categoryId' in updatedItem) {
            this.updateCategory(updatedItem as CategoryModel);
        }
    }
    private loadFolders(categoryId: number): void {
        this.isLoading = true;
        this.error = null;
        
        this.catalogService.getFolders(categoryId, this.customerId, this.userId)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (folders) => {
                    this.currentFolders = folders;
                    this.currentFiles = [];
                    this.isLoading = false;
                },
                error: (error) => {
                    this.error = error.message;
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
isCategory(item: any): item is CategoryModel {
    return 'categoryId' in item;
}

isFolder(item: any): item is FolderModel {
    return 'folderId' in item;
}

isFile(item: any): item is CatalogFileModel {
    return 'fileId' in item;
}
openCreateCategoryDialog(): void {
    const dialogRef = this.dialog.open(AddproductComponent, {
      width: '400px',
      data: {
        customerId: this.customerId,
        userId: this.userId
      }
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.categories.push(result);
        this.updateDashboardStats();
        this.showSuccess('Category created successfully');
      }
    });
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