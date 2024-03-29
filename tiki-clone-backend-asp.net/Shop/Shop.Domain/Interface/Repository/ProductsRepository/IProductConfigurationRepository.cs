using Shop.Domain.Entity;
using Shop.Domain.Model.Output;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Interface.Repository.ProductsRepository
{
    public interface IProductConfigurationRepository : IWriteRepository<Productconfiguration>
    {
        /// <summary>
        /// lấy thông tin config của biến th
        /// </summary>
        /// <param name="productId"></param>
        /// <returns></returns>
        Task<List<ProductConfigResponse>> GetProductConfigurationByProductIdAsync(Guid productId);

        /// <summary>
        /// lấy các giá trị biến thể
        /// </summary>
        /// <param name="productConfigId"></param>
        /// <returns></returns>
        Task<Dictionary<string, string>> GetVariationProductAsync(Guid productConfigId);
    }
}
