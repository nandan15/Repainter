using DataCore;
using DataModels.Enquiry;
using DataModels.Exceptions;
using DataModels.ImageUpload;
using DataServices.Enquiry.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Data.Entity;
using System.Net;
using System.Text.Json;

namespace RepainterAPI.Controllers.v1.Enquiry
{
    [Route("v{apiVersion}/enquiry")]
    [ApiController]
    [Authorize]
    public class EnquiryQueryController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly RepainterContext _context;
        private readonly ILogger<EnquiryQueryController> _logger;

        public EnquiryQueryController(
         IMediator mediator,
         RepainterContext context,
         ILogger<EnquiryQueryController> logger)
        {
            _mediator = mediator;
            _context = context;
            _logger = logger;
        }

        [HttpGet("")]
        [ProducesResponseType(typeof(IEnumerable<EnquiryModel>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "Enquiry" })]
        public async Task<IActionResult> GetAllEnquiry([FromQuery] Dictionary<string, string> filters, [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        {
            var enquiry = await _mediator.Send(new GetEnquiry { Filters = filters, PageSize = pageSize, Page = page });
            return Ok(enquiry);
        }

        [HttpGet("id")]
        [ProducesResponseType(typeof(IEnumerable<EnquiryModel>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "Enquiry" })]
        public async Task<IActionResult> GetEnquiryById(int id)
        {
            var enquiry = await _mediator.Send(new GetEnquiryById { Id = id });
            return Ok(enquiry);
        }

        [HttpGet("customer-images/{customerId}")]
        [ProducesResponseType(typeof(CustomerImagesModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "Enquiry" })]
        public async Task<IActionResult> GetCustomerImages(int customerId)
        {
            try
            {
                var result = await _mediator.Send(new GetCustomerImages
                {
                    CustomerId = customerId
                });

                if (!result.Success)
                    return NotFound($"No images found for customer ID {customerId}");

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving images for customer {customerId}");
                return StatusCode(500, new InternalErrorViewModel { Message = "Error retrieving customer images" });
            }
        }

        // Helper method for file upload - implement based on your storage solution
        private async Task<string> UploadFileToStorage(IFormFile file)
        {
            // This is a placeholder - implement your actual file storage logic here
            // Could be Azure Blob Storage, AWS S3, or local file system

            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            var filePath = Path.Combine("upload", fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Return the URL where the file can be accessed
            return $"/uploads/{fileName}";
        }

        [HttpGet("latest-id")]
        [ProducesResponseType(typeof(object), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "Enquiry" })]
        public async Task<IActionResult> GetLatestCustomerId()
        {
            try
            {
                var nextId = await _mediator.Send(new GenerateNextEnquiryId());
                return Ok(new { lastId = nextId });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new InternalErrorViewModel { Message = ex.Message });
            }
        }
    }
}
