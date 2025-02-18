using Microsoft.AspNetCore.Mvc;
using DataModels.Enquiry;
using DataEntities.Enquiry;
using MediatR;
using DataModels.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Swashbuckle.AspNetCore.Annotations;
using System.Net;
using DataServices.Enquiry.Commands;
using DataModels.ImageUpload;
using DataServices.Repository.FileUploadStorage;
namespace RepainterAPI.Controllers.v1.Enquiry
{
    [Route("v{apiversion}/enquiry")]
    [ApiController]
    [Authorize]
    public class EnquiryCommandController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ILogger<EnquiryCommandController> _logger;
        private readonly IFileStorageService _fileStorageService;
        public EnquiryCommandController(
        IMediator mediator,
        ILogger<EnquiryCommandController> logger,
        IFileStorageService fileStorageService)
        {
            _mediator = mediator;
            _logger = logger;
            _fileStorageService = fileStorageService;
        }

        ///<summary>
        ///create a new enquiry
        /// </summary>
        /// <returns></returns>
        /// 
        [HttpPost("create")]
        [ProducesResponseType(typeof(EnquiryModel),(int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel),(int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] {"Enquiry"})]
        public async Task<IActionResult> CreateNewEnquiry([FromBody]EnquiryModel model)
        {
            var enquiry = await _mediator.Send(new AddEnquiry
            {
               EnquiryModel =model
            });
            return Ok(enquiry);
        }
        ///<summary>
        ///update the enquiry
        /// </summary>
        /// <returns></returns>
        /// 
        [HttpPost("update/{id}")]
        [ProducesResponseType(typeof(EnquiryModel),(int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel),(int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] {"Enquiry"})]
        public async Task<IActionResult> UpdateEnquiry([FromBody]EnquiryModel model)
        {
            var enquriy = await _mediator.Send(new UpdateEnquiry
            {
                enquirymodel = model
            });
            return Ok(enquriy);
        }
        ///<summary>
        ///update the enquiry floor and site 
        /// </summary>
        /// <returns></returns>
        /// 
        [HttpPost("upload-image/{id}/{type}")]
        [Consumes("multipart/form-data")]
        [ProducesResponseType(typeof(ImageUpdateModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [ProducesResponseType(typeof(BadRequestObjectResult), (int)HttpStatusCode.BadRequest)]
        [SwaggerOperation(Tags = new[] { "Enquiry" })]
        public async Task<IActionResult> UploadImage(int id, string type, IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                    return BadRequest("No file uploaded");

                if (type != "floor" && type != "site")
                    return BadRequest("Invalid image type. Must be either 'floor' or 'site'");
                var fileUrl = await _fileStorageService.UploadFileAsync(file, type);
                var result = await _mediator.Send(new UpdateEnquiryImages
                {
                    Id = id,
                    Type = type,
                    Images = new List<string> { fileUrl }
                });

                if (!result)
                    return NotFound($"Enquiry with ID {id} not found");

                return Ok(new ImageUpdateModel
                {
                    Success = true,
                    FileUrl = fileUrl,
                    Type = type,
                    Images = new List<string> { fileUrl }
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error uploading image for enquiry {id}");
                return StatusCode(500, new InternalErrorViewModel { Message = "Error uploading image" });
            }
        }
        ///<summary>
        ///delete customer 
        /// </summary>
        [HttpDelete]
        [Route("delete/{id}")]
        [ProducesResponseType(typeof(EnquiryModel),(int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel),(int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] {"Enquiry"})]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var customer = await _mediator.Send(new DeleteEnquiry
            {
                EnquiryModel = new EnquiryModel { Id = id }
            });
            return Ok(customer);
        }
    }
}
