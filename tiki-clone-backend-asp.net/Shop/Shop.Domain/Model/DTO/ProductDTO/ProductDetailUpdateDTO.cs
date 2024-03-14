using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Model.DTO
{
    public class ProductDetailUpdateDTO
    {
        public string? Name { get; set; }

        public string? Brand { get; set; }

        public string? InfoDetail { get; set; }

        public string? Discription { get; set; }
    }
}
