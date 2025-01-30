using DataCore;
using DataModels.WallPaneling;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.Repository.WallPaneling
{
    public class WallPanelingRepository : IPanelingRepository
    {
        private readonly RepainterContext _context;

        public WallPanelingRepository(RepainterContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<PanelingModel>> GetByCustomerIdAsync(int customerId)
        {
            return await Task.Run(() =>
                _context.Panelings.Where(wp => wp.CustomerId == customerId && !wp.Deleted).Select(wp => new PanelingModel
                {
                    PanelingId = wp.PanelingId,
                    PanelingTabId = wp.PanelingTabId,
                    GeneratedId = wp.GeneratedId,
                    CustomerId = wp.CustomerId,
                    ProductCode = wp.ProductCode,
                    Type = wp.Type,
                    Price = wp.Price,
                    Remarks = wp.Remarks,
                    Description = wp.Description,
                    SectionTotal = wp.SectionTotal,
                    Deleted = wp.Deleted,
                    CreatedBy = wp.CreatedBy,
                    CreatedOn = wp.CreatedOn,
                    LastModifiedBy = wp.LastModifiedBy,
                    LastModifiedOn = wp.LastModifiedOn,
                }).ToList());
        }
    }
}