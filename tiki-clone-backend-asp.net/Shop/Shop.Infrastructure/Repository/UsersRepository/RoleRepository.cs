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
    public class RoleRepository : WriteRepository<Role>, IRoleRepository
    {
        public RoleRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            
        }

        public async Task<int> GetCodeByIdAsync(Guid id)
        {
            string sql = $"Select code from Role r where r.Id = @id";

            DynamicParameters parameters = new();
            parameters.Add("id", id);

            var code = await _dbConnection.QueryFirstOrDefaultAsync<int>(sql, parameters);

            return code;
        }

        public async Task<Guid> GetIdByNameAsync(string name)
        {
            string sql = $"SELECT Id FROM `role` r WHERE r.`Name` = @name;";

            DynamicParameters parameters = new();
            parameters.Add("name", name);

            var id = await _dbConnection.QuerySingleOrDefaultAsync<Guid>(sql, parameters);
            return id;
        }
    }
}
