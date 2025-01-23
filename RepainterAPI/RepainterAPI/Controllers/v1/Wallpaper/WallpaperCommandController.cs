using DataModels.Exceptions;
using DataModels.Wallpaper;
using DataServices.Wallpaper.Commands;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Diagnostics.Contracts;
using System.Net;

namespace RepainterAPI.Controllers.v1.Wallpaper
{
    [Route("v{apiversion}/wallpaper")]
    [ApiController]
    [Authorize]
    public class WallpaperCommandController : ControllerBase
    {
        private readonly IMediator _mediator;
        public WallpaperCommandController(IMediator mediator)
        {
            _mediator = mediator;
        }
        ///<summary>
        ///create a new wallpaper
        /// </summary>
        /// <returns></returns>
        /// 
        [HttpPost("create")]
        [ProducesResponseType(typeof(WallpaperModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "Wallpaper" })]
        public async Task<IActionResult> CreateNewWallpaper([FromBody] WallpaperModel model)
        {
            var wallpaper = await _mediator.Send(new AddWallpaper
            {
                WallpaperModel = model
            });
            return Ok(wallpaper);
        }
        ///<summary>
        ///update the wallpaper
        /// </summary>
        /// <returns></returns>
        /// 
        [HttpPost("update/{id}")]
        [ProducesResponseType(typeof(WallpaperModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "Wallpaper" })]
        public async Task<IActionResult> UpdateWallpaper([FromBody] WallpaperModel model)
        {
            var wallpaper = await _mediator.Send(new UpdateWallpaper
            {
                WallpaperModel = model
            });
            return Ok(wallpaper);
        }
    }
}
