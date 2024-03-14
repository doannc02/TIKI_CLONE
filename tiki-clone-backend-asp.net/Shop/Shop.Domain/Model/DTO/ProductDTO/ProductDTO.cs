using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Model.DTO
{
    public class ProductDTO
    {
        public Guid Id { get; set; }

        public string? Code { get; set; }

        public string? Name { get; set; }

        public string? Avatar { get; set; }

        public int? Hot { get; set; }

        public int? TotalSold { get; set; }

        public decimal? AverageStar { get; set; }

        public int? Discount { get; set; }

        public Guid? CategoryId { get; set; }

        public Guid? BrandId { get; set; }

        public Guid? SupplierId { get; set; }

        public sbyte? Status { get; set; }
    }
}
