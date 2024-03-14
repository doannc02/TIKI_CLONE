using Shop.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Interface.Repository
{
    public interface IUserRepository : IWriteRepository<User>
    {
        /// <summary>
        /// sinh mã mới cho user
        /// </summary>
        /// <returns></returns>
        public Task<string> GenerationCode();

        /// <summary>
        /// kiểm tra mã có bị trùng không
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        public Task<bool> IsDuplicateCode(string code);

        /// <summary>
        /// lấy mật khẩu theo email
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public Task<string> GetPasswordByEmail(string email);

        /// <summary>
        /// có tồn tại email này không
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public Task<User?> GetUserByEmail(string email);

        /// <summary>
        /// get refresh token theo user
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public Task<string?> GetRefreshTokenByEmailAsync(string email);
        
        /// <summary>
        /// get refresh token theo user
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public Task SetRefreshTokenByEmailAsync(string email, string token);
    }

}
