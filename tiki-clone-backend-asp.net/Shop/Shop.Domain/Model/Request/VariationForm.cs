using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Model.Request
{
    public class VariationForm
    {
        public Dictionary<string,string>? VariationOptionGroup { get; set; }

        public decimal Price { get; set; }

        public int Inventory { get; set; }

        public string? SKU { get; set; }
        public IFormFile? Image { get; set; }
    }
}
