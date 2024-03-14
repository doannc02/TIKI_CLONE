using Shop.Domain.Entity;
using Shop.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Model.Request
{
    public class AuthorizeUser
    {
        public Guid Id {  get; set; }

        public string Email { get; set; } = string.Empty;

        public Roles Role { get; set; }
    }
}
