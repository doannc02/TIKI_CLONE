using Microsoft.AspNetCore.Mvc;
using Shop.Application;
using Shop.Application.Interface;

namespace Shop.Controllers
{
    [ApiController]
    public class WriteController<TEntityDTO, TEntityCreateDTO, TEntityUpdateDTO> : ReadController<TEntityDTO>
        where TEntityDTO : class
        where TEntityCreateDTO : class
        where TEntityUpdateDTO : class
    {
        protected readonly IWriteService<TEntityDTO, TEntityCreateDTO, TEntityUpdateDTO> _writeService;
        public WriteController(IWriteService<TEntityDTO, TEntityCreateDTO, TEntityUpdateDTO> writeService) : base(writeService)
        {
            _writeService = writeService;
        }

        /// <summary>
        /// Thêm mới 1 bản ghi
        /// </summary>
        /// <param name="entityCreateDTO"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<TEntityDTO> CreateAsync([FromBody] TEntityCreateDTO entityCreateDTO)
        {
            var result = await _writeService.CreateAsync(entityCreateDTO);
            return result;
        }


        /// <summary>
        /// Xóa 1 bản ghi
        /// </summary>
        /// <param name="entityDTO"></param>
        /// <returns></returns>
        [HttpDelete]
        public async Task<TEntityDTO?> DeleteAsync(Guid id)
        {
            var result =  await _writeService.DeleteAsync(id);
            return result;
        }
    }
}
