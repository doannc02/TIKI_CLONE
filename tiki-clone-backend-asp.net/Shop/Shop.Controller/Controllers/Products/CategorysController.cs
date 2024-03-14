using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shop.Application.Interface;
using Shop.Application.Interface.ProductsService;
using Shop.Controllers;
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
    }
}
