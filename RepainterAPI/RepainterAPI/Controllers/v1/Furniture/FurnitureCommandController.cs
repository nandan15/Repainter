
using DataModels.Door_Grills;
using DataModels.Exceptions;
using DataModels.Furniture;
using DataServices.Door_Grills.Commands;
using DataServices.Enquiry.Commands;
using DataServices.Furniture.Commands;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Net;

namespace RepainterAPI.Controllers.v1.Furniture
{
    [Route("v{apiversion}/furniture")]
    [ApiController]
    [Authorize]
    public class FurnitureCommandController : ControllerBase
    {
        private readonly IMediator _mediator;
        public FurnitureCommandController(IMediator mediator)
        {
            _mediator = mediator;
        }
        ///<summary>
        ///create a new enquiry
        /// </summary>
        /// <returns></returns>
        /// 
        [HttpPost("create")]
        [ProducesResponseType(typeof(FurnitureModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "Furniture" })]
        public async Task<IActionResult> CreateNewFurniture([FromBody] FurnitureModel model)
        {
            var furniture = await _mediator.Send(new AddFurniture
            {
                FurnitureModel = model
            });
            return Ok(furniture);
        }
        ///<summary>
        ///update the enquiry
        /// </summary>
        /// <returns></returns>
        /// 
        [HttpPost("update/{id}")]
        [ProducesResponseType(typeof(FurnitureModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "Furniture" })]
        public async Task<IActionResult> UpdateFurniture([FromBody] FurnitureModel model)
        {
            var furniture = await _mediator.Send(new UpdateFurniture
            {
                FurnitureModel = model
            });
            return Ok(furniture);
        }
        ///<summary>
        ///delete the Door_grill
        /// </summary>
        [HttpDelete]
        [Route("delete/{id}")]
        [ProducesResponseType(typeof(FurnitureModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "Furniture" })]
        public async Task<IActionResult> DeleteFurniture(int id)
        {
            var furniture = await _mediator.Send(new DeleteFurniture
            {
                FurnitureModel = new FurnitureModel { FurnitureId = id }
            });
            return Ok(furniture);
        }
    }
}
