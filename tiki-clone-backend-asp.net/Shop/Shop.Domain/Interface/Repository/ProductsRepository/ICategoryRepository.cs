using Shop.Domain.Entity;
using Shop.Domain.Model.Output;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Interface.Repository
{
    public interface ICategoryRepository : IWriteRepository<Category>
    {
        /// <summary>
        /// lấy các trường lọc theo danh mục
        /// </summary>
        /// <returns></returns>
        public Task<List<FilterProperty>> GetFilterPropertiesByAsync(string categoryName);
    }
}
