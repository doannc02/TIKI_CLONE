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
    public class VariationOptionGroupService : WriteService<Variationoptiongroup, VariationOptionGroupDTO, VariationOptionGroupDTO, VariationOptionGroupDTO>, IVariationOptionGroupService
    {
        private readonly IVariationOptionGroupRepository _variationOptionGroupRepository;
        public VariationOptionGroupService(IVariationOptionGroupRepository variationOptionGroupRepository, IMapper mapper) : base(variationOptionGroupRepository, mapper)
        {
            _variationOptionGroupRepository = variationOptionGroupRepository;
        }

        protected override Task EditData(Variationoptiongroup entity)
        {
            return Task.CompletedTask;
        }

        protected override Task ValidateLogicBusiness(Variationoptiongroup entity)
        {
            return Task.CompletedTask;
        }
    }
}
