using AutoMapper;
using Shop.Application.Interface;
using Shop.Application.Interface.ProductsService;
using Shop.Application.Services.Base;
using Shop.Domain.Entity;
using Shop.Domain.Interface.Repository;
using Shop.Domain.Interface.Repository.ProductsRepository;
using Shop.Domain.Model.DTO.FilterPropertyDTO;
using Shop.Domain.Model.Output;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Application.Services.ProductsService
{
    public class FilterPropertyService : WriteService<Filterproperty, FilterPropertyDTO, FilterPropertyDTO, FilterPropertyDTO>, IFilterPropertyService
    {
        private readonly IFilterPropertyRepository _filterPropertyRepository; 
        public FilterPropertyService(IFilterPropertyRepository filterPropertyRepository, IMapper mapper) : base(filterPropertyRepository, mapper)
        {
            _filterPropertyRepository = filterPropertyRepository;
        }

        protected override Task EditData(Filterproperty entity)
        {
            return Task.CompletedTask;
        }

        protected override Task ValidateLogicBusiness(Filterproperty entity)
        {
            return Task.CompletedTask;
        }

        public async Task<List<FilterProperty>> GetFilterPropertiesByCategoryCodeAsync(string code)
        {
            return await _filterPropertyRepository.GetFilterPropertiesByCategoryCodeAsync(code);
        }
    }
}
