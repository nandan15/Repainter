using DataModels.Exceptions;
using DataModels.TexturePainting;
using DataServices.TexturePainting.Queries;
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
    public class TexturePaintingQueryController : ControllerBase
    {
        private readonly IMediator _mediator;

        public TexturePaintingQueryController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("")]
        [ProducesResponseType(typeof(IEnumerable<TexturePaintingModel>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "TexturePainting" })]
        public async Task<IActionResult> GetAllTexturePainting([FromQuery] Dictionary<string, string> filters, [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        {
            var texturepainting = await _mediator.Send(new GetTexturePainting { Filters = filters, PageSize = pageSize, Page = page });
            return Ok(texturepainting);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(TexturePaintingModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "TexturePainting" })]
        public async Task<IActionResult> GetTexturePaintingById(int id)
        {
            var texturepainting = await _mediator.Send(new GetTexturePaintingById { Id = id });
            return Ok(texturepainting);
        }
        [HttpGet("customer/{customerId}")]
        [ProducesResponseType(typeof(IEnumerable<TexturePaintingModel>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "TexturePainting" })]
        public async Task<IActionResult> GetTexturepaintingByCustomerId(int customerId)
        {
            if (customerId <= 0)
            {
                return BadRequest("Invalid Customer ID.");
            }
            var internalPainting = await _mediator.Send(new GetTexturePaintingByCustomerId(customerId));

            return Ok(internalPainting);
        }

    }
}
