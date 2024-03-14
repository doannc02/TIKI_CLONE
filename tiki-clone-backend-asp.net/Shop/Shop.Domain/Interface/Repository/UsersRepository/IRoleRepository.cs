using Shop.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Interface.Repository
{
    public interface IRoleRepository : IWriteRepository<Role>
    {
        /// <summary>
        /// lấy tên Role theo Id
        /// </summary>
        /// <param name="id">id của Role</param>
        /// <returns>Tên Role cần lấy</returns>
        Task<int> GetCodeByIdAsync(Guid id);
    }
}
