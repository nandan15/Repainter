using Microsoft.EntityFrameworkCore;
using LinqKit.Core;
using System.Linq.Expressions;


namespace Shared.Contexts.Base
{
    internal class Repository<TEntity> : IRepositoryCore<TEntity>
        where TEntity : class
    {
        private readonly DbSet<TEntity> _dbSet;

        public Repository(DbContext context)
        {
            _dbSet = context.Set<TEntity>();
        }

        public IQueryable<TEntity> Get()
        {
            return _dbSet;
        }

        public async Task<IQueryable<TEntity>> GetAsync()
        {
            return await Task.FromResult(_dbSet);
        }

        public IQueryable<TEntity> GetExpandable()
        {
            return _dbSet.AsExpandable();
        }

        public IQueryable<TEntity> Read()
        {
            return _dbSet.AsNoTracking();
        }

        public IQueryable<TEntity> RunQuery(string query, params object[] parameters)
        {
            if (parameters == null)
            {
                return _dbSet.FromSqlRaw<TEntity>(query);
            }
            return _dbSet.FromSqlRaw<TEntity>(query, parameters);
        }

        public IQueryable<TEntity> RunQuery(string query)
        {
            return _dbSet.FromSqlRaw<TEntity>(query);
        }

        public TEntity Add(TEntity entity)
        {
            _dbSet.Add(entity);
            return entity;
        }

        public async Task<TEntity> AddAsync(TEntity entity)
        {
            await _dbSet.AddAsync(entity);
            return entity;
        }

        public IEnumerable<TEntity> Add(IEnumerable<TEntity> entities)
        {
            _dbSet.AddRange(entities);
            return entities;
        }
        public async Task<List<TEntity>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public IQueryable<TEntity> Where(Expression<Func<TEntity, bool>> predicate)
        {
            return _dbSet.Where(predicate);
        }
        public async Task<IEnumerable<TEntity>> AddAsync(IEnumerable<TEntity> entities)
        {
            await _dbSet.AddRangeAsync(entities);
            return entities;
        }

        public TEntity Update(TEntity entity)
        {
            _dbSet.Attach(entity);
            return entity;
        }

        public async Task<TEntity> UpdateAsync(TEntity entity)
        {
            _dbSet.Attach(entity);
            return entity;
        }
        public async Task<TEntity> GetByIdAsync(int id)
        {
            // Find method is optimized for looking up entities by primary key
            return await _dbSet.FindAsync(id);
        }
        public void Delete(TEntity entity)
        {
            _dbSet.Remove(entity);
        }

        public void Delete(IEnumerable<TEntity> entities)
        {
            _dbSet.RemoveRange(entities);
        }

        public async Task DeleteAsync(TEntity entity)
        {
            await Task.FromResult(_dbSet.Remove(entity));
        }


        public object Include(Func<object, object> value)
        {
            throw new NotImplementedException();
        }

        public Task ToListAsync()
        {
            throw new NotImplementedException();
        }
    }
}