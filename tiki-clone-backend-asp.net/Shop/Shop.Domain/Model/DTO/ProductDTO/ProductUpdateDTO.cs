using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Model.DTO
{
    public class ProductUpdateDTO
    {
        public string? Code { get; set; }

        public string? Name { get; set; }

        public string? Avatar { get; set; }

        public Guid? CategoryId { get; set; }

        public Guid? BrandId { get; set; }

        public sbyte? Status { get; set; }
    }
}
