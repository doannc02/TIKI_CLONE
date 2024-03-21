using Dapper;
using Shop.Application.UnitOfWork;
using Shop.Domain.Entity;
using Shop.Domain.Interface.Repository;
using Shop.Domain.Interface.Repository.ProductsRepository;
using Shop.Domain.Model.Output;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Infrastructure.Repository.ProductsRepository
{
    public class FilterPropertyRepository : WriteRepository<Filterproperty>, IFilterPropertyRepository
    {
        public FilterPropertyRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
        }

        public async Task<List<FilterProperty>> GetFilterPropertiesByCategoryCodeAsync(string code)
        {
            string sql = "SELECT f.Code, v.Name FROM filterproperty f " +
                "JOIN category c ON f.CategoryId = c.Id " +
                "JOIN variation v ON f.VariationId = v.Id " +
                "WHERE c.Code = @code;";

            DynamicParameters parameters = new();
            parameters.Add("categoryName", code);

            var prop = await _dbConnection.QueryAsync<FilterProperty>(sql, parameters);

            return prop.ToList();
        }
    }
}
