using Microsoft.AspNetCore.Mvc;
using DataModels.EmailModel;
using DataServices.IEmailService;
using Microsoft.Extensions.Logging;
using System.ComponentModel.DataAnnotations;

namespace RepainterAPI.Controllers.v1.EmailService
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmailController : ControllerBase
    {
        private readonly IEmailService _emailService;
        private readonly ILogger<EmailController> _logger;

        public EmailController(IEmailService emailService, ILogger<EmailController> logger)
        {
            _emailService = emailService;
            _logger = logger;
        }

        [HttpPost("send-quote-email")]
        public async Task<IActionResult> SendQuoteEmail([FromBody] EmailModel emailModel)
        {
            if (emailModel == null)
            {
                _logger.LogWarning("Received null EmailModel.");
                return BadRequest("Email model is required.");
            }

            // Validate email addresses
            var emailValidator = new EmailAddressAttribute();
            var invalidEmails = emailModel.To.Where(email => !emailValidator.IsValid(email)).ToList();

            if (invalidEmails.Any())
            {
                return BadRequest($"Invalid email addresses: {string.Join(", ", invalidEmails)}");
            }

            try
            {
                await _emailService.SendEmailAsync(emailModel);
                return Ok(new { message = "Email sent successfully!", recipients = emailModel.To });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error sending email");
                return StatusCode(500, new { message = "Failed to send email. See logs for details." });
            }
        }
    }
}