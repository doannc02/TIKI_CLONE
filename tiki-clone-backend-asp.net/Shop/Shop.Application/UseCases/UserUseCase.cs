using Shop.Application.Interface;
using Shop.Domain.Exceptions;
using Shop.Domain.Interface.UseCases;
using Shop.Domain.Model.DTO;
using Shop.Domain.Model.Request;
using Shop.Domain.Model.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shop.Domain.Enum;
using Shop.Domain.Entity;
using System.Security.Claims;
using Shop.Application.Interface.UsersService;
using System.IdentityModel.Tokens.Jwt;

namespace Shop.Application.UseCases
{
    public class UserUseCase : IUserUseCase
    {
        private readonly IUserService _userService;
        private readonly IBlackListService _blackListService;
        public UserUseCase(IUserService userService, IBlackListService blackListService)
        {
            _userService = userService;
            _blackListService = blackListService;
        }
        public async Task<LoginResponse> LoginAsync(LoginForm loginForm)
        {
            // kiểm tra sự tồn tại của tài khoản
            var user = await _userService.GetUserByEmailAsync(loginForm.Email)
                ?? throw new BadRequestException(ErrorCode.InvalidInput, "Tài khoản không tồn tại.");

            // kiểm tra mật khẩu
            if (!_userService.VerifyPassword(loginForm.Password, user.Password))
            {
                throw new BadRequestException(ErrorCode.InvalidInput, "Mật khẩu không chính xác.");
            }

            string accessToken = _userService.GenerateToken(user.Email, TokenType.AccessToken);

            // kiểm tra xem user đã logout chưa
            var refreshToken = await _userService.GetRefeshTokenByEmailAsync(user.Email);
            if (refreshToken == null) // đã logout
            {
                string newRefreshToken = _userService.GenerateToken(user.Email, TokenType.RefreshToken);
                // thêm refresh token vào DB
                await _userService.SetRefreshTokenByEmailAsync(user.Email, newRefreshToken);
                // gán lại refreshToken cho user
                refreshToken = newRefreshToken;
            }

            return new LoginResponse()
            {
                Status = "Success",
                Message = "Đăng nhập thành công.",
                Id = user.Id,
                Name = user.Name,
                AccessToken = accessToken,
                RefreshToken = refreshToken,
            };
        }

        public async Task<LogoutResponse> LogoutAsync(LogoutForm logoutForm)
        {
            var refreshToken = logoutForm.RefreshToken;
            var email = logoutForm.Email;
            var principal = _userService.VerifyToken(refreshToken);

            // kiểm tra email
            var emailToken = principal.FindFirst(ClaimTypes.Email)?.Value;
            if (email != emailToken) throw new BadRequestException(ErrorCode.Invalid, $"token này không thuộc về {email}");

            // kiểm tra người dùng có tồn tại
            _ = await _userService.GetUserByEmailAsync(email) ?? throw new BadRequestException(ErrorCode.Invalid, "email không tồn tại");

            // xóa refresh token khỏi DB
            await _userService.SetRefreshTokenByEmailAsync(email, String.Empty);

            // lấy thời gian hết hạn của refresh token
            var expAccess = principal.FindFirst("exp")?.Value ?? String.Empty;
            var expAccessUnixTime = long.Parse(expAccess);
            DateTimeOffset expAccessDateTime = DateTimeOffset.FromUnixTimeSeconds(expAccessUnixTime);

            // nếu token chưa hết hạn thì thêm vào danh sách đen
            if (expAccessDateTime > DateTimeOffset.Now)
            {
                var expAccessTime = expAccessDateTime - DateTimeOffset.Now;
                // thêm token vào danh sách đen
                _blackListService.AddToBlacklist(refreshToken, expAccessTime.Days + 1);
            }

            return new LogoutResponse()
            {
                Status = "Success",
                Message = "Đăng xuất thành công"
            };
        }

        public async Task<RegisterResponse> RegisterAsync(UserCreateDTO userCreateDTO)
        {
            var result = await _userService.CreateAsync(userCreateDTO);

            return new RegisterResponse()
            {
                Status = "Success",
                Message = "Tạo tài khoản thành công.",
                Id = result.Id,
                Name = result.Name,
                Email = result.Email
            };
        }

        public async Task<JwtToken> RefreshAccessTokenAsync(string refreshToken)
        {
            string errorMsg = "Refeshtoken không hợp lệ";

            // kiểm tra có phải là chuỗi JWT không
            var tokenHandler = new JwtSecurityTokenHandler();
            if (tokenHandler.ReadJwtToken(refreshToken) is null)
            {
                throw new BadRequestException(ErrorCode.Invalid, errorMsg);
            }

            // kiểm tra refresh token có trong black list không
            if (_blackListService.IsTokenBlacklisted(refreshToken))
            {
                throw new UnauthorizedException(ErrorCode.TokenIsDenied, errorMsg);
            }

            var email = await _userService.IsValidRefreshToken(refreshToken)
                ?? throw new BadRequestException(ErrorCode.Invalid, errorMsg);

            // sinh token
            string newAccessToken = _userService.GenerateToken(email, TokenType.AccessToken);
            string newRefreshToken = _userService.GenerateToken(email, TokenType.RefreshToken);

            // cập nhật lại refresh token cho user
            await _userService.SetRefreshTokenByEmailAsync(email, newRefreshToken);

            return new JwtToken(newAccessToken, newRefreshToken);

        }
    }
}
