using Shop.Domain.Model.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Application.Interface.ProductsService
{
    public interface IProductDetailService : IWriteService<ProductDetailDTO, ProductDetailCreateDTO, ProductDetailUpdateDTO>
    {
        /// <summary>
        /// lấy thông tin chi tiết chung về sản phẩm
        /// </summary>
        /// <param name="productId"></param>
        /// <returns></returns>
        Task<ProductDetailDTO> GetProductDetailByProductId(Guid productId);
    }
}
