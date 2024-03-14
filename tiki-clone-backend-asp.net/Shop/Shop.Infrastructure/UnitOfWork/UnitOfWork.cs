using Shop.Application;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MySqlConnector;
using System.Data;
using System.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Shop.Application.UnitOfWork;

namespace Shop.Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DbContext _dbContext;
        private DbConnection? _connection;
        private DbTransaction? _transaction = null;
        public UnitOfWork(DbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public DbConnection Connection => _connection ??= _dbContext.Database.GetDbConnection();
        public DbTransaction? Transaction => _transaction;
        public DbContext DbContext => _dbContext;
        public DbTransaction BeginTransaction()
        {
            _connection ??= _dbContext.Database.GetDbConnection();
            if (_connection.State == ConnectionState.Open)
            {
                _transaction = _connection.BeginTransaction();
            }
            else
            {
                _connection.Open();
                _transaction = _connection.BeginTransaction();
            }
            return _transaction;
        }
        public void SaveChanges()
        {
            _dbContext.SaveChanges();
        }
        public async Task<DbTransaction> BeginTransactionAsync()
        {
            _connection ??= _dbContext.Database.GetDbConnection(); ;
            if (_connection.State == ConnectionState.Open)
            {
                _transaction = await _connection.BeginTransactionAsync();
            }
            else
            {
                await _connection.OpenAsync();
                _transaction = await _connection.BeginTransactionAsync(); ;
            }
            return _transaction;
        }

        public void Commit()
        {
            _transaction?.Commit();
            Dispose();
        }

        public async Task CommitAsync()
        {
            if (_transaction != null)
            {
                await _transaction.CommitAsync();
            }
            await DisposeAsync();
        }

        public void Dispose()
        {
            _transaction?.Dispose();
            _connection?.Dispose();
        }

        public async ValueTask DisposeAsync()
        {
            if (_transaction != null)
            {
                await _transaction.DisposeAsync();
            }
            if (_connection != null)
            {
                await _connection.DisposeAsync();
            }
        }

        public void Rollback()
        {
            _transaction?.Rollback();
            Dispose();
        }

        public async Task RollbackAsync()
        {
            if (_transaction != null)
            {
                await _transaction.RollbackAsync();
            }
            await DisposeAsync();
        }



        public async Task SaveChangesAsync()
        {
            await _dbContext.SaveChangesAsync();
        }
    }
}
