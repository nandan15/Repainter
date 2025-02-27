using MediatR;
using Shared.Contexts.Base;
using System.Text.Json;

public class UpdateEnquiryImagesCommand : IRequest<bool>
{
    public int EnquiryId { get; set; }
    public string ImageType { get; set; }
    public List<string> NewImages { get; set; }
}

public class UpdateEnquiryImagesHandler : IRequestHandler<UpdateEnquiryImagesCommand, bool>
{
    private readonly IUnitOfWork _context;
    private readonly ILogger<UpdateEnquiryImagesHandler> _logger;

    public UpdateEnquiryImagesHandler(IUnitOfWork context, ILogger<UpdateEnquiryImagesHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<bool> Handle(UpdateEnquiryImagesCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var enquiry = await _context.Repository<DataEntities.Enquiry.Enquiry>()
                .GetByIdAsync(request.EnquiryId);

            if (enquiry == null)
                return false;

            List<string> existingImages;
            if (request.ImageType.ToLower() == "floor")
            {
                existingImages = !string.IsNullOrEmpty(enquiry.FloorPlan) && IsValidJson(enquiry.FloorPlan)
                    ? JsonSerializer.Deserialize<List<string>>(enquiry.FloorPlan)
                    : new List<string>();

                existingImages.AddRange(request.NewImages);
                enquiry.FloorPlan = JsonSerializer.Serialize(existingImages);
            }
            else if (request.ImageType.ToLower() == "site")
            {
                existingImages = !string.IsNullOrEmpty(enquiry.SitePlan) && IsValidJson(enquiry.SitePlan)
                    ? JsonSerializer.Deserialize<List<string>>(enquiry.SitePlan)
                    : new List<string>();

                existingImages.AddRange(request.NewImages);
                enquiry.SitePlan = JsonSerializer.Serialize(existingImages);
            }
            else
            {
                throw new ArgumentException("Invalid image type");
            }

            enquiry.LastModified = DateTime.UtcNow;
            await _context.SaveAsync();
            return true;
        }
        catch (JsonException jsonEx)
        {
            _logger.LogError(jsonEx, "JSON deserialization error for Enquiry ID {EnquiryId}", request.EnquiryId);
            throw new Exception($"Error deserializing images for enquiry {request.EnquiryId}: {jsonEx.Message}", jsonEx);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating enquiry images for Enquiry ID {EnquiryId}", request.EnquiryId);
            throw new Exception($"Error updating enquiry images: {ex.Message}", ex);
        }
    }

    private bool IsValidJson(string jsonString)
    {
        try
        {
            JsonDocument.Parse(jsonString);
            return true;
        }
        catch (JsonException)
        {
            return false;
        }
    }
}