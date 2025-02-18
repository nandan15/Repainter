using DataEntities.Curtain;
using DataModels.Curtain;
using DataModels.Enquiry;
using DataModels.Exceptions;
using DataServices.Curtain.Commands;
using DataServices.Enquiry.Commands;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Net;

namespace RepainterAPI.Controllers.v1.Curtain
{
    [Route("v{apiversion}/curtain")]
    [ApiController]
    [Authorize]
    public class CurtainCommandController : ControllerBase
    {
        private readonly IMediator _mediator;
        public CurtainCommandController(IMediator mediator)
        {
            _mediator = mediator;
        }
        ///<summary>
        ///create a new enquiry
        /// </summary>
        /// <returns></returns>
        /// 
        [HttpPost("create")]
        [ProducesResponseType(typeof(CurtainModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "Curtain" })]
        public async Task<IActionResult> CreateNewCurtain([FromBody] CurtainModel model)
        {
            var enquiry = await _mediator.Send(new AddCurtain
            {
                CurtainModel= model
            });
            return Ok(enquiry);
        }
        ///<summary>
        ///update the enquiry
        /// </summary>
        /// <returns></returns>
        /// 
        [HttpPost("update/{id}")]
        [ProducesResponseType(typeof(CurtainModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "Curtain" })]
        public async Task<IActionResult> UpdateCurtain([FromBody] CurtainModel model)
        {
            var enquriy = await _mediator.Send(new UpdateCurtain
            {
                CurtainModel = model
            });
            return Ok(enquriy);
        }
        ///<summary>
        ///delete the Curtain
        /// </summary>
        [HttpDelete]
        [Route("delete/{id}")]
        [ProducesResponseType(typeof(CurtainModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "Curtain" })]
        public async Task<IActionResult> DeleteCurtain(int id)
        {
            var bank = await _mediator.Send(new DeleteCurtain
            {
                CurtainModel = new CurtainModel { CurtainId = id }
            });
            return Ok(bank);
        }
    }
}
