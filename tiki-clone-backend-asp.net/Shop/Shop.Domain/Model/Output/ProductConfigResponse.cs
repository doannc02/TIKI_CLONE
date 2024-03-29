using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Model.Output
{
    public class ProductConfigResponse
    {
        public Guid VariationProductId { get; set; }

        public Guid VariationOptionGroupId { get; set; }

        public string ImagePath { get; set; }

        public decimal Price { get; set; }

        public int Inventory { get; set; }

        public Dictionary<string, string> variation { get; set; } = new(); 
    }
}
