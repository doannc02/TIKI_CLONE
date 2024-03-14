using Shop.Domain.Model.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Application.Interface.ProductsService
{
    public interface IVariationOptionGroupService : IWriteService<VariationOptionGroupDTO, VariationOptionGroupDTO, VariationOptionGroupDTO>
    {
    }
}
