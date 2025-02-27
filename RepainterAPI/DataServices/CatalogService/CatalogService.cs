using DataCore;
using DataEntities.Product;
using DataModels.ProductManagement;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
namespace DataServices.CatalogService
{
    public class CatalogService : ICatalogService
    {
        private readonly RepainterContext _context;
        private readonly IWebHostEnvironment _environment;
        private const int MAX_FILES_PER_FOLDER = 5;
        private const long PRIORITY_FILE_SIZE_LIMIT = 300 * 1024 * 1024;
        private const long REGULAR_FILE_SIZE_LIMIT = 30 * 1024 * 1024;

        public CatalogService(RepainterContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        public async Task<CategoryModel> CreateCategoryAsync(CategoryModel category)
        {
            var entity = new Category
            {
                Name = category.Name,
                CustomerId = category.CustomerId,
                UserId = category.UserId,
                CreatedBy = category.CreatedBy,
                CreatedOn = DateTime.UtcNow
            };

            _context.Categories.Add(entity);
            await _context.SaveChangesAsync();

            category.CategoryId = entity.CategoryId;
            return category;
        }

        public async Task<CategoryModel> UpdateCategoryAsync(CategoryModel category)
        {
            var entity = await _context.Categories.FindAsync(category.CategoryId);
            if (entity == null) throw new KeyNotFoundException("Category not found");

            entity.Name = category.Name;
            entity.LastModifiedBy = category.LastModifiedBy;
            entity.LastModifiedOn = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return category;
        }

        public async Task<bool> DeleteCategoryAsync(int categoryId, int userId)
        {
            var entity = await _context.Categories
                .FirstOrDefaultAsync(c => c.CategoryId == categoryId && c.UserId == userId);

            if (entity == null) return false;

            entity.IsDeleted = true;
            entity.LastModifiedOn = DateTime.UtcNow;
            entity.LastModifiedBy = userId;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<FolderModel> CreateFolderAsync(FolderModel folder)
        {
            var entity = new Folder
            {
                Name = folder.Name,
                CategoryId = folder.CategoryId,
                CustomerId = folder.CustomerId,
                UserId = folder.UserId,
                CreatedBy = folder.CreatedBy,
                CreatedOn = DateTime.UtcNow
            };

            _context.Folders.Add(entity);
            await _context.SaveChangesAsync();

            folder.FolderId = entity.FolderId;
            return folder;
        }
        public async Task<FolderModel> UpdateFolderAsync(FolderModel folder)
        {
            var entity = await _context.Folders.FindAsync(folder.FolderId);
            if (entity == null) throw new KeyNotFoundException("Folder not found");

            entity.Name = folder.Name;
            entity.LastModifiedBy = folder.LastModifiedBy;
            entity.LastModifiedOn = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return folder;
        }

        public async Task<bool> DeleteFolderAsync(int folderId, int userId)
        {
            var entity = await _context.Folders
                .FirstOrDefaultAsync(f => f.FolderId == folderId && f.UserId == userId);

            if (entity == null) return false;

            entity.IsDeleted = true;
            entity.LastModifiedOn = DateTime.UtcNow;
            entity.LastModifiedBy = userId;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<CatalogFileModel> UploadFileAsync(CatalogFileModel file, IFormFile uploadedFile)
        {
            // Get all non-deleted files in the folder
            var filesInFolder = await _context.CatalogFile
                .Where(f => f.FolderId == file.FolderId && !f.IsDeleted)
                .OrderBy(f => f.CreatedOn)
                .ToListAsync();

            // Check if this file would be one of the first 5 large files
            var largeFilesCount = filesInFolder.Count(f => f.FileSize > REGULAR_FILE_SIZE_LIMIT);
            bool canBeLargeFile = largeFilesCount < 5;

            // Determine the maximum allowed size for this upload
            long maxAllowedSize;
            string errorMessage;

            if (canBeLargeFile)
            {
                maxAllowedSize = PRIORITY_FILE_SIZE_LIMIT; // 300MB
                errorMessage = $"File size exceeds the maximum allowed size of {PRIORITY_FILE_SIZE_LIMIT / (1024 * 1024)}MB for priority files.";
            }
            else
            {
                maxAllowedSize = REGULAR_FILE_SIZE_LIMIT; // 30MB
                errorMessage = $"Only the first 5 files can be up to 300MB. Additional files must be {REGULAR_FILE_SIZE_LIMIT / (1024 * 1024)}MB or smaller.";
            }

            // Validate file size
            if (uploadedFile.Length > maxAllowedSize)
            {
                throw new InvalidOperationException(errorMessage);
            }

            // Create folder structure
            var categoryName = await GetCategoryNameAsync(file.CategoryId);
            var folderName = await GetFolderNameAsync(file.FolderId);

            var baseUploadsPath = Path.Combine(_environment.WebRootPath, "uploads");
            var categoryPath = Path.Combine(baseUploadsPath, categoryName);
            var folderPath = Path.Combine(categoryPath, folderName);

            // Create directories if they don't exist
            Directory.CreateDirectory(baseUploadsPath);
            Directory.CreateDirectory(categoryPath);
            Directory.CreateDirectory(folderPath);

            // Generate unique filename
            var uniqueFileName = $"{Guid.NewGuid()}{Path.GetExtension(uploadedFile.FileName)}";
            var filePath = Path.Combine(folderPath, uniqueFileName);

            // Save file to disk
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await uploadedFile.CopyToAsync(stream);
            }

            // Set relative file path for database
            file.FilePath = Path.Combine(
                "uploads",
                categoryName,
                folderName,
                uniqueFileName
            ).Replace("\\", "/");

            // Create database entry
            var entity = new CatalogFile
            {
                Name = file.Name,
                FileType = file.FileType,
                FilePath = file.FilePath,
                FolderId = file.FolderId,
                CategoryId = file.CategoryId,
                CustomerId = file.CustomerId,
                UserId = file.UserId,
                CreatedBy = file.CreatedBy,
                CreatedOn = DateTime.UtcNow,
                FileSize = uploadedFile.Length,
                IsDeleted = false
            };

            _context.CatalogFile.Add(entity);
            await _context.SaveChangesAsync();
            file.FileId = entity.FileId;
            return file;
        }
        private async Task<string> GetCategoryNameAsync(int categoryId)
        {
            var category = await _context.Categories.FindAsync(categoryId);
            if (category == null)
                throw new KeyNotFoundException("Category not found");
            return category.Name.Replace(" ", "_");
        }

        private async Task<string> GetFolderNameAsync(int folderId)
        {
            var folder = await _context.Folders.FindAsync(folderId);
            if (folder == null)
                throw new KeyNotFoundException("Folder not found");
            return folder.Name.Replace(" ", "_");
        }
        public async Task<bool> DeleteFileAsync(int fileId, int userId)
        {
            var entity = await _context.CatalogFile
                .FirstOrDefaultAsync(f => f.FileId == fileId && f.UserId == userId);

            if (entity == null) return false;

            entity.IsDeleted = true;
            entity.LastModifiedOn = DateTime.UtcNow;
            entity.LastModifiedBy = userId;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<CategoryModel>> GetCategoriesByCustomerAsync(int customerId, int userId)
        {
            return await _context.Categories
                .Where(c => c.CustomerId == customerId && c.UserId == userId && !c.IsDeleted)
                .Select(c => new CategoryModel
                {
                    CategoryId = c.CategoryId,
                    Name = c.Name,
                    CustomerId = c.CustomerId,
                    UserId = c.UserId,
                    CreatedBy = c.CreatedBy,
                    CreatedOn = c.CreatedOn,
                    LastModifiedBy = c.LastModifiedBy,
                    LastModifiedOn = c.LastModifiedOn
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<FolderModel>> GetFoldersByCategory(int categoryId, int customerId, int userId)
        {
            return await _context.Folders
                .Where(f => f.CategoryId == categoryId &&
                           f.CustomerId == customerId &&
                           f.UserId == userId &&
                           !f.IsDeleted)
                .Select(f => new FolderModel
                {
                    FolderId = f.FolderId,
                    Name = f.Name,
                    CategoryId = f.CategoryId,
                    CustomerId = f.CustomerId,
                    UserId = f.UserId,
                    CreatedBy = f.CreatedBy,
                    CreatedOn = f.CreatedOn,
                    LastModifiedBy = f.LastModifiedBy,
                    LastModifiedOn = f.LastModifiedOn
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<CatalogFileModel>> GetFilesByFolder(int folderId, int customerId, int userId)
        {
            return await _context.CatalogFile
                .Where(f => f.FolderId == folderId &&
                           f.CustomerId == customerId &&
                           f.UserId == userId &&
                           !f.IsDeleted)
                .Select(f => new CatalogFileModel
                {
                    FileId = f.FileId,
                    Name = f.Name,
                    FileType = f.FileType,
                    FilePath = f.FilePath,
                    FolderId = f.FolderId,
                    CategoryId = f.CategoryId,
                    CustomerId = f.CustomerId,
                    UserId = f.UserId,
                    CreatedBy = f.CreatedBy,
                    CreatedOn = f.CreatedOn,
                    LastModifiedBy = f.LastModifiedBy,
                    LastModifiedOn = f.LastModifiedOn
                })
                .ToListAsync();
        }
        public async Task<CategoryModel> CheckCategoryExistsAsync(string categoryName, int customerId)
        {
            var category = await _context.Categories
                .Where(c => c.Name == categoryName && c.CustomerId == customerId && !c.IsDeleted)
                .Select(c => new CategoryModel
                {
                    CategoryId = c.CategoryId,
                    Name = c.Name,
                    CustomerId = c.CustomerId,
                    UserId = c.UserId,
                    CreatedBy = c.CreatedBy,
                    CreatedOn = c.CreatedOn,
                    LastModifiedBy = c.LastModifiedBy,
                    LastModifiedOn = c.LastModifiedOn
                })
                .FirstOrDefaultAsync();

            return category; 
        }

    }

}
