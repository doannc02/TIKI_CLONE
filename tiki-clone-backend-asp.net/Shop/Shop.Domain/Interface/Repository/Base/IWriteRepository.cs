using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Interface.Repository
{
    public interface IWriteRepository<T> : IReadRepository<T> where T : class
    {
        /// <summary>
        /// thêm mới 1 bản ghi
        /// </summary>
        /// <param name="entity"></param>
        /// <returns>bản ghi đã thêm mới</returns>
        /// author: Trương Mạnh Quang (28/10/2023)
        Task<T> CreateAsync(T entity, DbTransaction? dbContextTransaction);
        /// <summary/>
        /// thêm mới nhiều bản ghi
        /// </summary>
        /// <param name="entities"></param>
        /// <returns>số lượng bản ghi đã thêm mới</returns>
        /// author: Trương Mạnh Quang (28/10/2023)
        Task<List<T>> CreateManyAsync(List<T> entities, DbTransaction? dbContextTransaction);
        /// <summary>
        /// cập nhật 1 bản ghi
        /// </summary>
        /// <param name="entity"></param>
        /// <returns>bản ghi đã cập nhật</returns>
        /// author: Trương Mạnh Quang (28/10/2023)
        T UpdateAsync(T entity);
        /// <summary>
        /// cập nhật nhiều bản ghi
        /// </summary>
        /// <param name="entities"></param>
        /// <returns>số lượng bản ghi đã cập nhật</returns>
        /// author: Trương Mạnh Quang (28/10/2023)
        int UpdateMany(List<T> entities);
        /// <summary>
        /// xóa 1 bản ghi
        /// </summary>
        /// <param name="entity"></param>
        /// <returns>entity đã bị xóa</returns>
        /// author: Trương Mạnh Quang (28/10/2023)
        Task<T> Delete(T entity, DbTransaction? dbContextTransaction = null);
        /// <summary>
        /// xóa nhiều bản ghi
        /// </summary>
        /// <returns>boolean: true or false</returns>
        /// author: Trương Mạnh Quang (28/10/2023)
        int DeleteManyAsync(List<T> entities);
    }
}
