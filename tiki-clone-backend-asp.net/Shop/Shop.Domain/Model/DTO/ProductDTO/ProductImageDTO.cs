using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Model.DTO
{
    public class ProductImageDTO
    {
        public Guid Id { get; set; }
        public Guid? ProductDetailId { get; set; }

        public string? Name { get; set; }

        public string? Path { get; set; }
    }
}
