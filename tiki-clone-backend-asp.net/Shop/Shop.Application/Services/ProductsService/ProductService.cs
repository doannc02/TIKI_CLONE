using AutoMapper;
using Shop.Application.Interface.ProductsService;
using Shop.Application.Services.Base;
using Shop.Domain.Entity;
using Shop.Domain.Interface.Repository;
using Shop.Domain.Model.DTO;
using Shop.Domain.Model.Input;
using Shop.Domain.Model.Output;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Application.Services.ProductsService
{
    public class ProductService : WriteService<Product, ProductDTO, ProductCreateDTO, ProductUpdateDTO>, IProductService
    {
        private readonly IProductRepository _productRepository;
        public ProductService(IProductRepository productRepository, IMapper mapper) : base(productRepository, mapper)
        {
            _productRepository = productRepository;
        }

        protected override Task EditData(Product entity)
        {

            // thêm id và status
            entity.Id = new Guid();
            entity.Status = 1;
            return Task.CompletedTask;
        }

        protected override Task ValidateLogicBusiness(Product entity)
        {
            // code không được trùng

            // constraint phải hợp lệ
            return Task.CompletedTask;
        }
    }
}
