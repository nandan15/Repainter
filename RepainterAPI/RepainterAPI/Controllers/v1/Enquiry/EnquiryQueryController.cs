using DataModels.Enquiry;
using DataModels.Exceptions;
using DataServices.Enquiry.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Net;

namespace RepainterAPI.Controllers.v1.Enquiry
{
    [Route("v{apiVersion}/enquiry")]
    [ApiController]
    [Authorize]
    public class EnquiryQueryController : ControllerBase
    {
      private readonly IMediator _mediator;
        public EnquiryQueryController(IMediator mediator)
        {
            _mediator=mediator;
        }
        [HttpGet("")]
        [ProducesResponseType(typeof(IEnumerable<EnquiryModel>),(int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel),(int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] {"Enquiry"})]
        public async Task<IActionResult> GetAllEnquiry([FromQuery] Dictionary<string, string> filters, [FromQuery]int page = 1, [FromQuery] int pageSize = 20)
        {
            var enquiry = await _mediator.Send(new GetEnquiry { Filters = filters, PageSize = pageSize, Page = page });
            return Ok(enquiry);
        }
        [HttpGet("id")]
        [ProducesResponseType(typeof(IEnumerable<EnquiryModel>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel),(int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] {"Enquiry"})]
        public async Task<IActionResult> GetEnquiryById(int id)
        {
            var enquiry = await _mediator.Send(new GetEnquiryById
            {
                Id = id
            });
            return Ok(enquiry);
        }

    }
  
}
