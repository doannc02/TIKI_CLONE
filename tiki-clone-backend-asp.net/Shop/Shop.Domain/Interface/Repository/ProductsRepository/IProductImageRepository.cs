using Shop.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Interface.Repository
{
    public interface IProductImageRepository : IWriteRepository<Productimage>
    {
        /// <summary>
        /// lấy ảnh sản phẩm chi tiết
        /// </summary>
        /// <param name="productDetailId"></param>
        /// <returns></returns>
        Task<List<string>> GetImagesByProductDetailAsync(Guid productDetailId);
    }
}
