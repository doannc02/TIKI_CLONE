using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shop.Application.Interface.ProductsService;
using Shop.Controllers;
using Shop.Domain.Model.DTO.FilterPropertyDTO;

namespace Shop.Controller.Controllers.Products
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilterPropertysController : ControllerBase
    {
        private readonly IFilterPropertyService _filterPropertyService;
        public FilterPropertysController(IFilterPropertyService filterPropertyService)
        {
            _filterPropertyService = filterPropertyService;
        }

        [HttpGet("{category}")]
        public async Task<IActionResult> GetByCategory([FromRoute]string category)
        {
            var result = await _filterPropertyService.GetFilterPropertiesByCategoryCodeAsync(category);
            return Ok(result);
        }
    }
}
