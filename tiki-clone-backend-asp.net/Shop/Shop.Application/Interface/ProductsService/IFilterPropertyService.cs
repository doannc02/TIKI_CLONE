using Shop.Application.Interface;
using Shop.Domain.Model.DTO.FilterPropertyDTO;
using Shop.Domain.Model.Output;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Application.Interface.ProductsService
{
    public interface IFilterPropertyService : IWriteService<FilterPropertyDTO, FilterPropertyDTO, FilterPropertyDTO>
    {
        Task<List<FilterProperty>> GetFilterPropertiesByCategoryCodeAsync(string code);
    }
}
