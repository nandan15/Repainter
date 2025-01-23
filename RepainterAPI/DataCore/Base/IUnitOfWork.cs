using Microsoft.EntityFrameworkCore.Storage;

namespace Shared.Contexts.Base
{
    public interface IUnitOfWork : IDisposable
    {
        object Enquiry { get; }
        object QuotationBuilder { get; }

        IRepositoryCore<TEntity> Repository<TEntity>()
            where TEntity : class;

        Task<IDbContextTransaction> BeginTransactionAsync();

        Task CommitTransactionAsync(CancellationToken cancellationToken = default);

        Task RollbackTransactionAsync(CancellationToken cancellationToken = default);

        Task SaveAsync(CancellationToken cancellationToken = default);

        void Save();

        int ExecuteQuery(string query, params object[] parameters);

        Task<int> ExecuteQueryAsync(string query, params object[] parameters);

        Task BulkInsertAsync<TEntity>(IEnumerable<TEntity> entities)
            where TEntity : class;

        string GetTableNameWithSchema<T>();

        void Detach<T>(T entity);

        void Attach<T>(T entity);
        Task SaveChangesAsync(CancellationToken cancellationToken);
    }
}
