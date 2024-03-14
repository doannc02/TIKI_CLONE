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
    public class SupplierRepository : WriteRepository<Supplier>, ISupplierRepository
    {
        public SupplierRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
        }
    }
}
