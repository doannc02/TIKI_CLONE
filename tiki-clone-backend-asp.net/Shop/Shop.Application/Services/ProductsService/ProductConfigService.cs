using AutoMapper;
using Shop.Application.Interface.ProductsService;
using Shop.Application.Services.Base;
using Shop.Domain.Entity;
using Shop.Domain.Interface.Repository;
using Shop.Domain.Interface.Repository.ProductsRepository;
using Shop.Domain.Model.DTO;
using Shop.Domain.Model.Output;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Application.Services.ProductsService
{
    public class ProductConfigService : WriteService<Productconfiguration, ProductConfigDTO, ProductConfigCreateDTO, ProductConfigUpdateDTO>, IProductConfigurationService
    {
        private readonly IProductConfigurationRepository _productConfigurationRepository;
        public ProductConfigService(IProductConfigurationRepository productConfigurationRepository, IMapper mapper) : base(productConfigurationRepository, mapper)
        {
            _productConfigurationRepository = productConfigurationRepository;
        }

        public async Task<List<ProductConfigResponse>> GetProductConfigByProductIdAsync(Guid productId)
        {
            var result = await _productConfigurationRepository.GetProductConfigurationByProductIdAsync(productId);
            return result;
        }

        public async Task<Dictionary<string, string>> GetVariationProductAsync(Guid productConfigId)
        {
            var result = await _productConfigurationRepository.GetVariationProductAsync(productConfigId);
            return result;
        }

        protected override Task EditData(Productconfiguration entity)
        {
            return Task.CompletedTask;
        }

        protected override Task ValidateLogicBusiness(Productconfiguration entity)
        {
            return Task.CompletedTask;
        }
    }
}
