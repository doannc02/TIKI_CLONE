using AutoMapper;
using Shop.Application.Interface;
using Shop.Domain;
using Shop.Domain.Interface.Repository;
using Shop.Domain.Model;
using Shop.Domain.Model.Input;
using Shop.Domain.Model.Output;
using Shop.Domain.Model.Request;
using Shop.Domain.Model.Response;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Application.Services.Base
{
    public abstract class ReadService<TEntity, TEntityDTO> : IReadService<TEntityDTO>
        where TEntity : class
        where TEntityDTO : class
    {
        protected IReadRepository<TEntity> _readRepository;
        protected readonly IMapper _mapper;
        public ReadService(IReadRepository<TEntity> readRepository, IMapper mapper)
        {
            _readRepository = readRepository;
            _mapper = mapper;
        }

        public async Task<PageResponse<TEntityDTO>> FillterPagingAsync(int page, int size, string? search)
        {
            var filterPagingEntity = await _readRepository.FillterPagingAsync(page, size, search);

            var listEntityDTOFilter = MapListEntityToListEntityDTO(filterPagingEntity.Items);

            var filterPagingEntityDTO = new FilterPaging<TEntityDTO>()
            {
                TotalPage = filterPagingEntity.TotalPage,
                TotalRecord = filterPagingEntity.TotalRecord,
                Page = filterPagingEntity.Page,
                Size = filterPagingEntity.Size,
                Items = listEntityDTOFilter
            };

            return new PageResponse<TEntityDTO>()
            {
                Message = "Success",
                TraceId = "",
                Data = filterPagingEntityDTO
            };
        }
        public async Task<IEnumerable<TEntityDTO>> GetAllAsync()
        {
            var entities = await _readRepository.GetAllAsync();

            var entitieDTOs = MapListEntityToListEntityDTO(entities.ToList());
            return entitieDTOs;
        }

        public async Task<TEntityDTO> GetByCodeAsync(string code, DbTransaction? dbTransaction = null)
        {
            var entity = await _readRepository.GetByCodeAsync(code, dbTransaction);
            var entityDTO = MapEntityToEntiyDTO(entity);
            return entityDTO;
        }

        public async Task<TEntityDTO> GetByIdAsync(Guid id, DbTransaction? dbTransaction = null)
        {
            var entity = await _readRepository.GetByIdAsync(id, dbTransaction);
            var entityDTO = MapEntityToEntiyDTO(entity);
            return entityDTO;
        }

        public async Task<IEnumerable<TEntityDTO>> GetByIdsAsync(List<Guid> ids, DbTransaction? dbTransaction = null)
        {
            var entities = await _readRepository.GetByIdsAsync(ids, dbTransaction);
            var entityDTOs = MapListEntityToListEntityDTO(entities.ToList());
            return entityDTOs;
        }

        public TEntityDTO MapEntityToEntiyDTO(TEntity entity)
        {
            var entityDTO = _mapper.Map<TEntity, TEntityDTO>(entity);
            return entityDTO;
        }

        public List<TEntityDTO> MapListEntityToListEntityDTO(List<TEntity> entities)
        {
            var entityDTOs = _mapper.Map<List<TEntity>, List<TEntityDTO>>(entities);
            return entityDTOs;
        }
    }
}
