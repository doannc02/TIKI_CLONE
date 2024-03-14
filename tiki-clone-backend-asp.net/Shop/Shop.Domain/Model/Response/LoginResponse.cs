using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Model.Response
{
    public class LoginResponse
    {
        public string Status { get; set; }
        public string Message { get; set; }
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public LoginResponse() { }
    }
}
