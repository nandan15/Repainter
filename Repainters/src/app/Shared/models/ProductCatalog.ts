export class CategoryModel {
    categoryId!: number;
    name!: string;
    customerId!: number;
    userId!: number;
    createdBy!: number;
    createdOn!: Date;
    lastModifiedBy?: number;
    lastModifiedOn?: Date;
    isDeleted!: boolean;
    folders?: FolderModel[];
  }
  
  export class FolderModel {
    folderId!: number;
    name!: string;
    categoryId!: number;
    parentFolderId?: number | null;  // Update this line to allow null
    customerId!: number;
    userId!: number;
    createdBy!: number;
    createdOn!: Date;
    lastModifiedBy?: number;
    lastModifiedOn?: Date;
    isDeleted!: boolean;
    category?: CategoryModel;
    parentFolder?: FolderModel;
    subFolders?: FolderModel[];
    files?: CatalogFileModel[];
}
  
  export class CatalogFileModel {
    fileId!: number;
    name!: string;
    fileType!: string;
    filePath!: string;
    fileSize!:number;
    folderId!: number;
    categoryId!: number;
    customerId!: number;
    userId!: number;
    createdBy!: number;
    createdOn!: Date;
    lastModifiedBy?: number;
    lastModifiedOn?: Date;
    isDeleted!: boolean;
    folder?: FolderModel;
    category?: CategoryModel;
  }
  export class DashboardStats{
    totalProducts!: number;
    totalCategories!: number;
    recentUploads!: number;
  }