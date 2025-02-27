import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { CatalogService } from 'src/app/Shared/Service/ProductCatalog/ProductCatalog.service';
import { CategoryModel, FolderModel, CatalogFileModel } from 'src/app/Shared/models/ProductCatalog';

export interface CategoryData {
  category: CategoryModel | null;
  folders: FolderModel[];
  files: CatalogFileModel[];
}

@Injectable({
  providedIn: 'root'
})
export class CategoryResolver implements Resolve<CategoryData> {
  constructor(private catalogService: CatalogService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CategoryData> {
    const categoryId = Number(route.paramMap.get('id'));
    const customerId = 1; // Replace with actual customer ID
    const userId = 1; // Replace with actual user ID

    return this.catalogService.getCategories(customerId, userId).pipe(
      switchMap(categories => {
        const category = categories.find(cat => cat.categoryId === categoryId);
        
        if (!category) {
          return of({ category: null, folders: [], files: [] });
        }

        return forkJoin({
          category: of(category),
          folders: this.catalogService.getFolders(categoryId, customerId, userId),
          files: this.catalogService.getFolders(categoryId, customerId, userId).pipe(
            switchMap(folders => {
              if (folders.length === 0) {
                return of([]);
              }
              
              const fileObservables = folders.map(folder =>
                this.catalogService.getFiles(folder.folderId, customerId, userId)
              );
              
              return forkJoin(fileObservables).pipe(
                map(filesArrays => filesArrays.flat()),
                catchError(() => of([]))
              );
            })
          )
        });
      }),
      catchError(() => of({ category: null, folders: [], files: [] }))
    );
  }
}