using Shop.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Interface.Repository
{
    public interface IProductDetailRepository : IWriteRepository<Productdetail>
    {
        /// <summary>
        /// lấy thông tin chi tiết theo product id
        /// </summary>
        /// <param name="productId"></param>
        /// <returns></returns>
        Task<Productdetail> GetProductdetailByProductId(Guid productId);

        /// <summary>
        /// kiểm tra có thông tin của sản phẩm không
        /// Nếu có trả về true, ngược lại trả về false
        /// </summary>
        /// <param name="productDetailId"></param>
        /// <returns></returns>
        Task<bool> IsHasProductDetail(Guid productDetailId);
    }
}
