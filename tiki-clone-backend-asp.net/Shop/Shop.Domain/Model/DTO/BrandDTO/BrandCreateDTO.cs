using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Model.DTO
{
    public class BrandCreateDTO
    {
        [Required(ErrorMessage = "Mã không được để trống")]
        public string? Code { get; set; }

        public string? Name { get; set; }

        public string? Email { get; set; }

        public string? Country { get; set; }
    }
}
