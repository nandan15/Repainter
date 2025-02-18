using DataModels.Exceptions;
using DataModels.Package;
using DataModels.TexturePainting;
using DataModels.WallPaneling;
using DataModels.Wallpaper;
using DataServices.Package.Commands;
using DataServices.TexturePainting.Commands;
using DataServices.WallPaneling.Commands;
using DataServices.Wallpaper.Commands;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Swashbuckle.AspNetCore.Annotations;
using System.Net;

namespace RepainterAPI.Controllers.v1.WallPaneling
{
    [Route("v{apiVersion}/wallpaneling")]
    [ApiController]
    [Authorize]
    public class WallPanelingCommandController : ControllerBase
    {
        private readonly IMediator _mediator;
        public WallPanelingCommandController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost("create")]
        [ProducesResponseType(typeof(PanelingModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "WallPaneling" })]
        public async Task<IActionResult> CreateNewTexturePainting([FromBody] PanelingModel model)
        {
            var wall_paneling = await _mediator.Send(new AddPaneling
            {
                PanelingModel = model
            });
            return Ok(wall_paneling);
        }
        ///<summary>
        ///delete the WallPaneling
        /// </summary>
        [HttpDelete]
        [Route("delete/{id}")]
        [ProducesResponseType(typeof(WallpaperModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "WallPaneling" })]
        public async Task<IActionResult> DeleteWallPaneling(int id)
        {
            var paneling = await _mediator.Send(new DeletePaneling
            {
                PanelingModel = new PanelingModel { PanelingId = id }
            });
            return Ok(paneling);
        }
    }
}
