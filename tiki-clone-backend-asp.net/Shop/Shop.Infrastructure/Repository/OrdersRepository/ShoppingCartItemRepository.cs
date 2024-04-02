using Dapper;
using Shop.Application.UnitOfWork;
using Shop.Domain.Entity;
using Shop.Domain.Interface.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Infrastructure
{
    public class ShoppingCartItemRepository : WriteRepository<Shoppingcartitem>, IShoppingCartItemRepository
    {
        public ShoppingCartItemRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
        }

        public async Task<bool> IsHasCartItemAsync(Guid productDetailId)
        {
            string sql = "SELECT COUNT(s.Id) FROM shoppingcartitem s WHERE s.ProductsDetailId = @productDetailId;";
            DynamicParameters parameters = new();
            parameters.Add("productDetailId", productDetailId);
            var result = await _dbConnection.QuerySingleOrDefaultAsync<int>(sql, parameters);

            return result != 0;
        }

        public async Task UpdateQuantityAsync(Guid productDetailId, int quantity)
        {
            string sql = "UPDATE shoppingcartitem SET Quantity = @quantity WHERE ProductsDetailId = @productDetailId";

            DynamicParameters parameters = new();
            parameters.Add("quantity", quantity);
            parameters.Add("productDetailId", productDetailId);

            var result = await _dbConnection.ExecuteAsync(sql, parameters);
        }
    }
}
