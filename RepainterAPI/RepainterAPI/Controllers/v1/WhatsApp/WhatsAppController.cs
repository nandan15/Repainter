using Microsoft.AspNetCore.Mvc;
using DataModels.WhatsApp;
using DataServices.WhatsApp;
using System.Threading.Tasks;

namespace RepainterAPI.Controllers.v1.WhatsApp
{
    [Route("api/[controller]")]
    [ApiController]
    public class WhatsAppController : ControllerBase
    {
        private readonly WhatsAppService _whatsAppService;

        public WhatsAppController(WhatsAppService whatsAppService)
        {
            _whatsAppService = whatsAppService;
        }

        // Endpoint to send WhatsApp message
        [HttpPost("send-message")]
        public async Task<IActionResult> SendWhatsAppMessage([FromBody] WhatsAppSendMessageRequest request)
        {
            if (string.IsNullOrEmpty(request.PhoneNumber) || string.IsNullOrEmpty(request.Message))
            {
                return BadRequest("Phone number and message are required.");
            }

            try
            {
                await _whatsAppService.SendMessageAsync(request.PhoneNumber, request.Message);
                return Ok(new { message = "WhatsApp message sent successfully!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Failed to send WhatsApp message: {ex.Message}" });
            }
        }
    }
}