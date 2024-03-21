using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Model.DTO.FilterPropertyDTO
{
    public class FilterPropertyDTO
    {
        public string Code { get; set; }

        public Guid CategoryId { get; set; }

        public Guid VariationId { get; set; }
    }
}
