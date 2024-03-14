using Shop.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Exceptions
{
    /// <summary>
    /// lỗi đầu vào của người dùng
    /// </summary>
    public class BadRequestException : ResponseException
    {
        public BadRequestException(ErrorCode errorCode, string userMessage) : base(errorCode, userMessage)
        {
        }
    }
}
