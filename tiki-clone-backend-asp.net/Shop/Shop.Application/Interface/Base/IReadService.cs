using Shop.Domain.Model;
using Shop.Domain.Model.Input;
using Shop.Domain.Model.Output;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Application.Interface
{
    public interface IReadService<TEntityDTO>
        where TEntityDTO : class
    {
        /// <summary>
        /// lấy tất cả bản ghi
        /// </summary>
        /// <returns></returns>
        /// author: Trương Mạnh Quang (4/11/2023) 
        Task<IEnumerable<TEntityDTO>> GetAllAsync();
        /// <summary>
        /// lấy 1 bản ghi theo Id
        /// </summary>
        /// <returns></returns>
        /// author: Trương Mạnh Quang (4/11/2023)
        Task<TEntityDTO> GetByIdAsync(Guid id, DbTransaction? dbTransaction = null);
        /// <summary>
        /// lấy nhiều bản ghi theo danh sách Id
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        /// author: Trương Mạnh Quang (4/11/2023)
        Task<IEnumerable<TEntityDTO>> GetByIdsAsync(List<Guid> ids, DbTransaction? dbTransaction = null);
        /// <summary>
        /// lấy 1 bản ghi theo mã (mã không được trùng nhau)
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        /// /// author: Trương Mạnh Quang (4/11/2023)
        Task<TEntityDTO> GetByCodeAsync(string code, DbTransaction? dbTransaction = null);
        /// <summary>
        /// lọc bản ghi
        /// </summary>
        /// <param name="filterInput"></param>
        /// <returns>danh sách các bản ghi đã được lọc</returns>
        /// author: Trương Mạnh Quang (4/11/2023)
        Task<IEnumerable<TEntityDTO>> FilterAsync(FilterInput filterInput);
        /// <summary>
        /// lọc và phân trang bản ghi
        /// </summary>
        /// <param name="filterInput"></param>
        /// <returns>danh sách đã được lọc và phân trang</returns>
        /// author: Trương Mạnh Quang (4/11/2023)
        Task<FilterPaging<TEntityDTO>> FillterPagingAsync(int pageNumber, int pageSize, FilterInput filterInput);
    }
}
