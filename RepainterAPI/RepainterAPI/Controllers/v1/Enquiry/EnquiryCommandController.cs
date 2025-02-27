using Microsoft.AspNetCore.Mvc;
using DataModels.Enquiry;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using DataModels.Exceptions;
using DataModels.ImageUpload;
using Microsoft.AspNetCore.Authorization;
using DataServices.Repository.CustomerRepository;
using DataServices.Customer;
using Newtonsoft.Json;
namespace RepainterAPI.Controllers.v1.Enquiry
{
    [Route("v{apiversion}/enquiry")]
    [ApiController]
    [Authorize]
    public class EnquiryCommandController : ControllerBase
    {
        private readonly ICustomerService _customerService;
        private readonly ILogger<EnquiryCommandController> _logger;

        public EnquiryCommandController(ICustomerService enquiryService, ILogger<EnquiryCommandController> logger)
        {
            _customerService = enquiryService;
            _logger = logger;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EnquiryModel>> GetById(int id)
        {
            var result = await _customerService.GetByIdAsync(id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(EnquiryModel))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<EnquiryModel>> Create([FromForm] string customerData,[FromForm] IFormFileCollection floorPlanImages,[FromForm] IFormFileCollection sitePlanImages)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var enquiryModel = JsonConvert.DeserializeObject<EnquiryModel>(customerData);
            if (enquiryModel == null)
            {
                return BadRequest("Invalid customer data");
            }
            enquiryModel.EnquiryId = null;
            int userId = int.Parse(User.FindFirst("UserId")?.Value ?? "0");
            var result = await _customerService.AddAsync(enquiryModel, userId);
            await _customerService.UploadImagesAsync(result.Id, floorPlanImages, sitePlanImages);
            _logger.LogInformation($"Created customer with ID: {result.Id}, EnquiryId: {result.EnquiryId}");
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<EnquiryModel>> Update(int id, [FromBody] EnquiryModel enquiryModel)
        {
            if (id != enquiryModel.Id)
            {
                return BadRequest("ID mismatch");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            int userId = int.Parse(User.FindFirst("UserId")?.Value ?? "0");

            var result = await _customerService.UpdateAsync(enquiryModel, userId);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var result = await _customerService.DeleteAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpPost("{id}/upload-images")]
        public async Task<ActionResult> UploadImages(int id, [FromForm] IFormFileCollection floorPlanImages, [FromForm] IFormFileCollection sitePlanImages)
         {
            if ((floorPlanImages == null || floorPlanImages.Count == 0) &&
                (sitePlanImages == null || sitePlanImages.Count == 0))
            {
                return BadRequest("No images provided");
            }
            var result = await _customerService.UploadImagesAsync(id, floorPlanImages, sitePlanImages);
            if (!result)
            {
                return NotFound();
            }
            return Ok(new { message = "Images uploaded successfully" });
        }
    }
}