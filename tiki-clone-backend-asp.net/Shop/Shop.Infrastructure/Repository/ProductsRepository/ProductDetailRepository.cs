using Shop.Application.UnitOfWork;
using Shop.Domain.Entity;
using Shop.Domain.Interface.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Infrastructure.Repository
{
    public class ProductDetailRepository : WriteRepository<Productdetail>, IProductDetailRepository
    {
        public ProductDetailRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
        }
    }
}
