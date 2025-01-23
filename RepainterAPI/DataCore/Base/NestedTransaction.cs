using Microsoft.EntityFrameworkCore.Storage;

namespace Shared.Contexts.Base
{
    internal class NestedTransaction : IDbContextTransaction
    {
        public Guid TransactionId => Guid.Empty;

        public void Commit()
        {
        }

        public Task CommitAsync(CancellationToken cancellationToken = default)
        {
            return Task.CompletedTask;
        }

        public void Dispose()
        {
        }

        public ValueTask DisposeAsync()
        {
            return ValueTask.CompletedTask;
        }

        public void Rollback()
        {
        }

        public Task RollbackAsync(CancellationToken cancellationToken = default)
        {
            return Task.CompletedTask;
        }
    }
}
