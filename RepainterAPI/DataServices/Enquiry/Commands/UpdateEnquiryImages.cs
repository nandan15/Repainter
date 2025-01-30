using DataEntities.Enquiry;
using MediatR;
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

        public UpdateEnquiryImagesHandler(IUnitOfWork context)
        {
            _context = context;
        }

        public async Task<bool> Handle(UpdateEnquiryImages request, CancellationToken cancellationToken)
        {
            var existingEnquiry = _context.Repository<DataEntities.Enquiry.Enquiry>()
                .Get()
                .Where(x => x.Id == request.Id)
                .FirstOrDefault();

            if (existingEnquiry == null)
                return false;

            try
            {
                if (request.Type == "floor")
                {
                    var existingImages = string.IsNullOrEmpty(existingEnquiry.FloorPlan)
                        ? new List<string>()
                        : JsonSerializer.Deserialize<List<string>>(existingEnquiry.FloorPlan) ?? new List<string>();
                    existingImages.AddRange(request.Images); // Append new images
                    existingEnquiry.FloorPlan = JsonSerializer.Serialize(existingImages);
                }
                else if (request.Type == "site")
                {
                    var existingImages = string.IsNullOrEmpty(existingEnquiry.SitePlan)
                        ? new List<string>()
                        : JsonSerializer.Deserialize<List<string>>(existingEnquiry.SitePlan) ?? new List<string>();
                    existingImages.AddRange(request.Images); // Append new images
                    existingEnquiry.SitePlan = JsonSerializer.Serialize(existingImages);
                }

                await _context.SaveAsync();
                return true;
            }
            catch (JsonException ex)
            {
                Console.Error.WriteLine($"JSON deserialization error: {ex.Message}");
                return false;
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Error updating images: {ex.Message}");
                return false;
            }
        }
    }
}
