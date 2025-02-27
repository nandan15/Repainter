using DataCore;
using DataModels.Enquiry;
using DataModels.Exceptions;
using DataServices.Customer;
using DataServices.Repository.CustomerRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace RepainterAPI.Controllers.v1.Enquiry
{
    [Route("v{apiVersion}/enquiry")]
    [ApiController]
    [Authorize]
    public class EnquiryQueryController : ControllerBase
    {
        private readonly ICustomerService _customerService;
        private readonly ILogger<EnquiryCommandController> _logger;

        public EnquiryQueryController(ICustomerService enquiryService, ILogger<EnquiryCommandController> logger)
        {
            _customerService = enquiryService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EnquiryModel>>> GetAll()
        {
            var enquiries = await _customerService.GetAllAsync();
            return Ok(enquiries);
        }

        [HttpGet("next-id")]
        public async Task<ActionResult<object>> GetNextEnquiryId()
        {
            var nextId = await _customerService.GetNextEnquiryIdAsync();
            return Ok(new { enquiryId = nextId });
        }
        [HttpGet("{id}/physical-images")]
        [ProducesResponseType(typeof(Dictionary<string, List<string>>), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [SwaggerOperation(Summary = "Get all physical images for a customer",
     Description = "Retrieves all floor plan and site plan images from physical storage for a specific customer")]
        public async Task<ActionResult<Dictionary<string, List<string>>>> GetCustomerPhysicalImages(int id)
        {
            try
            {
                var images = await _customerService.GetCustomerImagesFromStorageAsync(id);
                if (images == null)
                {
                    return NotFound(new { message = $"Customer with ID {id} not found or has been deleted" });
                }
                var baseUrl = $"{Request.Scheme}://{Request.Host.Value}/";
                foreach (var key in images.Keys)
                {
                    for (int i = 0; i < images[key].Count; i++)
                    {
                        images[key][i] = baseUrl + images[key][i];
                    }
                }

                return Ok(images);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving physical images for customer {id}");
                return StatusCode((int)HttpStatusCode.InternalServerError,
                    new { message = "An error occurred while retrieving customer images from physical storage" });
            }
        }
    }
}