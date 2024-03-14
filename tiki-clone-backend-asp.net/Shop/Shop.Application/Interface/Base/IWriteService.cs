using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Application.Interface
{
    public interface IWriteService<TEntityDTO, TEntityCreateDTO, TEntityUpdateDTO> : IReadService<TEntityDTO>
        where TEntityDTO : class
        where TEntityCreateDTO : class
        where TEntityUpdateDTO : class
    {
        /// <summary>
        /// thêm mới 1 bản ghi
        /// </summary>
        /// <param name="entity"></param>
        /// <returns>bản ghi đã thêm mới</returns>
        /// author: Trương Mạnh Quang (28/10/2023)
        Task<TEntityDTO> CreateAsync(TEntityCreateDTO entity, DbTransaction? dbContextTransaction = null);
        /// <summary/>
        /// thêm mới nhiều bản ghi
        /// </summary>
        /// <param name="entities"></param>
        /// <returns>số lượng bản ghi đã thêm mới</returns>
        /// author: Trương Mạnh Quang (28/10/2023)
        Task<List<TEntityDTO>> CreateManyAsync(List<TEntityCreateDTO> entities, DbTransaction? dbContextTransaction = null);
        /// <summary>
        /// cập nhật 1 bản ghi
        /// </summary>
        /// <param name="entity"></param>
        /// <returns>bản ghi đã cập nhật</returns>
        /// author: Trương Mạnh Quang (28/10/2023)
        TEntityDTO Update(TEntityUpdateDTO entity);
        /// <summary>
        /// cập nhật nhiều bản ghi
        /// </summary>
        /// <param name="entities"></param>
        /// <returns>số lượng bản ghi đã cập nhật</returns>
        /// author: Trương Mạnh Quang (28/10/2023)
        int UpdateMany(List<TEntityUpdateDTO> entities);
        /// <summary>
        /// xóa 1 bản ghi
        /// </summary>
        /// <param name="entity"></param>
        /// <returns>boolean: true or false</returns>
        /// author: Trương Mạnh Quang (28/10/2023)
        Task<TEntityDTO?> DeleteAsync(Guid id);
        /// <summary>
        /// xóa nhiều bản ghi
        /// </summary>
        /// <returns>boolean: true or false</returns>
        /// author: Trương Mạnh Quang (28/10/2023)
        int DeleteMany(List<TEntityDTO> entities);
    }
}
