using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Model.Output
{
    public class ProductDetailResponse
    {
        public Guid ProductDetailId { get; set; }

        public string Name { get; set; }

        public string Brand { get; set; }

        public string Description { get; set; } = string.Empty;

        public string InfoDetail { get; set; } = string.Empty;
        
        public int TotalSell { get; set; }

        public int TotalRating { get; set; }

        public int TotalStar { get; set; }

        public List<string> Images { get; set; } = new List<string>();

        public List<VariationProduct> variationProducts = new();
    }
    public class VariationProduct
    {
        public Guid VariationProductId { get; set;}

        public string Image { get; set; }

        public decimal Price { get; set; }

        public int Inventory { get; set; }

        public Dictionary<string, string> variations;

    }
}
