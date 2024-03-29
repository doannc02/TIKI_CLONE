using Dapper;
using Shop.Application.UnitOfWork;
using Shop.Domain.Entity;
using Shop.Domain.Interface.Repository.ProductsRepository;
using Shop.Domain.Model.Output;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Infrastructure.Repository.ProductsRepository
{
    public class ProductConfigurationRepository : WriteRepository<Productconfiguration>, IProductConfigurationRepository
    {
        public ProductConfigurationRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
        }

        public async Task<List<ProductConfigResponse>> GetProductConfigurationByProductIdAsync(Guid productId)
        {
            string sql = "SELECT pc.Id AS VariationProductId, pc.VariationOptionGroupId, Price, Inventory, pi.Path AS ImagePath FROM productconfiguration pc" +
                " LEFT JOIN productimage pi ON pc.ProductImageId = pi.Id" +
                " WHERE pc.productId = @productId;";

            DynamicParameters parameters = new();
            parameters.Add("productId", productId);

            var reuslt = await _dbConnection.QueryAsync<ProductConfigResponse>(sql, parameters);

            return reuslt.ToList();
        }

        public async Task<Dictionary<string, string>> GetVariationProductAsync(Guid productConfigId)
        {
            string sql = "SELECT v.Name, vo.Value FROM variationoptiongroup vog" +
                " JOIN variationoption vo ON vog.Id = vo.VariationOptionGroupId" +
                " JOIN variation v ON vo.VariationId = v.Id" +
                " WHERE vog.Id = @productConfigId;";
            DynamicParameters parameters = new();

            parameters.Add("productConfigId", productConfigId);

            var result = await _dbConnection.QueryAsync<VariationValue>(sql, parameters);

            Dictionary<string, string> valuePairs = new();

            foreach(var i in result)
            {
                valuePairs.Add(i.Name, i.Value);
            }

            return valuePairs;
        }
    }
}
