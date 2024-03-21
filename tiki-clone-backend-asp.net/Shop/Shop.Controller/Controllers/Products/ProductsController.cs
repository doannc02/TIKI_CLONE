using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shop.Application.Interface;
using Shop.Application.Interface.ProductsService;
using Shop.Domain.Entity;
using Shop.Domain.Interface.UseCases;
using Shop.Domain.Model.DTO;
using Shop.Domain.Model.Request;

namespace Shop.Controllers
{
    [Route("api/")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductUseCase _productUseCase;
        public ProductsController(IProductUseCase productUseCase)
        {
            _productUseCase = productUseCase;
        }

        [HttpPost()]
        public async Task<IActionResult> AddNewProduct([FromForm] ProductForm productForm)
        {
            var result = await _productUseCase.AddNewProduct(productForm);
            return Ok(result);
        }

        [HttpGet("{categoryName}/")]
        public async Task<IActionResult> FilterPagingProductAsync([FromRoute] string categoryName,[FromQuery] Dictionary<string, string> conditions)
        {
            var result = await _productUseCase.PagingFilterProductByCategoryAsync(categoryName, conditions);
            return Ok(result);
        }
    }
}
