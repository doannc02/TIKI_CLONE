using Shop.Domain.Model.DTO;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Application.Interface.ProductsService
{
    public interface IVariationService : IWriteService<VariationDTO, VariationDTO, VariationDTO>
    {
        /// <summary>
        /// lấy variation theo tên
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public Task<VariationDTO?> GetByNameAsync(string name, DbTransaction? dbTransaction = null);

        public Task<List<VariationDTO>?> GetByNamesAsync(List<string> names, DbTransaction? dbTransaction = null);
    }
}
