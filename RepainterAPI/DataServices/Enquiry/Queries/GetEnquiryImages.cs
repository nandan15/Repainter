using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using DataModels.ImageUpload;
using Shared.Contexts.Base;

public class GetCustomerImages : IRequest<CustomerImagesModel>
{
    public int CustomerId { get; set; }
}

public class GetCustomerImagesHandler : IRequestHandler<GetCustomerImages, CustomerImagesModel>
{
    private readonly IUnitOfWork _context;
    private readonly ILogger<GetCustomerImagesHandler> _logger;

    public GetCustomerImagesHandler(IUnitOfWork context, ILogger<GetCustomerImagesHandler> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<CustomerImagesModel> Handle(GetCustomerImages request, CancellationToken cancellationToken)
    {
        try
        {
            _logger.LogInformation($"Retrieving all images for customer ID: {request.CustomerId}");

            var enquiries = await _context.Repository<DataEntities.Enquiry.Enquiry>()
                .Get()
                .Where(x => x.Id == request.CustomerId && !x.Deleted)
                .ToListAsync();

            if (!enquiries.Any())
            {
                _logger.LogWarning($"No enquiries found for customer ID {request.CustomerId}");
                return new CustomerImagesModel
                {
                    Success = false,
                    CustomerId = request.CustomerId
                };
            }

            var result = new CustomerImagesModel
            {
                Success = true,
                CustomerId = request.CustomerId
            };

            foreach (var enquiry in enquiries)
            {
                var enquiryImages = new EnquiryImagesModel
                {
                    EnquiryId = enquiry.Id
                };

                // Process Floor Plan Images
                if (!string.IsNullOrEmpty(enquiry.FloorPlan))
                {
                    try
                    {
                        enquiryImages.FloorPlanImages = JsonSerializer.Deserialize<List<string>>(enquiry.FloorPlan);
                    }
                    catch
                    {
                        // Handle case where FloorPlan is stored as single string
                        enquiryImages.FloorPlanImages = new List<string> { enquiry.FloorPlan };
                    }
                }

                // Process Site Plan Images
                if (!string.IsNullOrEmpty(enquiry.SitePlan))
                {
                    try
                    {
                        enquiryImages.SitePlanImages = JsonSerializer.Deserialize<List<string>>(enquiry.SitePlan);
                    }
                    catch
                    {
                        // Handle case where SitePlan is stored as single string
                        enquiryImages.SitePlanImages = new List<string> { enquiry.SitePlan };
                    }
                }

                // Only add enquiries that have images
                if (enquiryImages.FloorPlanImages.Any() || enquiryImages.SitePlanImages.Any())
                {
                    result.EnquiryImages.Add(enquiryImages);
                }
            }

            _logger.LogInformation($"Successfully retrieved images from {result.EnquiryImages.Count} enquiries for customer {request.CustomerId}");
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error retrieving images for customer {request.CustomerId}");
            throw;
        }
    }
}
