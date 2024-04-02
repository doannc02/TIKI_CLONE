using Shop.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Interface.Repository.OrdersRepository
{
    public interface IOrderRepository : IWriteRepository<Order>
    {
    }
}
