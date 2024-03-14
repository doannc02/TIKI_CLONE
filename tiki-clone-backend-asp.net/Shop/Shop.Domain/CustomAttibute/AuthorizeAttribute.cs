using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Shop.Domain.Entity;
using Shop.Domain.Enum;
using Shop.Domain.Exceptions;
using Shop.Domain.Model.Request;

namespace Shop.Domain.CustomAttibute
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class XAuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        private readonly Roles _role;

        public XAuthorizeAttribute(Roles role)
        {
            _role = role;
        }
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            // skip authorization if action is decorated with [AllowAnonymous] attribute
            var allowAnonymous = context.ActionDescriptor.EndpointMetadata.OfType<XAllowAnonymousAttribute>().Any();
            if (allowAnonymous)
                return;

            // authorization
            AuthorizeUser user = (AuthorizeUser)context.HttpContext?.Items["User"] ?? throw new UnauthorizedException(ErrorCode.TokenIsDenied, "Token không hợp lệ");
            if ((int)user.Role > (int)_role)
            {
                throw new ForbiddenException(ErrorCode.NoError, "Yêu cầu bị từ chối.");
            }
            
        }
    }
}
