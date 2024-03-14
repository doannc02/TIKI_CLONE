using Dapper;
using Shop.Application.UnitOfWork;
using Shop.Domain.Entity;
using Shop.Domain.Interface.Repository;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Infrastructure.Repository
{
    public class VariationRepository : WriteRepository<Variation>, IVariationRepositry
    {
        public VariationRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
        }

        public async Task<Variation> GetByNameAsync(string name, DbTransaction? dbTransaction = null)
        {
            string sql = $"Select * From {TableName} Where Name = @name";
            DynamicParameters dynamicParameters = new();
            dynamicParameters.Add("name", name);
            var result = await _dbConnection.QuerySingleOrDefaultAsync<Variation>(sql, dynamicParameters, dbTransaction);
            return result;
        }
    }
}
