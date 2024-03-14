using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Model.DTO
{
    public class UserUpdateDTO
    {
        public string? Code { get; set; }

        public string? Name { get; set; }

        public string? Password { get; set; }

        public string? ConfirmPassword { get; set; }

        public string? Avatar { get; set; }

        public string? FullName { get; set; }

        public sbyte? Gender { get; set; }

        public string? PhoneNumber { get; set; }

        public string? Address { get; set; }

        public sbyte? Age { get; set; }

        public string? Email { get; set; }

        public sbyte? Status { get; set; }
    }
}
