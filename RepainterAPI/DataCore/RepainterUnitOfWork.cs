using EFCore.BulkExtensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Shared.Contexts.Base;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;

namespace DataCore
{
    public class RepainterUnitOfWork : IUnitOfWork
    {
        private static readonly object _createRepositoryLock = new();
        private readonly Dictionary<Type, object> _repositories = new();
        private bool _disposed;
        public DbContext dfContext { get; }

        public object Enquiry => throw new NotImplementedException();
        public object QuotationBuilder => throw new NotImplementedException();

        public RepainterUnitOfWork(RepainterContext context)
        {
            dfContext = context;
        }

        public IDbConnection CreateConnection()
        {
            var connection = dfContext.Database.GetDbConnection();
            if (connection.State == ConnectionState.Closed)
            {
                connection.Open();
            }
            return connection;
        }

        public void Dispose()
        {
            if (!_disposed)
            {
                Dispose(true);
            }
            GC.SuppressFinalize(this);
        }

        public IRepositoryCore<TEntity> Repository<TEntity>()
            where TEntity : class
        {
            if (!_repositories.ContainsKey(typeof(TEntity)))
            {
                lock (_createRepositoryLock)
                {
                    if (!_repositories.ContainsKey(typeof(TEntity)))
                    {
                        CreateRepository<TEntity>();
                    }
                }
            }
            return _repositories[typeof(TEntity)] as IRepositoryCore<TEntity>;
        }

        public async Task<IDbContextTransaction> BeginTransactionAsync()
        {
            return dfContext.Database.CurrentTransaction == null
                ? await dfContext.Database.BeginTransactionAsync()
                : new NestedTransaction();
        }

        public async Task CommitTransactionAsync(CancellationToken cancellationToken = default)
        {
            if (dfContext.Database.CurrentTransaction != null)
            {
                await dfContext.Database.CommitTransactionAsync(cancellationToken);
            }
        }

        public async Task RollbackTransactionAsync(CancellationToken cancellationToken = default)
        {
            if (dfContext.Database.CurrentTransaction != null)
            {
                await dfContext.Database.RollbackTransactionAsync(cancellationToken);
            }
        }

        public async Task SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            await dfContext.SaveChangesAsync(cancellationToken);
        }

        public void Save()
        {
            dfContext.SaveChanges();
        }

        public int ExecuteQuery(string query, params object[] parameters)
        {
            return dfContext.Database.ExecuteSqlRaw(query, parameters);
        }

        public async Task<int> ExecuteQueryAsync(string query, params object[] parameters)
        {
            return await dfContext.Database.ExecuteSqlRawAsync(query, parameters);
        }

        public string GetTableNameWithSchema<T>()
        {
            var entityType = dfContext.Model.FindEntityType(typeof(T));
            return $"{entityType.GetSchema()}.{entityType.GetTableName()}";
        }

        public void Detach<T>(T entity)
        {
            dfContext.Entry(entity).State = EntityState.Detached;
        }

        public void Attach<T>(T entity)
        {
            dfContext.Entry(entity).State = EntityState.Modified;
        }

        public async Task BulkInsertAsync<TEntity>(IEnumerable<TEntity> entities)
            where TEntity : class
        {
            Action<BulkConfig> action = c => c.SetOutputIdentity = true;
            await dfContext.BulkInsertAsync(entities.ToList(), action);
        }

        private void CreateRepository<TEntity>()
            where TEntity : class
        {
            _repositories.Add(typeof(TEntity), new Repository<TEntity>(dfContext));
        }

        private void Dispose(bool disposing)
        {
            if (disposing)
            {
                dfContext?.Dispose();
                _disposed = true;
            }
        }

        public async Task SaveAsync(CancellationToken cancellationToken = default)
        {
            await dfContext.SaveChangesAsync(cancellationToken);
        }
    }

    // Helper class for nested transactions
    public class NestedTransaction : IDbContextTransaction
    {
        public Guid TransactionId => Guid.Empty;

        public void Commit() { }

        public void Dispose() { }

        public void Rollback() { }

        public Task CommitAsync(CancellationToken cancellationToken = default) => Task.CompletedTask;

        public Task RollbackAsync(CancellationToken cancellationToken = default) => Task.CompletedTask;

        public ValueTask DisposeAsync() => ValueTask.CompletedTask;
    }
}