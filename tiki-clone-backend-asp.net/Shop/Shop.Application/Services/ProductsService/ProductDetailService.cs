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
    public class ProductDetailService : WriteService<Productdetail, ProductDetailDTO, ProductDetailCreateDTO, ProductDetailUpdateDTO>, IProductDetailService
    {
        private readonly IProductDetailRepository _productDetailRepository;
        public ProductDetailService(IProductDetailRepository productDetailRepository, IMapper mapper) : base(productDetailRepository, mapper)
        {
            _productDetailRepository = productDetailRepository;
        }

        protected override Task EditData(Productdetail entity)
        {
            // thêm Id, tổng số sao, tổng số đánh giá, tổng số bán
            entity.Id = new Guid();
            entity.TotalStar = 0;
            entity.TotalSell = 0;
            entity.TotalRating = 0;
            return Task.CompletedTask;
        }

        protected override Task ValidateLogicBusiness(Productdetail entity)
        {
            // constraint phải hợp lệ
            return Task.CompletedTask;
        }
    }
}
