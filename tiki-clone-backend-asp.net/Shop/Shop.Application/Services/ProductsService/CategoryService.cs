using AutoMapper;
using Shop.Application.Interface.ProductsService;
using Shop.Application.Services.Base;
using Shop.Domain.Entity;
using Shop.Domain.Interface.Repository;
using Shop.Domain.Model.DTO;
using Shop.Domain.Model.Output;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Application.Services.ProductsService
{
    public class CategoryService : WriteService<Category, CategoryDTO, CategoryCreateDTO, CategoryUpdateDTO>, ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        public CategoryService(ICategoryRepository repository, IMapper mapper) : base(repository, mapper)
        {
            _categoryRepository = repository;
        }

        protected override Task EditData(Category entity)
        {
            throw new NotImplementedException();
        }

        protected override Task ValidateLogicBusiness(Category entity)
        {
            throw new NotImplementedException();
        }

        public async Task<List<FilterProperty>> GetFilterPropertiesByAsync(string categoryName)
        {
            return await _categoryRepository.GetFilterPropertiesByAsync(categoryName);
        }
    }
}
