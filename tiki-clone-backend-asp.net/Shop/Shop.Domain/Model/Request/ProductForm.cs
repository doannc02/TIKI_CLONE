using Microsoft.AspNetCore.Http;
using Shop.Domain.Model.DTO;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Model.Request
{
    public class ProductForm
    {
        [Required(ErrorMessage = "Mã sản phẩm không được để trống.")]
        public string Code { get; set; }
        [Required(ErrorMessage = "Tên sản phẩm không được để trống.")]
        public string Name { get; set; }
        public Guid CategoryId { get; set; }

        public Guid BrandId { get; set; }

        public Guid SupplierID { get; set; }

        public string? InfoDetail { get; set; }

        public string? Discription { get; set; }

        public ICollection<IFormFile>? Images { get; set; }

        [Required(ErrorMessage = "Thông tin biến thể không được để trống.")]
        public ICollection<VariationForm> Variations { get; set; } = new List<VariationForm>();
    }
}
