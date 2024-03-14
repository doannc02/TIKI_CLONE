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
    public class VariationsController : WriteController<VariationDTO, VariationDTO, VariationDTO>
    {
        private readonly IVariationService _variationService;
        public VariationsController(IVariationService variationService) : base(variationService)
        {
            _variationService = variationService;
        }
    }
}
