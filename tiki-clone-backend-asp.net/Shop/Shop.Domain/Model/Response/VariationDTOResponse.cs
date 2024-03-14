using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Model.Response
{
    public class VariationDTOResponse
    {
        public string? DiscriptionVariationOptionGroup { get; set; }

        public decimal Price { get; set; }

        public int Inventory { get; set; }

        public string? SKU { get; set; }

        public string Image { get; set; }
    }
}
