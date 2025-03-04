using DataModels.ProductManagement;
using DataServices.CatalogService;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Net;
using System.Text.Json;

namespace RepainterAPI.Controllers.v1.ProductManagement
{
    [Route("v{apiVersion}/Product")]
    [ApiController]
    [Authorize]
    public class ProductManagementCommandController : ControllerBase
    {
        private readonly IMediator _mediator;

        private readonly ICatalogService _catalogService;
        private readonly IWebHostEnvironment _environment;

        public ProductManagementCommandController(ICatalogService catalogService)
        {
            _catalogService = catalogService;
        }

        [HttpPost("category")]
        public async Task<ActionResult<CategoryModel>> CreateCategory([FromBody] CategoryModel category)
        {
            try
            {
                var result = await _catalogService.CreateCategoryAsync(category);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error creating category: {ex.Message}");
            }
        }

        [HttpPut("category")]
        public async Task<ActionResult<CategoryModel>> UpdateCategory([FromBody] CategoryModel category)
        {
            try
            {
                var result = await _catalogService.UpdateCategoryAsync(category);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error updating category: {ex.Message}");
            }
        }

        [HttpDelete("category/{categoryId}/{userId}")]
        public async Task<ActionResult<bool>> DeleteCategory(int categoryId, int userId)
        {
            try
            {
                var result = await _catalogService.DeleteCategoryAsync(categoryId, userId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error deleting category: {ex.Message}");
            }
        }

        [HttpPost("folder")]
        public async Task<ActionResult<FolderModel>> CreateFolder([FromBody] FolderModel folder)
        {
            try
            {
                Console.WriteLine($"Received folder data: {JsonSerializer.Serialize(folder)}");
                if (!ModelState.IsValid)
                {
                    var errors = ModelState.Values
                        .SelectMany(v => v.Errors)
                        .Select(e => e.ErrorMessage);
                    return BadRequest(new { errors = errors });
                }
                if (folder.CategoryId <= 0 || folder.CustomerId <= 0 || folder.UserId <= 0)
                {
                    return BadRequest(new { error = "Invalid CategoryId, CustomerId, or UserId" });
                }

                var result = await _catalogService.CreateFolderAsync(folder);
                return Ok(result);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error creating folder: {ex}");
                return BadRequest($"Error creating folder: {ex.Message}");
            }
        }

        [HttpPut("folder")]
        public async Task<ActionResult<FolderModel>> UpdateFolder([FromBody] FolderModel folder)
        {
            try
            {
                var result = await _catalogService.UpdateFolderAsync(folder);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error updating folder: {ex.Message}");
            }
        }

        [HttpDelete("folder/{folderId}/{userId}")]
        public async Task<ActionResult<bool>> DeleteFolder(int folderId, int userId)
        {
            try
            {
                var result = await _catalogService.DeleteFolderAsync(folderId, userId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error deleting folder: {ex.Message}");
            }
        }

        [HttpPost("file")]
        [DisableRequestSizeLimit]
        public async Task<ActionResult<CatalogFileModel>> UploadFile(
      IFormFile uploadedFile,
      [FromForm] int folderId,
      [FromForm] int categoryId,
      [FromForm] int customerId,
      [FromForm] int userId)
        {
            try
            {
                if (uploadedFile == null)
                    return BadRequest("No file uploaded");

                // Validate IDs
                if (folderId <= 0 || categoryId <= 0 || customerId <= 0 || userId <= 0)
                    return BadRequest("Invalid ID values provided");

                var file = new CatalogFileModel
                {
                    Name = uploadedFile.FileName,
                    FileType = uploadedFile.ContentType,
                    FolderId = folderId,
                    CategoryId = categoryId,
                    CustomerId = customerId,
                    UserId = userId,
                    CreatedBy = userId,
                    CreatedOn = DateTime.UtcNow,
                    IsDeleted = false
                };

                var result = await _catalogService.UploadFileAsync(file, uploadedFile);
                return Ok(result);
            }
            catch (Exception ex)
            {
                // Log the full exception details
                Console.WriteLine($"Error uploading file: {ex}");
                return BadRequest($"Error uploading file: {ex.Message}");
            }
        }

        [HttpDelete("file/{fileId}/{userId}")]
        public async Task<ActionResult<bool>> DeleteFile(int fileId, int userId)
        {
            try
            {
                var result = await _catalogService.DeleteFileAsync(fileId, userId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error deleting file: {ex.Message}");
            }
        }

        [HttpGet("categories/{customerId}/{userId}")]
        public async Task<ActionResult<IEnumerable<CategoryModel>>> GetCategories(int customerId, int userId)
        {
            try
            {
                var categories = await _catalogService.GetCategoriesByCustomerAsync(customerId, userId);
                return Ok(categories);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error retrieving categories: {ex.Message}");
            }
        }

        [HttpGet("folders/{categoryId}/{customerId}/{userId}")]
        public async Task<ActionResult<IEnumerable<FolderModel>>> GetFolders(int categoryId, int customerId, int userId)
        {
            try
            {
                var folders = await _catalogService.GetFoldersByCategory(categoryId, customerId, userId);
                return Ok(folders);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error retrieving folders: {ex.Message}");
            }
        }

        [HttpGet("files/{folderId}/{customerId}/{userId}")]
        public async Task<ActionResult<IEnumerable<CatalogFileModel>>> GetFiles(int folderId, int customerId, int userId)
        {
            try
            {
                var files = await _catalogService.GetFilesByFolder(folderId, customerId, userId);
                return Ok(files);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error retrieving files: {ex.Message}");
            }
        }
        // ProductManagementCommandController.cs
        [HttpGet("file/{filePath}")]
        public IActionResult GetFile([FromRoute] string filePath)
        {
            try
            {
                var fullPath = Path.Combine(_environment.WebRootPath, filePath);
                if (!System.IO.File.Exists(fullPath))
                {
                    return NotFound();
                }

                // Get file's MIME type
                var mimeType = GetMimeType(Path.GetExtension(fullPath));
                return PhysicalFile(fullPath, mimeType);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error retrieving file: {ex.Message}");
            }
        }

        private string GetMimeType(string extension)
        {
            var mimeTypes = new Dictionary<string, string>
    {
        {".txt", "text/plain"},
        {".pdf", "application/pdf"},
        {".doc", "application/vnd.ms-word"},
        {".docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"},
        {".xls", "application/vnd.ms-excel"},
        {".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"},
        {".png", "image/png"},
        {".jpg", "image/jpeg"},
        {".jpeg", "image/jpeg"},
        {".gif", "image/gif"},
        {".csv", "text/csv"}
    };

            return mimeTypes.TryGetValue(extension.ToLower(), out string mimeType)
                ? mimeType
                : "application/octet-stream";
        }
    

[HttpGet("category/exists/{categoryName}/{customerId}")]
        public async Task<ActionResult<bool>> CheckCategoryExists(string categoryName, int customerId)
        {
            try
            {
                var exists = await _catalogService.CheckCategoryExistsAsync(categoryName, customerId);
                return Ok(exists);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error checking category existence: {ex.Message}");
            }
        }
    }
}