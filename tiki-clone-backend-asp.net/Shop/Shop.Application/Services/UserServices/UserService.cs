using AutoMapper;
using Shop.Application.Interface;
using Shop.Domain.Entity;
using Shop.Domain.Enum;
using Shop.Domain.Exceptions;
using Shop.Application.Services.Base;
using Shop.Domain.Model.DTO;
using Shop.Domain.Interface.Repository;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Shop.Domain.Model.Request;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Shop.Application.Services.UserServices
{
    public class UserService : WriteService<User, UserDTO, UserCreateDTO, UserUpdateDTO>, IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        public UserService(IUserRepository userRepository, IMapper mapper, IConfiguration configuration) : base(userRepository, mapper)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }

        protected override async Task EditData(User user)
        {
            // tạo id cho người dùng mới
            user.Id = new Guid();

            // tạo mã cho người dùng mới
            user.Code = await _userRepository.GenerationCode();

            // mã hóa mật khẩu người dùng
            user.Password = HashPassword(user.Password);

            // thêm trạng thái của người dùng
            user.Status = 1;
        }

        protected override async Task ValidateLogicBusiness(User entity)
        {
            // kiểm tra email đã tồn tại chưa
            if ((await _userRepository.GetUserByEmail(entity.Email)) != null)
            {
                throw new BadRequestException(ErrorCode.InvalidInput, "Email đã tồn tại");
            }

            return;
        }

        public string HashPassword(string password)
        {
            // Tạo salt
            string salt = BCrypt.Net.BCrypt.GenerateSalt();

            // Kết hợp salt với mật khẩu, thêm stretching và sau đó mã hóa
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(password, salt, true, BCrypt.Net.HashType.SHA256);

            return hashedPassword;
        }

        public bool VerifyPassword(string password, string passwordHashed)
        {
            bool result = BCrypt.Net.BCrypt.Verify(password, passwordHashed, true, BCrypt.Net.HashType.SHA256);

            return result;
        }

        public string GenerateToken(string email, TokenType tokenType)
        {
            string secret = _configuration.GetSection("JwtConfig:Secret").Value ?? throw new Exception();
            double expireTime;
            string type;
            if (tokenType == TokenType.AccessToken)
            {
                type = "access";
                _ = double.TryParse(_configuration.GetSection("JwtConfig:AccessExpireTime").Value, out expireTime);
            }
            else if (tokenType == TokenType.RefreshToken)
            {
                type = "refresh";
                _ = double.TryParse(_configuration.GetSection("JwtConfig:RefrehExpireTime").Value, out expireTime);
            }
            else
            {
                type = "error";
                expireTime = 0;
            }
            var key = Encoding.ASCII.GetBytes(secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim("token_type", type),
                    new Claim(JwtRegisteredClaimNames.Sub, email),
                    new Claim(JwtRegisteredClaimNames.Email, email),
                }),
                
                Expires = DateTime.UtcNow.AddDays(expireTime),
                Issuer = _configuration.GetSection("JwtConfig:Issuer").Value,
                Audience = _configuration.GetSection("JwtConfig:Audience").Value,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(token);

            return jwtToken;
        }

        public ClaimsPrincipal? VerifyToken(string token)
        {
            var issuer = _configuration.GetSection("JwtConfig:Issuer").Value;
            var audience = _configuration.GetSection("JwtConfig:Audience").Value;
            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration.GetSection("JwtConfig:Secret").Value));
            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                var validationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = issuer,

                    ValidateAudience = true,
                    ValidAudience = audience,

                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = key,

                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                };

                var principal = tokenHandler.ValidateToken(token, validationParameters, out SecurityToken validatedToken);
                return principal;
            }
            catch
            {
                return null;
            }
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await _userRepository.GetUserByEmail(email);
        }

        public async Task<string?> IsValidRefreshToken(string refreshToken)
        {
            var principal = VerifyToken(refreshToken);
            if (principal == null) return null;

            // kiểm tra các giá tị claim null không
            if (!(principal.Claims.All(claim => claim.Value != null))) return null;

            // kiểm tra token có phải là refresh token không
            var isRefreshToken = principal.HasClaim("token_type", "refresh");
            if (!isRefreshToken) return null;

            // kiểm tra thời gian hết hạn
            var expString = principal.FindFirst("exp").Value;
            var expUnixTime = long.Parse(expString);
            DateTimeOffset expDateTime = DateTimeOffset.FromUnixTimeSeconds(expUnixTime); ;
            if (expDateTime <= DateTimeOffset.Now) return null;

            // kiểm tra người dùng có tồn tại không và có đúng refreshtoken không
            var email = principal.FindFirst(ClaimTypes.Email).Value;
            var user = await GetUserByEmailAsync(email);
            if (user == null) return null;
            else if (user.RefreshToken != refreshToken) return null;

            return email;
        }

        public async Task SetRefreshTokenByEmailAsync(string email, string token)
        {
            if (string.IsNullOrEmpty(token)) return;
            await _userRepository.SetRefreshTokenByEmailAsync(email, token);
        }

        public async Task<string?> GetRefeshTokenByEmailAsync(string email)
        {
            string? result = await _userRepository.GetRefreshTokenByEmailAsync(email);
            return result;
        }
    }
}
