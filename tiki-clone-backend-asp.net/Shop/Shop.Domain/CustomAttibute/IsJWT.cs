using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Shop.Domain.CustomAttibute
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
    public class IsJWTAttribute : ValidationAttribute
    {
        public IsJWTAttribute()
        {
            
        }
        /// <summary>
        /// kiểm tra chuỗi có phải là chuỗi JWT không
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public override bool IsValid(object? value)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                return tokenHandler.ReadToken(value?.ToString()) is JwtSecurityToken jsonToken;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
