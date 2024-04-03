using Shop.Domain.Model.DTO;
using Shop.Domain.Model.Output;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Application.Interface.ProductsService
{
    public interface ICategoryService : IWriteService<CategoryDTO, CategoryCreateDTO, CategoryUpdateDTO>
    {
        public Task<List<FilterProperty>> GetFilterPropertiesByAsync(string categoryName);

        /// <summary>
        /// lấy ra cây danh mục
        /// </summary>
        /// <param name="categoryDTOs"></param>
        /// <returns></returns>
        public Task<string> GetCategoryTreeAsync();
    }
}
