using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.Common;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Shop.Application.UnitOfWork
{
    public interface IUnitOfWork : IDisposable, IAsyncDisposable
    {
        DbContext DbContext { get; }
        DbConnection Connection { get; }
        DbTransaction? Transaction { get; }
        DbTransaction BeginTransaction();
        Task<DbTransaction> BeginTransactionAsync();
        void SaveChanges();
        Task SaveChangesAsync();
        void Commit();
        Task CommitAsync();
        void Rollback();
        Task RollbackAsync();
    }
}
