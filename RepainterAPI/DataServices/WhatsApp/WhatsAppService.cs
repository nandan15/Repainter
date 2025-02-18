using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace DataServices.WhatsApp
{
    public class WhatsAppService
    {
        private readonly HttpClient _httpClient;
        private readonly string _accessToken;
        private readonly string _apiUrl;
        private readonly ILogger<WhatsAppService> _logger;

        public WhatsAppService(IConfiguration configuration, ILogger<WhatsAppService> logger)
        {
            _httpClient = new HttpClient();
            _accessToken = configuration["WhatsApp:AccessToken"];
            _apiUrl = configuration["WhatsApp:ApiUrl"];
            _logger = logger;
        }

        public async Task SendMessageAsync(string phoneNumber, string message)
        {
            try
            {
                // Format phone number (remove any spaces or special characters)
                phoneNumber = new string(phoneNumber.Where(char.IsDigit).ToArray());

                // Log the attempt
                _logger.LogInformation($"Attempting to send WhatsApp message to {phoneNumber}");

                // Prepare the request body according to WhatsApp API format
                var requestBody = new
                {
                    messaging_product = "whatsapp",
                    recipient_type = "individual",
                    to = phoneNumber,
                    type = "text",
                    text = new { preview_url = false, body = message }
                };

                // Convert request body to JSON
                var jsonContent = JsonSerializer.Serialize(requestBody);
                var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

                // Log the request
                _logger.LogDebug($"Request URL: {_apiUrl}");
                _logger.LogDebug($"Request Body: {jsonContent}");

                // Add authorization header
                _httpClient.DefaultRequestHeaders.Clear();
                _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {_accessToken}");
                var response = await _httpClient.PostAsync(_apiUrl, content);
                var responseContent = await response.Content.ReadAsStringAsync();

                // Log the response
                _logger.LogDebug($"Response Status: {response.StatusCode}");
                _logger.LogDebug($"Response Content: {responseContent}");

                if (!response.IsSuccessStatusCode)
                {
                    throw new Exception($"WhatsApp API request failed: {response.StatusCode} - {responseContent}");
                }

                _logger.LogInformation($"Successfully sent WhatsApp message to {phoneNumber}");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error sending WhatsApp message: {ex.Message}");
                throw;
            }
        }
    }
}