using DataModels.ProductManagement;
using DataServices.CatalogService;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Net;

namespace RepainterAPI.Controllers.v1.ProductManagement
{
    [Route("v{apiVersion}/Product")]
    [ApiController]
    [Authorize]
    public class ProductManagementCommandController : ControllerBase
    {
        private readonly IMediator _mediator;

        private readonly ICatalogService _catalogService;

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
                var result = await _catalogService.CreateFolderAsync(folder);
                return Ok(result);
            }
            catch (Exception ex)
            {
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
        public async Task<ActionResult<CatalogFileModel>> UploadFile([FromForm] CatalogFileModel file, IFormFile uploadedFile)
        {
            try
            {
                var result = await _catalogService.UploadFileAsync(file, uploadedFile);
                return Ok(result);
            }
            catch (Exception ex)
            {
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
    }
}