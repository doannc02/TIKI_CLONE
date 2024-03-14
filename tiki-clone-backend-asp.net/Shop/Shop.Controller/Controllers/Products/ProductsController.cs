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
    [Route("api/[controller]")]
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
        
        [HttpPost("/test")]
        public IActionResult AddNewProduct1(List<IFormFile> formFile)
        {
            return Ok(formFile);
        }
    }
}
