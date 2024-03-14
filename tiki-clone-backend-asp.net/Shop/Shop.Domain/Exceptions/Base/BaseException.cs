using Shop.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Shop.Domain.Exceptions
{
    /// <summary>
    /// đối tượng ngoại lệ cơ bản
    /// </summary>
    public class BaseException
    {
        #region Properties
        /// <summary>
        /// mã lỗi
        /// </summary>
        public ErrorCode ErrorCode { get; set; }
        /// <summary>
        /// thông báo cho dev
        /// </summary>
        public string? DevMessage { get; set; }
        /// <summary>
        /// thông báo cho người dùng
        /// </summary>
        public List<string>? UserMessage { get; set; }
        /// <summary>
        /// mã trace
        /// </summary>
        public string? TraceId { get; set; }
        /// <summary>
        /// thông tin thêm
        /// </summary>
        public string? MoreInfo { get; set; }
        #endregion

        #region Contructor
        /// <summary>
        /// hàm khởi tạo
        /// </summary>
        public BaseException()
        {
            UserMessage = new List<string>();
        }
        #endregion

        #region Methods
        /// <summary>
        /// hàm ghi đề hàm có sẵn ToString()
        /// </summary>
        /// <returns>chuỗi json</returns>
        public override string ToString()
        {
            return JsonSerializer.Serialize(this);
        }
        #endregion

    }
}
