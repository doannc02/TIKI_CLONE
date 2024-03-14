using Shop.Domain.CustomAttibute;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Model.DTO
{
    public class UserCreateDTO
    {
        [Required(ErrorMessage = $"Tên không được để trống.")]
        public string Name { get; set; }

        [RegularExpression("^(?=.*\\d)(?=.*[^\\da-zA-Z]).{6,}$",ErrorMessage = "Mật khẩu phải dài ít nhất 6 kí tự, có ít nhất 1 chữ số và 1 kí tự đặc biệt")]
        public string Password { get; set; }

        [EqualsProperties("Password",ErrorMessage = "Mật khẩu và mật khẩu xác nhận không trùng khớp.")]
        public string? ConfirmPassword { get; set; }

        public string? Avatar { get; set; }

        public string FullName { get; set; }

        public sbyte Gender { get; set; }

        public string PhoneNumber { get; set; }

        public string Address { get; set; }

        public sbyte Age { get; set; }
        [Required(ErrorMessage = "Email không được để trống")]
        [EmailAddress(ErrorMessage = "Email không đúng định dạng")]
        public string? Email { get; set; }
    }
}
