using Shop.Domain.CustomAttibute;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Model.Request
{
    public class LogoutForm
    {
        [Required(ErrorMessage = "Email không được để trống.")]
        [RegularExpression("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", ErrorMessage = "Email không đúng định dạng")]
        public string Email { get; set; }
        [IsJWT(ErrorMessage = "Chuỗi JWT không hợp lệ.")]
        public string RefreshToken { get; set; }

        public LogoutForm(string email, string refreshToken)
        {
            Email = email;
            RefreshToken = refreshToken;
        }
    }
}
