using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Shop.Application.Interface;
using Shop.Application.Interface.UsersService;
using Shop.Application.Services.UserServices;
using Shop.Domain.Exceptions;
using Shop.Domain.Model.Request;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Shop.Controller.Middleware
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class AuthenMiddleware
    {
        private readonly RequestDelegate _next;

        public AuthenMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext, IUserService _userService, IRoleService _roleService)
        {
            string tokenDenied = "Token không hợp lệ";

            var token = (httpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last());
            if (token != null)
            {
                var principal = _userService.VerifyToken(token) ?? throw new UnauthorizedException(ErrorCode.TokenIsDenied, tokenDenied);

                var email = principal.FindFirst(ClaimTypes.Email)?.Value ?? throw new UnauthorizedException(ErrorCode.TokenIsDenied, tokenDenied);

                var user = await _userService.GetUserByEmailAsync(email) ?? throw new UnauthorizedException(ErrorCode.TokenIsDenied, tokenDenied);

                var authorizeUser = new AuthorizeUser
                {
                    Id = user.Id,
                    Email = email
                };

                var roles = await _roleService.GetCodeByIdAsync(user.RoleId);
                authorizeUser.Role = (Roles)roles;
                httpContext.Items["User"] = authorizeUser;
            }

            await _next(httpContext);
        }
    }
}
