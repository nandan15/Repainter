using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using System;
using System.IO;
using System.Threading.Tasks;
using System.Linq;

namespace DataServices.Repository.FileUploadStorage
{ 
    public class FileStorageService : IFileStorageService
    {
        private readonly IHostEnvironment _environment;
        private readonly ILogger<FileStorageService> _logger;
        private readonly FileUploadSettings _fileSettings;

        public FileStorageService(
            IHostEnvironment environment,
            ILogger<FileStorageService> logger,
            IOptions<FileUploadSettings> fileSettings)
        {
            _environment = environment;
            _logger = logger;
            _fileSettings = fileSettings.Value;
        }

        public async Task<string> UploadFileAsync(IFormFile file, string folder)
        {
            try
            {
                if (file == null || file.Length == 0)
                {
                    throw new ArgumentException("File is null or empty");
                }
                if (file.Length > _fileSettings.MaxFileSizeInBytes)
                {
                    throw new ArgumentException($"File size exceeds maximum limit of {_fileSettings.MaxFileSizeInBytes / (1024 * 1024)}MB");
                }
                var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
                if (!_fileSettings.AllowedExtensions.Contains(extension))
                {
                    throw new ArgumentException($"File type {extension} is not allowed");
                }
                var uploadsFolder = Path.Combine(_environment.ContentRootPath, "wwwroot", "upload", folder);
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }
                var fileName = $"{Guid.NewGuid()}{extension}";
                var filePath = Path.Combine(uploadsFolder, fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                _logger.LogInformation($"File successfully uploaded: {fileName} in folder: {folder}");
                return $"/{folder}/{fileName}";
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error uploading file in folder {folder}");
                throw;
            }
        }

        public async Task<bool> DeleteFileAsync(string fileUrl)
        {
            try
            {
                if (string.IsNullOrEmpty(fileUrl))
                {
                    _logger.LogWarning("Attempted to delete file with empty URL");
                    return false;
                }
                var urlParts = fileUrl.Split('/').Where(x => !string.IsNullOrEmpty(x)).ToArray();
                if (urlParts.Length < 3)
                {
                    _logger.LogWarning($"Invalid file URL format: {fileUrl}");
                    return false;
                }

                var folder = urlParts[^2]; 
                var fileName = urlParts[^1]; 
                var filePath = Path.Combine(_environment.ContentRootPath, "wwwroot", "upload", folder, fileName);

                if (File.Exists(filePath))
                {
                    await Task.Run(() => File.Delete(filePath));
                    _logger.LogInformation($"File successfully deleted: {filePath}");
                    return true;
                }

                _logger.LogWarning($"File not found for deletion: {filePath}");
                return false;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting file: {fileUrl}");
                return false;
            }
        }
    }
}