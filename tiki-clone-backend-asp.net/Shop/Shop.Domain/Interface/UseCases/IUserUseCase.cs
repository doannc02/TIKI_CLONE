using Shop.Domain.Entity;
using Shop.Domain.Model.DTO;
using Shop.Domain.Model.Request;
using Shop.Domain.Model.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Interface.UseCases
{
    public interface IUserUseCase
    {
        /// <summary>
        /// đăng nhập
        /// </summary>
        /// <param name="loginForm"></param>
        /// <returns></returns>
        public Task<LoginResponse> LoginAsync(LoginForm loginForm);

        /// <summary>
        /// đăng xuất
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        public Task<LogoutResponse> LogoutAsync(LogoutForm logoutForm);

        /// <summary>
        /// đăng kí
        /// </summary>
        /// <param name="userCreateDTO"></param>
        /// <returns></returns>
        public Task<RegisterResponse> RegisterAsync(UserCreateDTO userCreateDTO);

        /// <summary>
        /// lấy access token mới
        /// </summary>
        /// <param name="refreshToken"></param>
        /// <returns></returns>
        public Task<JwtToken> RefreshAccessTokenAsync(string refreshToken);



    }
}
