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
namespace RepainterAPI.Controllers.v1.Enquiry
{
    [Route("v{apiversion}/enquiry")]
    [ApiController]
    [Authorize]
    public class EnquiryCommandController : ControllerBase
    {
        private readonly IMediator _mediator;
        public EnquiryCommandController(IMediator mediator)
        {
            _mediator = mediator;
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
        [HttpPost("upload-image/{customerId}/{type}")]
        [ProducesResponseType(typeof(bool), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "Enquiry" })]
        public async Task<IActionResult> UpdateImages(int id, [FromBody] ImageUpdateModel model)
        {
            try
            {
                var enquiry = await _mediator.Send(new UpdateEnquiryImages
                {
                    Id = id,
                    Type = model.Type,
                    Images = model.Images
                });
                return Ok(enquiry);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new InternalErrorViewModel { Message = ex.Message });
            }
        }
    }
}
