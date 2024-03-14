using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Model.DTO
{
    public class ProductDetailDTO
    {
        public Guid Id { get; set; }
        public Guid? ProductId { get; set; }

        public string? Name { get; set; }

        public string? Brand { get; set; }

        public string? InfoDetail { get; set; }

        public string? Discription { get; set; }

        public int? TotalSell { get; set; }

        public int? TotalRating { get; set; }

        public int? TotalStar { get; set; }
    }
}
