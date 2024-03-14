using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Model.DTO
{
    public class VariationOptionDTO
    {
        public Guid? VariationId { get; set; }

        public Guid? VariationOptionGroupId { get; set; }

        public string? Value { get; set; }
    }
}
