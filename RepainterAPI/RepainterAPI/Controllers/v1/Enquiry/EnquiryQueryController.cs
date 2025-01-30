using DataCore;
using DataModels.Enquiry;
using DataModels.Exceptions;
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
        private readonly RepainterContext _context; // Add this line

        public EnquiryQueryController(IMediator mediator, RepainterContext context) // Inject the context
        {
            _mediator = mediator;
            _context = context; // Initialize the context
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

        [HttpGet("get-images/{id}")]
        [ProducesResponseType(typeof(List<string>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "Enquiry" })]
        public async Task<IActionResult> GetImages(int id, [FromQuery] string type)
        {
            try
            {
                var enquiry = await _context.ScCustomer.FirstOrDefaultAsync(x => x.Id == id); 

                if (enquiry == null)
                    return NotFound();

                List<string> images = type == "floor"
                    ? JsonSerializer.Deserialize<List<string>>(enquiry.FloorPlan) ?? new List<string>()
                    : JsonSerializer.Deserialize<List<string>>(enquiry.SitePlan) ?? new List<string>();

                return Ok(images);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new InternalErrorViewModel { Message = ex.Message });
            }
        }
    }
}
