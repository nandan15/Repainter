import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, switchMap } from 'rxjs';
import { environment } from 'src/environment/environment';
import { CategoryModel, FolderModel, CatalogFileModel } from '../../models/ProductCatalog';
@Injectable({
    providedIn: 'root'
  })
  export class CatalogService {
    private baseUrl = `${environment.backend.baseURL}v1/Product`;
  
    constructor(private http: HttpClient) {}
    createCategory(category: CategoryModel): Observable<CategoryModel> {
      return this.http.post<CategoryModel>(`${this.baseUrl}/category`, category);
    }
  
    updateCategory(category: CategoryModel): Observable<CategoryModel> {
      return this.http.put<CategoryModel>(`${this.baseUrl}/category`, category);
    }
  
    deleteCategory(categoryId: number, userId: number): Observable<boolean> {
      return this.http.delete<boolean>(`${this.baseUrl}/category/${categoryId}/${userId}`);
    }
  
    getCategories(customerId: number, userId: number): Observable<CategoryModel[]> {
      return this.http.get<CategoryModel[]>(`${this.baseUrl}/categories/${customerId}/${userId}`);
    }
    createFolder(folder: FolderModel): Observable<FolderModel> {
      console.log('Sending folder data:', JSON.stringify(folder, null, 2));
      return this.http.post<FolderModel>(`${this.baseUrl}/folder`, folder)
        .pipe(
          catchError(error => {
            console.error('Server error response:', error);
            throw error;
          })
        );
    }
  
    updateFolder(folder: FolderModel): Observable<FolderModel> {
      return this.http.put<FolderModel>(`${this.baseUrl}/folder`, folder);
    }
  
    deleteFolder(folderId: number, userId: number): Observable<boolean> {
      return this.http.delete<boolean>(`${this.baseUrl}/folder/${folderId}/${userId}`);
    }
  
    getFolders(categoryId: number, customerId: number, userId: number): Observable<FolderModel[]> {
      return this.http.get<FolderModel[]>(`${this.baseUrl}/folders/${categoryId}/${customerId}/${userId}`);
    }
  
    uploadFile(file: File, folderId: number, categoryId: number): Observable<CatalogFileModel> {
      const MAX_PRIORITY_SIZE = 300 * 1024 * 1024; // 300MB in bytes
      const MAX_REGULAR_SIZE = 30 * 1024 * 1024;   // 30MB in bytes
  
      // First check total file count across all folders
      return this.getFiles(0, 0, 0).pipe( // Pass 0 to get all files
          switchMap(files => {
              const totalFileCount = files.length;
              const sizeLimit = totalFileCount < 5 ? MAX_PRIORITY_SIZE : MAX_REGULAR_SIZE;
  
              if (file.size > sizeLimit) {
                  const limitInMB = sizeLimit / (1024 * 1024);
                  throw new Error(`File size exceeds the limit of ${limitInMB}MB`);
              }
  
              const formData = new FormData();
              formData.append('uploadedFile', file);
              formData.append('folderId', folderId.toString());
              formData.append('categoryId', categoryId.toString());
              formData.append('customerId', '1'); // Hardcoded for now
              formData.append('userId', '1'); // Hardcoded for now
  
              return this.http.post<CatalogFileModel>(`${this.baseUrl}/file`, formData);
          })
      );
  }
    deleteFile(fileId: number, userId: number): Observable<boolean> {
      return this.http.delete<boolean>(`${this.baseUrl}/file/${fileId}/${userId}`);
    }
  
    getFiles(folderId: number, customerId: number, userId: number): Observable<CatalogFileModel[]> {
      return this.http.get<CatalogFileModel[]>(`${this.baseUrl}/files/${folderId}/${customerId}/${userId}`);
    }
    checkCategoryExists(categoryName: string, customerId: number): Observable<boolean> {
      return this.http.get<boolean>(`${this.baseUrl}/category/exists/${encodeURIComponent(categoryName)}/${customerId}`);
    }
    
  }