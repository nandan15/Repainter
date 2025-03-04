using DataCore;
using DataModels.Furniture;
using Shared.Contexts.Base;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataServices.Repository.Furniture
{
    public class FurnitureRepository : IFurnitureRepository
    {
        private readonly RepainterContext _context;

        public FurnitureRepository(RepainterContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<FurnitureModel>> GetByCustomerIdAsync(int customerId)
        {
            return await Task.Run(() => _context.Furniture.Where(f => f.CustomerId == customerId && !f.Deleted).Select(f => new FurnitureModel
            {
                FurnitureId = f.FurnitureId,
                CustomerId = f.CustomerId,
                GeneratedId=f.GeneratedId,
                FurnitureTabId=f.FurnitureTabId,
                ProductCode = f.ProductCode,
                Price = f.Price,
                Name=f.Name,
                Description = f.Description,
                Remarks = f.Remarks,
                SectionTotal = f.SectionTotal,
                Deleted = f.Deleted,
                CreatedBy = f.CreatedBy,
                LastModifiedOn = f.LastModifiedOn,
                LastModifiedBy = f.LastModifiedBy,
                CreatedOn = f.CreatedOn
            })
                .ToList()
            );
        }
    }
}
