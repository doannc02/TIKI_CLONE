using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shop.Application.Interface;
using Shop.Application.Interface.ProductsService;
using Shop.Controllers;
using Shop.Domain.CustomAttibute;
using Shop.Domain.Model.DTO;

namespace Shop.Controller.Controllers.Products
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategorysController : WriteController<CategoryDTO, CategoryCreateDTO, CategoryUpdateDTO>
    {
        private readonly ICategoryService _categoryService;
        public CategorysController(ICategoryService categoryService) : base(categoryService)
        {
            _categoryService = categoryService;
        }
        
        [XAllowAnonymous]
        [HttpGet("filter-property/{categoryName}")]
        public async Task<IActionResult> GetFilterPropertyByNameAsync([FromRoute]string categoryName)
        {
            var result = await _categoryService.GetFilterPropertiesByAsync(categoryName);
            return Ok(result);
        }

        [HttpGet("category-tree")]
        public async Task<IActionResult> GetCategoryTree()
        {
            return Ok(await _categoryService.GetCategoryTreeAsync());
        }
    }
}
