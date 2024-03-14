using Dapper;
using Microsoft.EntityFrameworkCore;
using Shop.Application;
using Shop.Application.UnitOfWork;
using Shop.Domain;
using Shop.Domain.Entity;
using Shop.Domain.Interface.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Infrastructure.Repository
{
    public class UserRepository : WriteRepository<User>, IUserRepository
    {
        public UserRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
        }

        public async Task<string> GenerationCode()
        {
            string proc = "Proc_User_NewCode";

            // thực hiện try vấn
            var result = (List<string>)await _unitOfWork.Connection.QueryAsync<string>(proc, commandType: CommandType.StoredProcedure);

            string newCode = result.ToArray()[0];
            return newCode;
        }

        public async Task<bool> IsDuplicateCode(string code)
        {
            string sql = "Select COUNT(*) From User Where Code = @code";

            DynamicParameters dynamicParameters = new();

            dynamicParameters.Add("code", code);

            var result = await _dbConnection.QuerySingleAsync<int>(sql, dynamicParameters);
            return result != 0;
        }

        public async Task<string> GetPasswordByEmail(string email)
        {
            string sql = "Select Password From User Where Email = @email";
            
            DynamicParameters dynamicParameters = new();

            dynamicParameters.Add("email", email);

            var result = await _dbConnection.QuerySingleAsync<string>(sql, dynamicParameters);

            return result;
        }

        public async Task<User?> GetUserByEmail(string email)
        {
            string sql = "Select * From User Where Email = @email";

            DynamicParameters dynamicParameters = new();

            dynamicParameters.Add("email", email);

            var result = await _dbConnection.QueryFirstOrDefaultAsync<User>(sql, dynamicParameters);

            return result;
        }

        public async Task<string?> GetRefreshTokenByEmailAsync(string email)
        {
            string sql = "Select RefreshToken From User Where Email = @email";
            DynamicParameters dynamicParameters = new();
            dynamicParameters.Add("email", email);
            var result = await _dbConnection.QueryFirstOrDefaultAsync<string>(sql, dynamicParameters);
            return result;
        }

        public async Task SetRefreshTokenByEmailAsync(string email, string token)
        {
            var userNeedEdit = await _dbSet.FirstOrDefaultAsync(user => user.Email == email);
            if(userNeedEdit != null)
            {
                userNeedEdit.RefreshToken = token;
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
