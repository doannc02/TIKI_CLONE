using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Shop.Controller.Middleware
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class LoggerMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<LoggerMiddleware> _logger;
        private readonly IConfiguration _configuration;

        public LoggerMiddleware(RequestDelegate next, ILogger<LoggerMiddleware> logger, IConfiguration configuration)
        {
            _next = next;
            _logger = logger;
            _configuration = configuration;
        }

        public async Task Invoke(HttpContext context)
        {
            // Log request information
            _logger.LogInformation($"Request: {context.Request.Method} {context.Request.Path}");

            // Capture the response body
            var originalBodyStream = context.Response.Body;
            using var responseBody = new MemoryStream();
            context.Response.Body = responseBody;

            // Call the next middleware in the pipeline
            await _next(context);

            // Copy the response body to the original stream
            responseBody.Seek(0, SeekOrigin.Begin);
            var responseBodyText = new StreamReader(responseBody).ReadToEnd();
            var jsonResponseBody = JsonSerializer.Serialize(responseBodyText);

            // Log to file
            var filePath = _configuration.GetSection("LoggingFilePath").Value;
            File.AppendAllText(filePath,$"{DateTime.Now}:\n");
            File.AppendAllText(filePath,$"Request: {context.Request.Method} {context.Request.Path}\n");
            File.AppendAllText(filePath,$"Response:{context.Response.StatusCode}\n{jsonResponseBody}\n");
            File.AppendAllText(filePath,"\n");

            responseBody.Seek(0, SeekOrigin.Begin);
            await responseBody.CopyToAsync(originalBodyStream);
            await _next(context);
        }
    }
}
