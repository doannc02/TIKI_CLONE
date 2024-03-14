using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Model.DTO
{
    public class ProductConfigDTO
    {
        public Guid? ProductId { get; set; }

        public Guid? VariationOptionGroupId { get; set; }

        public Guid? ProductImageId { get; set; }

        public decimal Price { get; set; }

        public int Inventory { get; set; }

        public string? SKU { get; set; }
    }
}
