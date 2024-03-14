using Microsoft.EntityFrameworkCore.Storage;
using Shop.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Domain.Interface.Repository
{
    public interface IBrandRepository : IWriteRepository<Brand>
    {
        public Brand TestCreateBrand(DbTransaction dbContextTransaction);
    }
}
