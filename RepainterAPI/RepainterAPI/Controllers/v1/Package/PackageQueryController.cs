using DataModels.Door_Grills;
using DataModels.Exceptions;
using DataModels.Package;
using DataServices.Door_Grills.Queries;
using DataServices.Package.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Net;

namespace RepainterAPI.Controllers.v1.Package
{
    [Route("v{apiVersion}/package")]
    [ApiController]
    [Authorize]
    public class PackageQueryController : ControllerBase
    {
        private readonly IMediator _mediator;

        public PackageQueryController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("")]
        [ProducesResponseType(typeof(IEnumerable<PackageModel>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "Package" })]
        public async Task<IActionResult> GetPackage([FromQuery] Dictionary<string, string> filters, [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        {
            var package = await _mediator.Send(new GetPackage { Filters = filters, PageSize = pageSize, Page = page });
            return Ok(package);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(PackageModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "Package" })]
        public async Task<IActionResult> GetPackageById(int id)
        {
            var package = await _mediator.Send(new GetPackageById { Id = id });
            return Ok(package);
        }
        [HttpGet("customer/{customerId}")]
        [ProducesResponseType(typeof(IEnumerable<PackageModel>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "Package" })]
        public async Task<IActionResult> GetPackageByCustomerId(int customerId)
        {
            if (customerId <= 0)
            {
                return BadRequest("Invalid Customer ID.");
            }
            var package = await _mediator.Send(new GetPackageByCustomerId(customerId));

            return Ok(package);
        }
    }
}
