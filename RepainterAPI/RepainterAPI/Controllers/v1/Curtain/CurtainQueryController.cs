using DataModels.Curtain;
using DataModels.Exceptions;
using DataModels.InternalPainting;
using DataServices.Curtain.Queries;
using DataServices.InternalPainting.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Net;

namespace RepainterAPI.Controllers.v1.Curtain
{
    [Route("v{apiVersion}/curtain")]
    [ApiController]
    [Authorize]
    public class CurtainQueryController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CurtainQueryController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("")]
        [ProducesResponseType(typeof(IEnumerable<CurtainModel>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "Curtain" })]
        public async Task<IActionResult> GetAllCurtain([FromQuery] Dictionary<string, string> filters, [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        {
            var curtain = await _mediator.Send(new GetCurtain { Filters = filters, PageSize = pageSize, Page = page });
            return Ok(curtain);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(CurtainModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "Curtain" })]
        public async Task<IActionResult> GetCurtainById(int id)
        {
            var internalPainting = await _mediator.Send(new GetCurtainById { Id = id });
            return Ok(internalPainting);
        }
        [HttpGet("customer/{customerId}")]
        [ProducesResponseType(typeof(IEnumerable<CurtainModel>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "Curtain" })]
        public async Task<IActionResult> GetCurtainByCustomerId(int customerId)
        {
            if (customerId <= 0)
            {
                return BadRequest("Invalid Customer ID.");
            }
            var curtain = await _mediator.Send(new GetCurtainByCustomerId(customerId));

            return Ok(curtain);
        }
    }
}
