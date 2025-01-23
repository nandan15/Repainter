using DataModels.Exceptions;
using DataModels.InternalPainting;
using DataModels.Package;
using DataServices.InternalPainting.Commands;
using DataServices.Package.Commands;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Net;

namespace RepainterAPI.Controllers.v1.Package
{
    [Route("v{apiVersion}/Package")]
    [ApiController]
    [Authorize]
    public class PackageCommandController : ControllerBase
    {
        private readonly IMediator _mediator;
        public PackageCommandController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost("create")]
        [ProducesResponseType(typeof(PackageModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "Package" })]
        public async Task<IActionResult> CreateNewPackage([FromBody] PackageModel model)
        {
            var package = await _mediator.Send(new AddPackage
            {
                PackageModel = model
            });
            return Ok(package);
        }
    }
}
