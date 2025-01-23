using DataModels.Exceptions;
using DataModels.InternalPainting;
using DataServices.InternalPainting.Commands;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Net;

namespace RepainterAPI.Controllers.v1.InternalPainting
{
    [Route("v{apiVersion}/internalpainting")]
    [ApiController]
    [Authorize]
    public class InternalPaintingCommandController : ControllerBase
    {
        private readonly IMediator _mediator;
        public InternalPaintingCommandController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost("create")]
        [ProducesResponseType(typeof(InternalPaintingModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "InternalPainting" })]
        public async Task<IActionResult> CreateNewInternalPainting([FromBody] InternalPaintingModel model)
        {
            var internal_painting = await _mediator.Send(new AddInternalPainting
            {
                InternalPaintingModel = model
            });
            return Ok(internal_painting);
        }

    }
}
