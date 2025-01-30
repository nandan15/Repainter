using DataModels.Exceptions;
using DataModels.TexturePainting;
using DataModels.WallPaneling;
using DataServices.TexturePainting.Queries;
using DataServices.WallPaneling.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Net;

namespace RepainterAPI.Controllers.v1.WallPaneling
{
    [Route("v{apiVersion}/wallPaneling")]
    [ApiController]
    [Authorize]
    public class WallPanelingQueryController : ControllerBase
    {
      private readonly IMediator _mediator;
        public WallPanelingQueryController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet("")]
        [ProducesResponseType(typeof(IEnumerable<PanelingModel>),(int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel),(int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] {"WallPaneling"})]
        public async Task<IActionResult> GetAllWallPaneling([FromQuery] Dictionary<string, string> filters, [FromQuery] int page = 1, [FromBody] int pageSize=20)
        {
            var wallPaneling = await _mediator.Send(new GetPaneling { Filters = filters,PageSize=pageSize,Page=page });
            return Ok(wallPaneling);
        }
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(PanelingModel),(int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel),(int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] {"WallPaneling"})]
        public async Task<IActionResult> GetPanelingById(int id)
        {
            var wallPaneling = await _mediator.Send(new GetPanelingById { Id = id });
            return  Ok(wallPaneling);
        }
        [HttpGet("customer/{customerId}")]
        [ProducesResponseType(typeof(IEnumerable<PanelingModel>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "WallPaneling" })]
        public async Task<IActionResult> GetPanelingByCustomerId(int customerId)
        {
            if (customerId <= 0)
            {
                return BadRequest("Invalid Customer ID.");
            }
            var wallPaneling = await _mediator.Send(new GetPanelingByCustomerId(customerId));

            return Ok(wallPaneling);
        }
    }
}
