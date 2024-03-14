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
    }
}
