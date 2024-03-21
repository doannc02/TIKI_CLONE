using Shop.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Interface.Repository
{
    public interface IVariationRepositry : IWriteRepository<Variation>
    {
        /// <summary>
        /// lấy variation theo tên
        /// </summary>
        /// <param name="name"></param>
        /// <returns>variation</returns>
        public  Task<Variation> GetByNameAsync(string name, DbTransaction? dbTransaction = null);

        /// <summary>
        /// lấy variation theo danh sách tên
        /// </summary>
        /// <param name="names"></param>
        /// <param name="dbTransaction"></param>
        /// <returns></returns>
        public Task<List<Variation>> GetByNamesAsync(List<string> names, DbTransaction? dbTransaction = null);

        /// <summary>
        /// kiểm tra có biến thể không. Nếu có trả về true, ngược lại false
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public Task<bool> IsHasVariationNameAsync(string name);
    }
}
