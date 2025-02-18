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
                ParentFolderId = folder.ParentFolderId,
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
            var uploadsFolder = Path.Combine(_environment.WebRootPath, "uploads");
            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var uniqueFileName = $"{Guid.NewGuid()}_{uploadedFile.FileName}";
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await uploadedFile.CopyToAsync(stream);
            }

            var entity = new CatalogFile
            {
                Name = file.Name,
                FileType = Path.GetExtension(uploadedFile.FileName),
                FilePath = uniqueFileName,
                FolderId = file.FolderId,
                CategoryId = file.CategoryId,
                CustomerId = file.CustomerId,
                UserId = file.UserId,
                CreatedBy = file.CreatedBy,
                CreatedOn = DateTime.UtcNow
            };

            _context.CatalogFile.Add(entity);
            await _context.SaveChangesAsync();

            file.FileId = entity.FileId;
            file.FilePath = uniqueFileName;
            return file;
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
                    ParentFolderId = f.ParentFolderId,
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
    }

}
