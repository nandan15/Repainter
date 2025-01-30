using DataCore;
using DataModels.TexturePainting;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DataServices.Repository.TexturePainting
{
    public class TexturePaintingRepository : ITexturePaintingRepository
    {
        private readonly RepainterContext _context;

        public TexturePaintingRepository(RepainterContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TexturePaintingModel>> GetByCustomerIdAsync(int customerId)
        {
            return await Task.Run(() =>
                _context.ScTexturePainting
                .Where(tp => tp.CustomerId == customerId && !tp.Deleted)
                .Select(tp => new TexturePaintingModel
                {
                    TexturePaintingId = tp.TexturePaintingId,
                    TexturePaintingTabId = tp.TexturePaintingTabId,
                    GenerateId = tp.GenerateId,
                    CustomerId = tp.CustomerId,
                    Area = tp.Area,
                    Type = tp.Type,
                    ProductCode = tp.ProductCode,
                    Price = tp.Price,
                    Remarks = tp.Remarks,
                    SectionTotal = tp.SectionTotal,
                    Deleted = tp.Deleted,
                    CreatedBy = tp.CreatedBy,
                    LastModifiedOn = tp.LastModifiedOn,
                    LastModifiedBy = tp.LastModifiedBy,
                    CreatedOn = tp.CreatedOn
                })
                .ToList()
            );
        }
    }
}
