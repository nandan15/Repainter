using DataEntities.Enquiry;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Shared.Contexts.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace DataServices.Enquiry.Commands
{
    public class UpdateEnquiryImages : IRequest<bool>
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public List<string> Images { get; set; }
    }
    public class UpdateEnquiryImagesHandler : IRequestHandler<UpdateEnquiryImages, bool>
    {
        private readonly IUnitOfWork _context;
        private readonly ILogger<UpdateEnquiryImagesHandler> _logger;

        public UpdateEnquiryImagesHandler(IUnitOfWork context, ILogger<UpdateEnquiryImagesHandler> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<bool> Handle(UpdateEnquiryImages request, CancellationToken cancellationToken)
        {
            try
            {
                _logger.LogInformation($"Attempting to find enquiry with ID: {request.Id}");

                var query = _context.Repository<DataEntities.Enquiry.Enquiry>().Get();

                if (query is IQueryable<DataEntities.Enquiry.Enquiry> efQuery)
                {
                    var sql = efQuery.ToQueryString();
                    _logger.LogInformation($"Generated SQL query: {sql}");
                }

                var allIds = await query.Select(x => x.Id).ToListAsync();
                _logger.LogInformation($"Available enquiry IDs in database: {string.Join(", ", allIds)}");

                var existingEnquiry = await query.FirstOrDefaultAsync(x => x.Id == request.Id);

                if (existingEnquiry == null)
                {
                    _logger.LogWarning($"No enquiry found for ID {request.Id}. Database contains {allIds.Count} records.");
                    return false;
                }

                _logger.LogInformation($"Found enquiry: ID={existingEnquiry.Id}, Deleted={existingEnquiry.Deleted}");

                // Handle the image data based on the type
                if (request.Type == "floor")
                {
                    // If FloorPlan is not a JSON array, treat it as a single base64-encoded string
                    var existingImage = existingEnquiry.FloorPlan;
                    var newImages = request.Images;

                    // Combine the existing image with the new images (if any)
                    var updatedImages = new List<string>();
                    if (!string.IsNullOrEmpty(existingImage))
                    {
                        updatedImages.Add(existingImage);
                    }
                    updatedImages.AddRange(newImages);

                    // Store the updated images as a JSON array
                    existingEnquiry.FloorPlan = JsonSerializer.Serialize(updatedImages);
                    _logger.LogInformation($"Updated floor plan images. Total images: {updatedImages.Count}");
                }
                else if (request.Type == "site")
                {
                    // If SitePlan is not a JSON array, treat it as a single base64-encoded string
                    var existingImage = existingEnquiry.SitePlan;
                    var newImages = request.Images;

                    // Combine the existing image with the new images (if any)
                    var updatedImages = new List<string>();
                    if (!string.IsNullOrEmpty(existingImage))
                    {
                        updatedImages.Add(existingImage);
                    }
                    updatedImages.AddRange(newImages);

                    // Store the updated images as a JSON array
                    existingEnquiry.SitePlan = JsonSerializer.Serialize(updatedImages);
                    _logger.LogInformation($"Updated site plan images. Total images: {updatedImages.Count}");
                }

                _context.Repository<DataEntities.Enquiry.Enquiry>().Update(existingEnquiry);
                await _context.SaveAsync();
                _logger.LogInformation($"Successfully updated enquiry {request.Id} with new images");
                return true;
            }
            catch (Exception ex)

            {
                _logger.LogError(ex, $"Error updating images for enquiry {request.Id}. Error: {ex.Message}");
                throw;
            }
        }
    }
}
