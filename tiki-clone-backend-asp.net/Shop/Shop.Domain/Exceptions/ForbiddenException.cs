using Shop.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Exceptions
{
    public class ForbiddenException : ResponseException
    {
        public ForbiddenException(ErrorCode errorCode, string userMessage) : base(errorCode, userMessage)
        {
        }
    }
}
