using Shop.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Exceptions
{
    public class UnauthorizedException : ResponseException
    {
        public UnauthorizedException(ErrorCode errorCode, string userMessage) : base(errorCode, userMessage)
        {
        }
    }
}
