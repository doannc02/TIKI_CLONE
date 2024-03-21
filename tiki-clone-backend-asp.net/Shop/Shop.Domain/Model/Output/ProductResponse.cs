using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Model.Output
{
    public class ProductResponse
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string BrandName { get; set; }

        public string? Avatar { get; set; }

        public int TotalSold { get; set; }

        public int AverageStar { get; set; }

        public bool Hot { get; set; }

        public int TotalDiscout { get; set; }

        public decimal Price { get; set; }

        public int Inventory { get; set; }
    }
}
