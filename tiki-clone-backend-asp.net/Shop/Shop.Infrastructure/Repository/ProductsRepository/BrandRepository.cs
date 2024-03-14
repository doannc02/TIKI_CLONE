using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Shop.Application.UnitOfWork;
using Shop.Domain.Entity;
using Shop.Domain.Interface.Repository;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Infrastructure.Repository
{
    public class BrandRepository : WriteRepository<Brand>, IBrandRepository
    {
        public BrandRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            
        }
        public Brand TestCreateBrand(DbTransaction dbContextTransaction)
        {
            var brand = new Brand()
            {
                Id = new Guid(),
                Code = "brandTest",
                Name = "Test",
                Country = "VN",
                Status = 0
            };

            _dbContext.Database.UseTransaction(dbContextTransaction);

            _dbSet.Add(brand);

            _dbContext.SaveChanges();

            return brand;
        }
    }
}
