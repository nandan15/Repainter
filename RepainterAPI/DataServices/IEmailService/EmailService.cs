using System;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MimeKit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace DataServices.IEmailService
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<EmailService> _logger;

        public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        public async Task SendEmailAsync(DataModels.EmailModel.EmailModel email)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress("Vibgyor", _configuration["SmtpSettings:SenderEmail"]));

            // Add all recipients
            foreach (var recipient in email.To)
            {
                if (!string.IsNullOrWhiteSpace(recipient))
                {
                    emailMessage.To.Add(new MailboxAddress("", recipient.Trim()));
                    _logger.LogInformation($"Added recipient: {recipient}");
                }
            }

            if (emailMessage.To.Count == 0)
            {
                throw new ArgumentException("No valid recipients provided");
            }

            emailMessage.Subject = email.Subject;
            var bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = email.Body;

            // Handle Attachments
            if (email.Attachments?.Any() == true)
            {
                foreach (var attachment in email.Attachments)
                {
                    try
                    {
                        byte[] attachmentBytes = Convert.FromBase64String(attachment.Content);
                        bodyBuilder.Attachments.Add(attachment.FileName, attachmentBytes);
                        _logger.LogInformation($"Attachment {attachment.FileName} added.");
                    }
                    catch (FormatException ex)
                    {
                        _logger.LogError(ex, $"Invalid Base64 string for attachment {attachment.FileName}");
                        throw;
                    }
                }
            }

            emailMessage.Body = bodyBuilder.ToMessageBody();

            using (var client = new SmtpClient())
            {
                try
                {
                    client.Timeout = 5000; // 5 seconds
                    await client.ConnectAsync(
                        _configuration["SmtpSettings:Server"],
                        int.Parse(_configuration["SmtpSettings:Port"]),
                        Convert.ToBoolean(_configuration["SmtpSettings:UseSSL"])
                    );

                    client.AuthenticationMechanisms.Remove("XOAUTH2");
                    await client.AuthenticateAsync(
                        _configuration["SmtpSettings:Username"],
                        _configuration["SmtpSettings:Password"]
                    );

                    await client.SendAsync(emailMessage);
                    _logger.LogInformation($"Email sent successfully to {string.Join(", ", email.To)}");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Email sending failed to {string.Join(", ", email.To)}: {ex.Message}");
                    throw;
                }
                finally
                {
                    await client.DisconnectAsync(true);
                }
            }
        }
    }
}