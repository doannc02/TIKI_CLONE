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
    }
}
