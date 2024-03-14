using AutoMapper;
using Shop.Application.Interface;
using Shop.Application.Interface.UsersService;
using Shop.Application.Services.Base;
using Shop.Domain.Entity;
using Shop.Domain.Interface.Repository;
using Shop.Domain.Model.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Application.Services.UserServices
{
    public class RoleService : WriteService<Role, RoleDTO, RoleDTO, RoleDTO>, IRoleService
    {
        private readonly IRoleRepository _roleRepository;
        public RoleService(IRoleRepository roleRepository, IMapper mapper) : base(roleRepository, mapper)
        {
            _roleRepository = roleRepository;
        }

        public async Task<int> GetCodeByIdAsync(Guid id)
        {
            return await _roleRepository.GetCodeByIdAsync(id);
        }

        protected override Task EditData(Role entity)
        {
            // thêm trạng thái
            entity.Status = 0;
            return Task.CompletedTask;
        }

        protected override Task ValidateLogicBusiness(Role entity)
        {
            return Task.CompletedTask;
        }
    }
}
