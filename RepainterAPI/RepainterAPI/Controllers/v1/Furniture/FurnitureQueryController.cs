using DataModels.Exceptions;
using DataModels.Furniture;
using DataServices.Furniture.Queries;
using DataServices.InternalPainting.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Net;

namespace RepainterAPI.Controllers.v1.Furniture
{
    [Route("v{apiVersion}/furniture")]
    [ApiController]
    [Authorize]
    public class FurnitureQueryController : ControllerBase
    {
        private readonly IMediator _mediator;

        public FurnitureQueryController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("")]
        [ProducesResponseType(typeof(IEnumerable<FurnitureModel>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "Furniture" })]
        public async Task<IActionResult> GetAllFurniture([FromQuery] Dictionary<string, string> filters, [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        {
            var furniture = await _mediator.Send(new GetCurtain { Filters = filters, PageSize = pageSize, Page = page });
            return Ok(furniture);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(FurnitureModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "Furniture" })]
        public async Task<IActionResult> GetFurnitureById(int id)
        {
            var furniture = await _mediator.Send(new GetFurnitureById { Id = id });
            return Ok(furniture);
        }
        [HttpGet("customer/{customerId}")]
        [ProducesResponseType(typeof(IEnumerable<FurnitureModel>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "Furniture" })]
        public async Task<IActionResult> GetFurnitureByCustomerId(int customerId)
        {
            if (customerId <= 0)
            {
                return BadRequest("Invalid Customer ID.");
            }
            var furniture = await _mediator.Send(new GetFurnitureByCustomerId(customerId));

            return Ok(furniture);
        }
    }
}
