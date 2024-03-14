using Shop.Application;
using Shop.Domain;
using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Common;
using Shop.Domain.Model;
using Shop.Application.UnitOfWork;
using Shop.Domain.Model.Request;
using Shop.Domain.Model.Response;
using Shop.Domain.Interface.Repository;
using Shop.Domain.Model.Output;
using Shop.Domain.Model.Input;

namespace Shop.Infrastructure
{
    public abstract class ReadRepository<T> : IReadRepository<T> where T : class
    {
        protected readonly IUnitOfWork _unitOfWork;
        protected virtual string TableName { get; set; } = typeof(T).Name;
        protected readonly DbConnection _dbConnection;
        public ReadRepository(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _dbConnection = _unitOfWork.Connection;
        }
        public async Task<FilterPaging<T>> FillterPagingAsync(int pageNumber, int pageSize, FilterInput filterInput)
        {
            if (pageNumber <= 0 || pageSize <= 0)
            {
                return new FilterPaging<T>();
            }
            else
            {
                int totalRecord;
                int totalPage;
                int currentPage;
                int currentRecord;
                string sql = $"SELECT #output FROM {TableName} WHERE #condition AND #searchKey #paing";
                DynamicParameters parameters = new();

                if (filterInput.IsSearchKeyEmpty() || filterInput.IsSearchFieldAnyEmpty())
                {
                    sql = sql.Replace("#searchKey", "1=1");
                }
                else
                {
                    List<string> searchCondition = new();
                    Type tType = typeof(T);
                    
                    for(int i = filterInput.SearchField.Count - 1; i >= 0; i--)
                    {
                        if(tType.GetFields().Any(item=>item.Name == filterInput.SearchField[i]))
                        {
                            searchCondition.Add($"({filterInput.SearchField[i]} = @searchKey");
                        }
                    }
                    sql = sql.Replace("#searchKey", string.Join(" OR ", searchCondition));
                    parameters.Add("@searchKey", filterInput.SearchKey);

                }

                if (filterInput.IsConditionEmpty())
                {
                    sql = sql.Replace("#condition", "1=1");
                }
                else
                {
                    sql = sql.Replace("#condition", "@condition");
                    parameters.Add("@condition", filterInput.Condition);
                }

                // count total record
                string sqlCountRecord = sql.Replace("#output", "COUNT(*)");
                sqlCountRecord = sqlCountRecord.Replace("#paging", string.Empty);

                totalRecord = await _dbConnection.QuerySingleAsync<int>(sqlCountRecord, parameters);

                ////
                if (totalRecord == 0)
                {
                    return new FilterPaging<T>();
                }
                else
                {
                    totalPage = (int)Math.Ceiling(totalRecord * 1.0 / pageSize);
                    currentPage = Math.Min(totalPage, pageNumber);
                    currentRecord = currentPage < totalPage ? pageSize : totalRecord - ((currentPage - 1) * pageSize);
                    int skipRecord = (currentPage - 1) * pageSize;

                    string sqlFilterPaging = sql.Replace("#output", "*");
                    sqlFilterPaging = sqlFilterPaging.Replace("#paging", "ORDER BY ModifiedDate DESC, CreatedDate DESC  LIMIT @skipRecord,@pageSize");

                    parameters.Add("skipRecord", skipRecord);
                    parameters.Add("pageSize", pageSize);

                    var listRecord = await _dbConnection.QueryAsync<T>(sqlFilterPaging, parameters);

                    return new FilterPaging<T>()
                    {
                        TotalRecord = totalRecord,
                        TotalPage = totalPage,
                        Size = currentRecord,
                        Page = currentPage,
                        Items = listRecord.AsList(),
                    };
                }
            }

        }

        public async Task<IEnumerable<T>> FilterAsync(FilterInput filterInput)
        {
            if (filterInput.IsSearchKeyEmpty() && filterInput.IsConditionEmpty())
            {
                return await GetAllAsync();
            }
            else
            {
                string condition = filterInput.Condition ?? "1=1";

                string sql = $"SELECT * FROM {TableName} WHERE @condition ORDER BY ModifiedDate DESC, CreatedDate DESC";

                DynamicParameters parameters = new();
                parameters.Add("condition", condition);

                if (filterInput.IsSearchKeyEmpty())
                {
                    sql += $" AND (Code = @searchKey OR Name = @searchKey)";
                    parameters.Add("searchKey", filterInput.SearchKey);
                }

                var result = await _dbConnection.QueryAsync<T>(sql, parameters);
                return result;
            }
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            string sql = $"SELECT * FROM {TableName}";
            var result = await _dbConnection.QueryAsync<T>(sql, transaction: null);
            return result;
        }

        public async Task<T> GetByCodeAsync(string code, DbTransaction? dbTransaction = null)
        {
            string sql = $"SELECT * FROM {TableName} WHERE Code = @code";

            DynamicParameters parameters = new();
            parameters.Add("code", code);

            var result = await _dbConnection.QuerySingleAsync<T>(sql, parameters, dbTransaction);
            return result;
        }

        public async Task<T> GetByIdAsync(Guid id, DbTransaction? dbTransaction = null)
        {
            string sql = $"SELECT * FROM {TableName} WHERE Id = @id";

            DynamicParameters parameters = new();
            parameters.Add("id", id);

            var result = await _dbConnection.QuerySingleAsync<T>(sql, parameters, dbTransaction);
            return result;
        }

        public async Task<IEnumerable<T>> GetByIdsAsync(List<Guid> ids, DbTransaction? dbTransaction = null)
        {
            string sql = $"SELECT * FROM {TableName} WHERE Id IN @ids";

            DynamicParameters parameters = new();
            parameters.Add("ids", ids);

            var result = await _dbConnection.QueryAsync<T>(sql, parameters, dbTransaction);
            return result;
        }

    }
}
