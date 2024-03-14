using Shop.Domain.Model.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shop.Domain.Entity;

namespace Shop.Application.Mapper
{
    public class ProductMapper : BaseMapper<Product, ProductDTO, ProductCreateDTO, ProductUpdateDTO>
    {
    }
}
