using DataModels.Exceptions;
using DataModels.TexturePainting;
using DataServices.TexturePainting.Commands;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Net;

namespace RepainterAPI.Controllers.v1.TexturePainting
{
    [Route("v{apiVersion}/texturepainting")]
    [ApiController]
    [Authorize]
    public class TexturePaintingCommandController : ControllerBase
    {
        private readonly IMediator _mediator;
        public TexturePaintingCommandController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost("create")]
        [ProducesResponseType(typeof(TexturePaintingModel),(int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel),(int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] {"TexturePainting"})]
        public async Task<IActionResult> CreateNewTexturePainting([FromBody]TexturePaintingModel model)
        {
            var texture_painting = await _mediator.Send(new AddTexturePainting
            {
                TexturePaintingModel = model
            });
            return Ok(texture_painting);
        }
    }
}
