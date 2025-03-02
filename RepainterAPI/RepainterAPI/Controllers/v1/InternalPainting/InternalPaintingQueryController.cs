﻿using DataModels.Enquiry;
using DataModels.Exceptions;
using DataModels.InternalPainting;
using DataServices.Enquiry.Queries;
using DataServices.InternalPainting.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Net;

namespace RepainterAPI.Controllers.v1.InternalPainting
{
    [Route("v{apiVersion}/internalPainting")]
    [ApiController]
    [Authorize]
    public class InternalPaintingQueryController : ControllerBase
    {
        private readonly IMediator _mediator;

        public InternalPaintingQueryController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("")]
        [ProducesResponseType(typeof(IEnumerable<InternalPaintingModel>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "InternalPainting" })]
        public async Task<IActionResult> GetAllInternalPainting([FromQuery] Dictionary<string, string> filters, [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        {
            var internalPainting = await _mediator.Send(new GetInternalPainting { Filters = filters, PageSize = pageSize, Page = page });
            return Ok(internalPainting);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(InternalPaintingModel), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "InternalPainting" })]
        public async Task<IActionResult> GetInternalPaintingById(int id)
        {
            var internalPainting = await _mediator.Send(new GetInternalPaintingById { Id = id });
            return Ok(internalPainting);
        }
        [HttpGet("customer/{customerId}")]
        [ProducesResponseType(typeof(IEnumerable<InternalPaintingModel>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(InternalErrorViewModel), (int)HttpStatusCode.InternalServerError)]
        [SwaggerOperation(Tags = new[] { "InternalPainting" })]
        public async Task<IActionResult> GetInternalPaintingByCustomerId(int customerId)
        {
            if (customerId <= 0)
            {
                return BadRequest("Invalid Customer ID.");
            }
            var internalPainting = await _mediator.Send(new GetInternalPaintingByCustomerId(customerId));

            return Ok(internalPainting);
        }

    }
}
