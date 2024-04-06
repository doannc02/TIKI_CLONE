using Dapper;
using Shop.Application.UnitOfWork;
using Shop.Domain.Entity;
using Shop.Domain.Interface.Repository;
using Shop.Domain.Model.Output;
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

        public override Task<FilterPaging<Variation>> FillterPagingAsync(int pageNumber, int pageSize, string search)
        {
            throw new NotImplementedException();
            //return base.FillterPagingAsync(pageNumber, pageSize, search);
        }

        public async Task<Variation> GetByNameAsync(string name, DbTransaction? dbTransaction = null)
        {
            string sql = $"Select v.Id, v.Name From {TableName} v Where Name = @name";
            DynamicParameters dynamicParameters = new();
            dynamicParameters.Add("name", name);
            var result = await _dbConnection.QuerySingleOrDefaultAsync<Variation>(sql, dynamicParameters, dbTransaction);
            return result;
        }
        public async Task<List<Variation>> GetByNamesAsync(List<string> names, DbTransaction? dbTransaction = null)
        {
            string sql = $"Select v.Id, v.Name, v.Discription From {TableName} v Where Name IN @names";
            DynamicParameters dynamicParameters = new();
            dynamicParameters.Add("names", names);
            var result = await _dbConnection.QueryAsync<Variation>(sql, dynamicParameters, dbTransaction);
            return result.ToList();
        }

        public async Task<bool> IsHasVariationNameAsync(string name)
        {
            string sql = $"Select Id From {TableName} v Where v.Name = @name";
            DynamicParameters dynamicParameters = new();
            dynamicParameters.Add("name", name);
            var result = await _dbConnection.QueryFirstOrDefaultAsync(sql, dynamicParameters);
            return result != null;
        }
    }
}
