using Dapper;
using Shop.Application.UnitOfWork;
using Shop.Domain.Entity;
using Shop.Domain.Interface.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Infrastructure.Repository
{
    public class ProductDetailRepository : WriteRepository<Productdetail>, IProductDetailRepository
    {
        public ProductDetailRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
        }

        public async Task<Productdetail> GetProductdetailByProductId(Guid productId)
        {
            string sql = "SELECT pd.Id, pd.productId, pd.Name, pd.Brand, pd.InfoDetail, pd.Description, pd.TotalSell, pd.TotalRating, pd.TotalStar FROM productdetail pd" +
                " WHERE pd.ProductId = @productId;";

            DynamicParameters parameters = new();
            parameters.Add("productId", productId);

            var result = await _dbConnection.QueryFirstOrDefaultAsync<Productdetail>(sql, parameters);

            return result;
        }

        public async Task<bool> IsHasProductDetail(Guid productDetailId)
        {
            string sql = "SELECT COUNT(p.Id) as NumOfProduct FROM productdetail p WHERE p.Id = @productDetailId;";
            DynamicParameters parameters = new();
            parameters.Add("productDetailId", productDetailId);
            var result = await _dbConnection.QuerySingleOrDefaultAsync<int>(sql, parameters);

            return result != 0;
        }
    }
}
