using AutoMapper;
using Shop.Application.Interface;
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
    public class VariationOptionService : WriteService<Variationoption, VariationOptionDTO, VariationOptionDTO, VariationOptionDTO>, IVariationOptionService
    {
        private readonly IVariationOptionRepository _variationOptionRepository;
        public VariationOptionService(IVariationOptionRepository variationOptionRepository, IMapper mapper) : base(variationOptionRepository, mapper)
        {
            _variationOptionRepository = variationOptionRepository;
        }

        protected override Task EditData(Variationoption entity)
        {
            return Task.CompletedTask;
        }

        protected override Task ValidateLogicBusiness(Variationoption entity)
        {
            return Task.CompletedTask;
        }
    }
}
