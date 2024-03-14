using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Model.DTO
{
    public class VariationOptionGroupDTO
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string? Discription { get; set; }
    }
}
