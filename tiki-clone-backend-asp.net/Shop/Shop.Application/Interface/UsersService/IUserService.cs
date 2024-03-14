using Shop.Domain;
using Shop.Domain.Entity;
using Shop.Domain.Enum;
using Shop.Domain.Model.DTO;
using Shop.Domain.Model.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Application.Interface
{
    public interface IUserService : IWriteService<UserDTO, UserCreateDTO, UserUpdateDTO>
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="password"></param>
        /// <returns></returns>
        public string HashPassword(string password);

        /// <summary>
        /// kiểm tra mật khẩu có hợp lệ
        /// </summary>
        /// <param name="password"></param>
        /// <returns></returns>
        public bool VerifyPassword(string password, string passwordHashed);

        /// <summary>
        /// tạo 1 token mới
        /// </summary>
        /// <returns></returns>
        public string GenerateToken(string email, TokenType tokenType);

        /// <summary>
        /// xác thực token
        /// </summary>
        /// <param name="token"></param>
        /// <returns></returns>
        public ClaimsPrincipal? VerifyToken(string token);

        /// <summary>
        /// kiểm tra refresh token
        /// </summary>
        /// <param name="token"></param>
        /// <returns>email sở hữu token</returns>
        public Task<string?> IsValidRefreshToken(string token);

        /// <summary>
        /// get user theo email
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public Task<User?> GetUserByEmailAsync(string email);

        /// <summary>
        /// set refresh token cho user
        /// </summary>
        /// <param name="token"></param>
        /// <returns></returns>
        public Task SetRefreshTokenByEmailAsync(string email, string token);

        /// <summary>
        /// get refresh token theo user
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public Task<string?> GetRefeshTokenByEmailAsync(string email);
    }
}
