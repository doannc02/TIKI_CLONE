using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Application.Interface.UsersService
{
    public interface IBlackListService
    {
        /// <summary>
        /// thêm token vào danh sách đen
        /// </summary>
        /// <param name="token"></param>
        public void AddToBlacklist(string token, int expTime);
        /// <summary>
        /// xóa token khỏi danh sách đen
        /// </summary>
        /// <param name="token"></param>
        public void RemoveFromBlacklist(string token);
        /// <summary>
        /// kiểm tra token trong danh sách đen
        /// </summary>
        /// <param name="token"></param>
        /// <returns>return true nếu nằm trong black list, ngược lại trả về false</returns>
        public bool IsTokenBlacklisted(string token);
    }
}
