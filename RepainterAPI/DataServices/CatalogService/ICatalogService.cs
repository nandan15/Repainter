using DataModels.ProductManagement;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.CatalogService
{
    public interface ICatalogService
    {
        Task<CategoryModel> CreateCategoryAsync(CategoryModel category);
        Task<CategoryModel> UpdateCategoryAsync(CategoryModel category);
        Task<bool> DeleteCategoryAsync(int categoryId, int userId);
        Task<FolderModel> CreateFolderAsync(FolderModel folder);
        Task<FolderModel> UpdateFolderAsync(FolderModel folder);
        Task<bool> DeleteFolderAsync(int folderId, int userId);
        Task<CatalogFileModel> UploadFileAsync(CatalogFileModel file, IFormFile uploadedFile);
        Task<bool> DeleteFileAsync(int fileId, int userId);
        Task<IEnumerable<CategoryModel>> GetCategoriesByCustomerAsync(int customerId, int userId);
        Task<IEnumerable<FolderModel>> GetFoldersByCategory(int categoryId, int customerId, int userId);
        Task<IEnumerable<CatalogFileModel>> GetFilesByFolder(int folderId, int customerId, int userId);
    }
}
