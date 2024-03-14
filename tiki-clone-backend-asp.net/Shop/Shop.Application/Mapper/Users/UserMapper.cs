using Shop.Domain.Entity;
using Shop.Domain.Model.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Application.Mapper
{
    public class UserMapper : BaseMapper<User, UserDTO, UserCreateDTO, UserUpdateDTO>
    {
    }
}
