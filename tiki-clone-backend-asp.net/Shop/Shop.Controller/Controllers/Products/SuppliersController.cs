using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shop.Application.Interface.ProductsService;
using Shop.Controllers;
using Shop.Domain.Model.DTO;

namespace Shop.Controller.Controllers.Products
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuppliersController : WriteController<SupplierDTO, SupplierCreateDTO, SupplierUpdateDTO>
    {
        private readonly ISupplierService _supplierService;
        public SuppliersController(ISupplierService supplierService) : base(supplierService)
        {
            _supplierService = supplierService;
        }
    }
}
