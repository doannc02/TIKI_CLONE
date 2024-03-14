using AutoMapper;
using Shop.Application.Interface.ProductsService;
using Shop.Application.Services.Base;
using Shop.Domain.Entity;
using Shop.Domain.Interface.Repository;
using Shop.Domain.Model.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Application.Services.ProductsService
{
    public class SupplierService : WriteService<Supplier, SupplierDTO, SupplierCreateDTO, SupplierUpdateDTO>, ISupplierService
    {
        private readonly ISupplierRepository _supplierRepository;
        public SupplierService(ISupplierRepository supplierRepository, IMapper mapper) : base(supplierRepository, mapper)
        {
            _supplierRepository = supplierRepository;
        }

        protected override Task EditData(Supplier entity)
        {
            return Task.CompletedTask;
        }

        protected override Task ValidateLogicBusiness(Supplier entity)
        {
            return Task.CompletedTask;
        }
    }
}
