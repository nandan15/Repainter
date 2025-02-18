using DataModels.Door_Grills;
using DataModels.Exceptions;
using DataServices.Door_Grills.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Net;

namespace RepainterAPI.Controllers.v1.Door_Grills
{
    [Route("v{apiVersion}/door_grill")]
    [ApiController]
    [Authorize]
    public class Door_GrillsQueryController : ControllerBase
    {
        private readonly IMediator _mediator;

        public Door_GrillsQueryController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("")]
        [ProducesResponseType(typeof(IEnumerable<Door_GrillModel>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "Door_Grill" })]
        public async Task<IActionResult> GetDoor_Grill([FromQuery] Dictionary<string, string> filters, [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        {
            var door_grill = await _mediator.Send(new GetDoor_Grills { Filters = filters, PageSize = pageSize, Page = page });
            return Ok(door_grill);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Door_GrillModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "Door_Grill" })]
        public async Task<IActionResult> GetDoor_GrillById(int id)
        {
            var door_grill = await _mediator.Send(new GetDoor_GrillsById { Id = id });
            return Ok(door_grill);
        }
        [HttpGet("customer/{customerId}")]
        [ProducesResponseType(typeof(IEnumerable<Door_GrillModel>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "Door_Grill" })]
        public async Task<IActionResult> GetDoor_GrillByCustomerId(int customerId)
        {
            if (customerId <= 0)
            {
                return BadRequest("Invalid Customer ID.");
            }
            var door_grill = await _mediator.Send(new GetDoor_GrillByCustomerId(customerId));

            return Ok(door_grill);
        }
    }
}
