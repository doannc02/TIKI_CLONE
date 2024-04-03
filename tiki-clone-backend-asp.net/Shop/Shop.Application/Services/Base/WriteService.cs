using AutoMapper;
using Shop.Application.Interface;
using Shop.Domain;
using Shop.Domain.Enum;
using Shop.Domain.Interface.Repository;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Application.Services.Base
{
    public abstract class WriteService<TEntity, TEntityDTO, TEntityCreateDTO, TEntityUpdateDTO> : 
        ReadService<TEntity, TEntityDTO>,
        IWriteService<TEntityDTO, TEntityCreateDTO, TEntityUpdateDTO>
        where TEntity : class
        where TEntityDTO : class
        where TEntityCreateDTO : class
        where TEntityUpdateDTO : class
    {
        protected readonly IWriteRepository<TEntity> _writeRepository;

        public WriteService(IWriteRepository<TEntity> writeRepository, IMapper mapper) : base(writeRepository,mapper)
        {
            _writeRepository = writeRepository;
        }

        /// <summary>
        /// chỉnh sửa dữ liệu trước khi thêm
        /// </summary>
        /// <param name="entityCreateDTO"></param>
        protected abstract Task EditData(TEntity entity);

        /// <summary>
        /// kiểm tra logic nghiệp vụ
        /// </summary>
        /// <param name="entityCreateDTO"></param>
        /// <returns></returns>
        protected abstract Task ValidateLogicBusiness(TEntity entity);

        public async Task<TEntityDTO> CreateAsync(TEntityCreateDTO entityCreateDTO, DbTransaction? dbContextTransaction = null)
        {
            // map qua entity
            var entity = MapTEntityCreateDtoToTEntity(entityCreateDTO);

            // kiểm tra logic nghiệp vụ;
            await ValidateLogicBusiness(entity);

            // chỉnh sửa dữ liệu trước khi thêm
            await EditData(entity);

            // add vào DB
            var entityCreated = await _writeRepository.CreateAsync(entity, dbContextTransaction);
            
            // map qua entityDTO
            var entityDTO = MapEntityToEntiyDTO(entityCreated);

            return entityDTO;
        }

        public async Task<List<TEntityDTO>> CreateManyAsync(List<TEntityCreateDTO> entities, DbTransaction? dbContextTransaction = null)
        {
            // thiếu validate
            var entityList = MapListTEntityCreateDtoToListTEntity(entities);
            var entityCreatedList = await _writeRepository.CreateManyAsync(entityList, dbContextTransaction);
            var result = MapListEntityToListEntityDTO(entityCreatedList);
            return result;
        }

        public async Task<TEntityDTO?> DeleteAsync(Guid id)
        {
            var entityDTO = await GetByIdAsync(id);
            if(entityDTO == null)
            {
                return default;
            }
            // map entityDTO sang entity
            var entity = MapTEntityDtoToTEntity(entityDTO);
            // xóa khỏi DB
            var entityDeleted = await _writeRepository.Delete(entity);
            // map entity sang entityDTO
            var entityDTODeleted = MapEntityToEntiyDTO(entityDeleted);

            return entityDTODeleted;
        }

        public int DeleteMany(List<TEntityDTO> entityDTOs)
        {
            // map entityDTO sang entity
            var entities = MapListTEntityDtoToListTEntity(entityDTOs);
            // xóa khỏi DB
            var countEntitiesDeleted = _writeRepository.UpdateMany(entities);

            return countEntitiesDeleted;
        }

        public TEntityDTO Update(TEntityUpdateDTO entityUpdatedDTO)
        {
            throw new NotImplementedException();
        }

        public int UpdateMany(List<TEntityUpdateDTO> entities)
        {
            throw new NotImplementedException();
        }

        public TEntity MapTEntityCreateDtoToTEntity (TEntityCreateDTO entityCreateDTO)
        {
            var entity = _mapper.Map<TEntity>(entityCreateDTO);
            return entity;
        }

        public TEntity MapTEntityUpdateDtoToTEntity(TEntityUpdateDTO entityUpdateDTO)
        {
            var entity = _mapper.Map<TEntity>(entityUpdateDTO);
            return entity;
        }

        public TEntity MapTEntityDtoToTEntity(TEntityDTO entityDTO)
        {
            var entity = _mapper.Map<TEntity>(entityDTO);
            return entity;
        }
        public List<TEntity> MapListTEntityDtoToListTEntity(List<TEntityDTO> entityDTOs)
        {
            var entities = _mapper.Map<List<TEntity>>(entityDTOs);
            return entities;
        }
        public List<TEntity> MapListTEntityCreateDtoToListTEntity(List<TEntityCreateDTO> entityCreateDTOs)
        {
            var result = _mapper.Map<List<TEntity>>(entityCreateDTOs);
            return result;
        }
    }
}
