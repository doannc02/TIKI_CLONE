using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Model.DTO
{
    public class CategoryUpdateDTO
    {
        public string? Code { get; set; }

        public string? Name { get; set; }

        public Guid? ParentId { get; set; }

        public string? Discription { get; set; }

        public string? Avatar { get; set; }

        public int? Hot { get; set; }

        public sbyte? Status { get; set; }
    }
}
