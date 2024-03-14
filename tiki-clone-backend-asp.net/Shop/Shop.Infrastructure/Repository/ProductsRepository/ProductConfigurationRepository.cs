using Shop.Application.UnitOfWork;
using Shop.Domain.Entity;
using Shop.Domain.Interface.Repository.ProductsRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Infrastructure.Repository.ProductsRepository
{
    public class ProductConfigurationRepository : WriteRepository<Productconfiguration>, IProductConfigurationRepository
    {
        public ProductConfigurationRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
        }
    }
}
