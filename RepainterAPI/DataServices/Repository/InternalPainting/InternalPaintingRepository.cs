using DataCore;
using DataModels.InternalPainting;
using Shared.Contexts.Base; // Replace with the correct namespace for your ApplicationDbContext
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataServices.Repository.InternalPainting
{
    public class InternalPaintingRepository : IInternalPaintingRepository
    {
        private readonly RepainterContext _context;

        public InternalPaintingRepository(RepainterContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<InternalPaintingModel>> GetByCustomerIdAsync(int customerId)
        {
            return await Task.Run(() =>
                _context.InternalPainting 
                .Where(ip => ip.CustomerId == customerId && !ip.Deleted)
                .Select(ip => new InternalPaintingModel
                {
                    IntenalPaintingId = ip.IntenalPaintingId,
                    CustomerId = ip.CustomerId,
                    CarpetArea = ip.CarpetArea,
                    ProductCode=ip.ProductCode,
                    Color=ip.Color,
                    CeilingType = ip.CeilingType,
                    CeilingPrice = ip.CeilingPrice,
                    CeilingRemarsk = ip.CeilingRemarks,
                    WallType = ip.WallType,
                    WallPrice = ip.WallPrice,
                    WallRemarks = ip.WallRemarks,
                    NoofWall = ip.NoofWall,
                    DarkPrice = ip.DarkPrice,
                    DarkRemarks = ip.DarkRemarks,
                    SectionTotalPre_tax = ip.SectionTotalPre_tax,
                    SectionTotalPost_tax = ip.SectionTotalPost_tax,
                    TotalRemarks = ip.TotalRemarks,
                    Deleted = ip.Deleted,
                    CreatedBy = ip.CreatedBy,
                    LastModifiedDate = ip.LastModifiedDate,
                    LastModifiedBy = ip.LastModifiedBy,
                    CreatedOn = ip.CreatedOn
                })
                .ToList()
            );
        }
    }
}
