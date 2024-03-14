using Shop.Domain.Model.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Application.Interface
{
    public interface IRoleService : IWriteService<RoleDTO, RoleDTO, RoleDTO>
    {
        /// <summary>
        /// lấy tên Role theo Id
        /// </summary>
        /// <param name="id">id của Role</param>
        /// <returns>Tên Role cần lấy</returns>
        Task<int> GetCodeByIdAsync(Guid id);
    }
}
