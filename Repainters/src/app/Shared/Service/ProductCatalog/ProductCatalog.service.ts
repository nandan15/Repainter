import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  
    // Folder operations
    createFolder(folder: FolderModel): Observable<FolderModel> {
      return this.http.post<FolderModel>(`${this.baseUrl}/folder`, folder);
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
  
    // File operations
    uploadFile(file: CatalogFileModel, uploadedFile: File): Observable<CatalogFileModel> {
      const formData = new FormData();
      formData.append('uploadedFile', uploadedFile);
      formData.append('file', JSON.stringify(file));
      return this.http.post<CatalogFileModel>(`${this.baseUrl}/file`, formData);
    }
  
    deleteFile(fileId: number, userId: number): Observable<boolean> {
      return this.http.delete<boolean>(`${this.baseUrl}/file/${fileId}/${userId}`);
    }
  
    getFiles(folderId: number, customerId: number, userId: number): Observable<CatalogFileModel[]> {
      return this.http.get<CatalogFileModel[]>(`${this.baseUrl}/files/${folderId}/${customerId}/${userId}`);
    }
  }