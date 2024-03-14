using AutoMapper;
using Shop.Application.Interface;
using Shop.Application.Interface.ProductsService;
using Shop.Application.Services.Base;
using Shop.Application.UnitOfWork;
using Shop.Domain.Entity;
using Shop.Domain.Enum;
using Shop.Domain.Exceptions;
using Shop.Domain.Interface.Repository;
using Shop.Domain.Model.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Application.Services.ProductsService
{
    public class BrandService : WriteService<Brand, BrandDTO, BrandCreateDTO, BrandUpdateDTO>, IBrandService
    {
        private readonly IBrandRepository _repository;
        private readonly IUnitOfWork _unitOfWork;
        public BrandService(IBrandRepository repository, IMapper mapper, IUnitOfWork unitOfWork) : base(repository, mapper)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
        }

        protected override Task EditData(Brand entity)
        {
            // thêm id
            entity.Id = new Guid();
            // thêm trạng thái
            entity.Status = 1;

            return Task.CompletedTask;
        }

        protected override async Task ValidateLogicBusiness(Brand entity)
        {
            // code phải duy nhất
            _ = await _repository.GetByCodeAsync(entity.Code) ?? throw new BadRequestException(ErrorCode.InvalidInput, "Thương hiệu đã tồn tại");
        }

        public async Task<Brand> TestBrand()
        {
            using var transaction = await _unitOfWork.BeginTransactionAsync();
            try
            {
                var brand = _repository.TestCreateBrand(transaction);

                transaction.Commit();
                return brand;
            }
            catch(Exception ex)
            {
                transaction.Rollback();
                throw ex;
            }
        }
    }
}
