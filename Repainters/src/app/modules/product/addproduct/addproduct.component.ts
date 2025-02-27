// addproduct.component.ts

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CatalogService } from 'src/app/Shared/Service/ProductCatalog/ProductCatalog.service';
import { CategoryModel } from 'src/app/Shared/models/ProductCatalog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent {
  categoryName: string = '';
  isSaving: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<AddproductComponent>,
    private catalogService: CatalogService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSave(): void {
    if (!this.categoryName) {
      this.snackBar.open('Category name is required', 'Close', { duration: 3000 });
      return;
    }

    this.isSaving = true;

    // Check if category already exists
    this.catalogService.checkCategoryExists(this.categoryName, this.data.customerId).subscribe({
      next: (exists) => {
        if (exists) {
          this.snackBar.open('Category name already exists', 'Close', { duration: 3000 });
          this.isSaving = false;
        } else {
          this.saveCategory();
        }
      },
      error: (error) => {
        console.error('Error checking category existence:', error);
        this.isSaving = false;
      }
    });
  }

  private saveCategory(): void {
    const newCategory: CategoryModel = {
      categoryId: 0,
      name: this.categoryName,
      customerId: this.data.customerId,
      userId: this.data.userId,
      createdBy: this.data.userId,
      createdOn: new Date(),
      isDeleted: false
    };

    this.catalogService.createCategory(newCategory).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
      },
      error: (error) => {
        console.error('Error creating category:', error);
        this.isSaving = false;
      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}