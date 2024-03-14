using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shop.Application.Interface;
using Shop.Application.Interface.ProductsService;
using Shop.Controllers;
using Shop.Domain.Interface.Repository;
using Shop.Domain.Model.DTO;

namespace Shop.Controller.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandsController : WriteController<BrandDTO, BrandCreateDTO, BrandUpdateDTO>
    {
        private readonly IBrandService _brandService;

        private readonly IBrandRepository _brandRepository;
        public BrandsController(IBrandService brandService, IBrandRepository brandRepository) : base(brandService)
        {
            _brandService = brandService;
            _brandRepository = brandRepository;
        }

        [HttpPost("test")]
        public async Task<IActionResult> TestBrand()
        {
            var result = await _brandService.TestBrand();
            return Ok(result);
        }

    }
}
