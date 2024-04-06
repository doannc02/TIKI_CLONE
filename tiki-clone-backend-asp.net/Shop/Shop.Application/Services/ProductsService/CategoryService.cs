using AutoMapper;
using Shop.Application.Interface.ProductsService;
using Shop.Application.Services.Base;
using Shop.Domain.Entity;
using Shop.Domain.Interface.Repository;
using Shop.Domain.Model.DTO;
using Shop.Domain.Model.Output;
using Shop.Domain.Model.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.Unicode;
using System.Threading.Tasks;
using System.Xml;

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

        public async Task<string> GetCategoryTreeAsync()
        {
            var categorys = await _categoryRepository.GetAllAsync();
            var categoryDTOs = MapListEntityToListEntityDTO(categorys.ToList());
            Dictionary<Guid, CategoryDTO> categoryDictionary = new Dictionary<Guid, CategoryDTO>();

            foreach (var category in categoryDTOs)
            {
                categoryDictionary.Add(category.Id, category);
            }

            foreach (var category in categoryDTOs)
            {
                if (category.ParentId.HasValue && categoryDictionary.ContainsKey(category.ParentId.Value))
                {
                    CategoryDTO parentCategory = categoryDictionary[category.ParentId.Value];
                    if (parentCategory.Subcategories == null)
                    {
                        parentCategory.Subcategories = new List<CategoryDTO>();
                    }
                    parentCategory.Subcategories.Add(category);
                }
            }

            List<CategoryDTO> rootCategories = categoryDTOs.FindAll(c => !c.ParentId.HasValue);

            //var result = new PageResponse<List<CategoryDTO>>()
            //{
            //    Message = "Success",
            //    TraceId = "",
            //    Data = rootCategories;
            //}

            return JsonSerializer.Serialize(rootCategories);
        }
    }
}
