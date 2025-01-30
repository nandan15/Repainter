using DataModels.Exceptions;
using DataModels.PackageData;
using DataServices.PackageData.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Net;

namespace RepainterAPI.Controllers.v1.PackageData
{
    [Route("v{apiVersion}/PackageData")]
    [ApiController]
    [Authorize]
    public class PackageDataQueryController : ControllerBase
    {
        private readonly IMediator _mediator;
        public PackageDataQueryController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet("")]
        [ProducesResponseType(typeof(IEnumerable<PackageDataModel>),(int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel),(int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] {"PackageData"})]
        public async Task<IActionResult> GetPackageData([FromQuery] Dictionary<string, string> filters, [FromQuery]int page = 1, [FromQuery]int pageSize=20)
        {
            var packageData = await _mediator.Send(new GetPackageData { Filters = filters, PageSize = pageSize, Page = page });
            return Ok(packageData);
        }
        [HttpGet("productCode/{productCode}")]
        [ProducesResponseType(typeof(PackageDataModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "PackageData" })]
        public async Task<IActionResult> GetPackageDataByProductCode(string productCode)
        {
            var query = new GetPackageDataById { ProductCode = productCode };
            var packageData = await _mediator.Send(query);

            if (packageData == null)
            {
                return NotFound($"No package data found for product code: {productCode}");
            }

            return Ok(packageData);
        }
    }
}
