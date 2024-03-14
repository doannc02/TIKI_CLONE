using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Shop.Application.Interface.UsersService;
using Shop.Domain.Exceptions;
using System.Threading.Tasks;

namespace Shop.Controller.Middleware
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class TokenBlackListMiddleware
    {
        private readonly RequestDelegate _next;

        public TokenBlackListMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext, IBlackListService _blackListService)
        {
            // Kiểm tra token có nằm trong danh sách lỗi không
            string? authorizationHeader = httpContext.Request.Headers["Authorization"];
            if (!string.IsNullOrEmpty(authorizationHeader) && authorizationHeader.StartsWith("Bearer "))
            {
                var token = authorizationHeader["Bearer ".Length..].Trim();
                if (_blackListService.IsTokenBlacklisted(token))
                {
                    httpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    var listUserMsg = new List<string>() { "Token bị từ chối" };
                    await httpContext.Response.WriteAsync(text: new BaseException()
                    {
                        ErrorCode = ErrorCode.TokenIsDenied,
                        UserMessage = listUserMsg,
                        DevMessage = "",
                        TraceId = httpContext.TraceIdentifier,
                        MoreInfo = null
                    }.ToString() ?? "");
                    return;
                }
            }
            await _next(httpContext);
        }
    }
}
