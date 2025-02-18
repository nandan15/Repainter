using DataModels.Door_Grills;
using DataModels.Exceptions;
using DataServices.Door_Grills.Commands;
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
    public class Door_GrillsCommandController : ControllerBase
    {
        private readonly IMediator _mediator;
        public Door_GrillsCommandController(IMediator mediator)
        {
            _mediator = mediator;
        }
        ///<summary>
        ///create a new enquiry
        /// </summary>
        /// <returns></returns>
        /// 
        [HttpPost("create")]
        [ProducesResponseType(typeof(Door_GrillModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "Door_Grill" })]
        public async Task<IActionResult> CreateNewDoor_Grill([FromBody] Door_GrillModel model)
        {
            var enquiry = await _mediator.Send(new AddDoor_Grill
            {
                Door_GrillModel = model
            });
            return Ok(enquiry);
        }
        ///<summary>
        ///update the enquiry
        /// </summary>
        /// <returns></returns>
        /// 
        [HttpPost("update/{id}")]
        [ProducesResponseType(typeof(Door_GrillModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "Door_Grill" })]
        public async Task<IActionResult> UpdateDoor_Grill([FromBody] Door_GrillModel model)
        {
            var enquriy = await _mediator.Send(new UpdateDoor_Grill
            {
                DoorGrillModel = model
            });
            return Ok(enquriy);
        }
        ///<summary>
        ///delete the Door_grill
        /// </summary>
        [HttpDelete]
        [Route("delete/{id}")]
        [ProducesResponseType(typeof(Door_GrillModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "Door_Grill" })]
        public async Task<IActionResult> DeleteDoor_Grill(int id)
        {
            var bank = await _mediator.Send(new DeleteDoor_Grills
            {
                Door_GrillModel = new Door_GrillModel { Door_GrillId = id }
            });
            return Ok(bank);
        }
    }
}
