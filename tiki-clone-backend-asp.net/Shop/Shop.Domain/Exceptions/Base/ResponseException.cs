using Shop.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Exceptions
{
    /// <summary>
    /// đối tượng thông báo lỗi
    /// </summary>
    public class ResponseException : Exception
    {
        #region Properties
        /// <summary>
        /// Mã lỗi nội bộ.
        /// </summary>
        public ErrorCode ErrorCode { get; set; }

        /// <summary>
        /// thông báo lỗi của user.
        /// </summary>
        public string? UserMessage { get; set; }

        #endregion
        #region Contructor
        /// <summary>
        /// hàm khỏi tạo không đối số.
        /// </summary>
        public ResponseException() { }
        /// <summary>
        /// hàm khởi tạo với đối số: mã lỗi request, thông báo của user.
        /// </summary>
        /// <param name="statusCodeError">mã lỗi request</param>
        /// <param name="userMessage">thông báo lỗi của user</param>
        public ResponseException(ErrorCode errorCode, string userMessage)
        {
            ErrorCode = errorCode;
            UserMessage = userMessage;
        }
        #endregion
    }
}
