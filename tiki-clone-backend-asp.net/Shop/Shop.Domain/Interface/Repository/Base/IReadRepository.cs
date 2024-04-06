
using Shop.Domain.Model.Input;
using Shop.Domain.Model.Output;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Interface.Repository
{
    public interface IReadRepository<T> where T : class
    {
        /// <summary>
        /// lấy tất cả bản ghi
        /// </summary>
        /// <returns></returns>
        /// author: Trương Mạnh Quang (28/10/2023) 
        Task<IEnumerable<T>> GetAllAsync();
        /// <summary>
        /// lấy 1 bản ghi theo Id
        /// </summary>
        /// <returns></returns>
        /// author: Trương Mạnh Quang (28/10/2023)
        Task<T> GetByIdAsync(Guid id, DbTransaction? dbTransaction = null);
        /// <summary>
        /// lấy nhiều bản ghi theo danh sách Id
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        /// author: Trương Mạnh Quang (28/10/2023)
        Task<IEnumerable<T>> GetByIdsAsync(List<Guid> ids, DbTransaction? dbTransaction = null);
        /// <summary>
        /// lấy 1 bản ghi theo mã (mã không được trùng nhau)
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        Task<T> GetByCodeAsync(string code, DbTransaction? dbTransaction = null);
        /// <summary>
        /// lọc bản ghi
        /// </summary>
        /// <param name="filterInput"></param>
        /// <returns>danh sách các bản ghi đã được lọc</returns>
        /// author: Trương Mạnh Quang (28/10/2023)
        //Task<IEnumerable<T>> FilterAsync(FilterInput filterInput);
        /// <summary>
        /// lọc và phân trang bản ghi
        /// </summary>
        /// <param name="filterInput"></param>
        /// <returns>danh sách đã được lọc và phân trang</returns>
        /// author: Trương Mạnh Quang (28/10/2023)
        Task<FilterPaging<T>> FillterPagingAsync(int pageNumber, int pageSize, string search);

    }
}
