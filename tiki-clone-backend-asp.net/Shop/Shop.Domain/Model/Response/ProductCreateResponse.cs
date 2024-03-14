using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Model.Response
{
    public class ProductCreateResponse
    {
        public string? Code { get; set; }

        public string? Name { get; set; }

        public string? Avatar { get; set; }

        public Guid? CategoryId { get; set; }

        public Guid? BrandId { get; set; }

        public Guid? SupplierId { get; set; }

        // danh sách biến thể được trả về cùng thông tin sản phẩm đã được thêm
        public ICollection<VariationDTOResponse> VariationDTOs { get; set; } = new List<VariationDTOResponse>();
    }
}
