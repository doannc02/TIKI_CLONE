using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shop.Application;
using Shop.Application.Interface;
using Shop.Domain;
using Shop.Domain.Model;
using Shop.Domain.Entity;
using Shop.Domain.Model.DTO;
using Shop.Domain.Model.Request;
using Shop.Domain.Interface.UseCases;
using Microsoft.AspNetCore.Authorization;
using Shop.Controller.Middleware;
using Shop.Domain.CustomAttibute;

namespace Shop.Controllers.Users
{
    [Route("v1/Api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserUseCase _userUseCase;
        public UsersController(IUserUseCase userUseCase)
        {
            _userUseCase = userUseCase;
        }

        /// <summary>
        /// đăng nhập
        /// </summary>
        /// <param name="loginForm"></param>
        /// <returns></returns>
        [HttpPost("Login")]
        [XAllowAnonymous]
        public async Task<IActionResult> LoginAsync([FromBody] LoginForm loginForm)
        {
            var res = await _userUseCase.LoginAsync(loginForm);
            return Ok(res);
        }

        /// <summary>
        /// đăng kí
        /// </summary>
        /// <param name="userCreateDto"></param>
        /// <returns></returns>
        [HttpPost("Register")]
        [XAllowAnonymous]
        public async Task<IActionResult> RegisterAsync([FromBody] UserCreateDTO userCreateDto)
        {
            var res = await _userUseCase.RegisterAsync(userCreateDto);
            return Ok(res);
        }

        /// <summary>
        /// đăng xuất
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        [HttpPost("Logout")]
        [XAuthorize(Roles.User)]
        public async Task<IActionResult> LogoutAsync([FromBody] LogoutForm logoutForm)
        {
            var res = await _userUseCase.LogoutAsync(logoutForm);
            return Ok(res);
        }

        /// <summary>
        /// lấy access token mới
        /// </summary>
        /// <param name="refreshToken"></param>
        /// <returns></returns>
        [HttpPost("AccessToken")]
        [XAuthorize(Roles.User)]
        public async Task<IActionResult> GetAccessTokenAsync([FromBody] string refreshToken)
        {
            var res = await _userUseCase.RefreshAccessTokenAsync(refreshToken);
            return Ok(res);
        }
    }
}
