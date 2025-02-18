using Microsoft.AspNetCore.Mvc;
using MediatR;
using DataServices.Summary.Queries;
using System.Net;
using System.Threading.Tasks;
using DataModels.Exceptions;
using DataModels.Summary;
using Microsoft.AspNetCore.Authorization;
using Swashbuckle.AspNetCore.Annotations;

namespace RepainterAPI.Controllers.v1.Summary
{
    [Route("v{apiVersion}/summary")]
    [ApiController]
    [Authorize]
    public class SummaryQueryController : ControllerBase
    {
        private readonly IMediator _mediator;

        public SummaryQueryController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        [ProducesResponseType(typeof(SummaryModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "Summary" })]
        public async Task<IActionResult> GetSummaryById(int userId, int customerId, decimal? toVendorAmount = null)
        {
            var query = new GetSummaryDataById
            {
                UserId = userId,
                CustomerId = customerId,
                ToVendorAmount = toVendorAmount
            };
            var summary = await _mediator.Send(query);
            return Ok(summary);
        }
    }
}