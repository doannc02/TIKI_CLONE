using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;

namespace Shop.Application.Mapper
{
    public abstract class BaseMapper<Entity, EntityDTO, EntityCreateDTO, EntityUpdateDTO> : Profile
    {
        public BaseMapper()
        {
            CreateMap<Entity, EntityDTO>().ReverseMap();
            CreateMap<EntityCreateDTO, Entity>().ReverseMap();
            CreateMap<EntityUpdateDTO, Entity>().ReverseMap();

        }
    }
}
