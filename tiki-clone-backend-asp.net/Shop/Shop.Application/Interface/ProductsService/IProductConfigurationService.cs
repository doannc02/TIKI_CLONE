using Shop.Domain.Model.DTO;
using Shop.Domain.Model.Output;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Application.Interface.ProductsService
{
    public interface IProductConfigurationService : IWriteService<ProductConfigDTO, ProductConfigCreateDTO, ProductConfigUpdateDTO>
    {
        Task<List<ProductConfigResponse>> GetProductConfigByProductIdAsync(Guid productId);

        Task<Dictionary<string, string>> GetVariationProductAsync(Guid productConfigId);
    }
}
