using AutoMapper;
using Shop.Application.Interface.ProductsService;
using Shop.Application.Services.Base;
using Shop.Domain.Entity;
using Shop.Domain.Exceptions;
using Shop.Domain.Interface.Repository;
using Shop.Domain.Model.DTO;
using Shop.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Common;

namespace Shop.Application.Services.ProductsService
{
    public class VariationService : WriteService<Variation, VariationDTO, VariationDTO, VariationDTO>, IVariationService
    {
        private readonly IVariationRepositry _variationRepositry;
        public VariationService(IVariationRepositry variationRepositry, IMapper mapper) : base(variationRepositry, mapper)
        {
            _variationRepositry = variationRepositry;
        }

        protected override Task EditData(Variation entity)
        {
            // thêm id
            entity.Id = new Guid();
            return Task.CompletedTask;
        }

        protected override Task ValidateLogicBusiness(Variation entity)
        {
            // tên không được trùng
            //var variation = await _variationRepositry.GetByNameAsync(entity.Name, null);
            //if(variation != null)
            //{
            //    throw new BadRequestException(ErrorCode.Invalid, $"Thuộc tính {entity.Name} đã tồn tại.");
            //}
            return Task.CompletedTask;
        }

        public async Task<VariationDTO?> GetByNameAsync(string name, DbTransaction? dbTransaction = null)
        {
            var variation = await _variationRepositry.GetByNameAsync(name, dbTransaction);
            var variationDTO = MapEntityToEntiyDTO(variation);
            return variationDTO;
        }

        public async Task<List<VariationDTO>?> GetByNamesAsync(List<string> names, DbTransaction? dbTransaction = null)
        {
            var variations = await _variationRepositry.GetByNamesAsync(names);
            var result = MapListEntityToListEntityDTO(variations);
            return result;

        }
    }
}
