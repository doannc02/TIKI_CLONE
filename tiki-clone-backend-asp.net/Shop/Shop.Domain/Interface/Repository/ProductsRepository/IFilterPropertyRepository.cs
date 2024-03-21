using Shop.Domain.Entity;
using Shop.Domain.Model.Output;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Interface.Repository.ProductsRepository
{
    public interface IFilterPropertyRepository : IWriteRepository<Filterproperty>
    {
        Task<List<FilterProperty>> GetFilterPropertiesByCategoryCodeAsync(string code);
    }
}
