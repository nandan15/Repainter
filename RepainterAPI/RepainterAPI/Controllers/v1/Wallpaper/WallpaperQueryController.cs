using DataModels.Exceptions;
using DataModels.InternalPainting;
using DataModels.Wallpaper;
using DataServices.InternalPainting.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Net;

namespace RepainterAPI.Controllers.v1.Wallpaper
{
    [Route("v{apiVersion}/wallpaper")]
    [ApiController]
    [Authorize]
    public class WallpaperQueryController : ControllerBase
    {

        private readonly IMediator _mediator;

        public WallpaperQueryController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("")]
        [ProducesResponseType(typeof(IEnumerable<WallpaperModel>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "Wallpaper" })]
        public async Task<IActionResult> GetAllInternalPainting([FromQuery] Dictionary<string, string> filters, [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        {
            var internalPainting = await _mediator.Send(new GetInternalPainting { Filters = filters, PageSize = pageSize, Page = page });
            return Ok(internalPainting);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(InternalPaintingModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "Wallpaper" })]
        public async Task<IActionResult> GetInternalPaintingById(int id)
        {
            var internalPainting = await _mediator.Send(new GetInternalPaintingById { Id = id });
            return Ok(internalPainting);
        }
        [HttpGet("customer/{customerId}")]
        [ProducesResponseType(typeof(IEnumerable<WallpaperModel>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "Wallpaper" })]
        public async Task<IActionResult> GetWallpaperByCustomerId(int customerId)
        {
            if (customerId <= 0)
            {
                return BadRequest("Invalid Customer ID.");
            }

            var wallpapers = await _mediator.Send(new GetWallpaperByCustomerId(customerId));
            return Ok(wallpapers);
        }

    }
}
