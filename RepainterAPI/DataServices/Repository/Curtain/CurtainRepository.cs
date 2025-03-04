using DataCore;
using DataModels.Curtain;
using Shared.Contexts.Base; // Replace with the correct namespace for your ApplicationDbContext
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataServices.Repository.Curtain
{
    public class CurtainRepository : ICurtainRepository
    {
        private readonly RepainterContext _context;

        public CurtainRepository(RepainterContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<CurtainModel>> GetByCustomerIdAsync(int customerId)
        {
            return await Task.Run(() =>_context.Curtains.Where(c => c.CustomerId == customerId && !c.Deleted).Select(c => new CurtainModel
                {
                    CurtainId = c.CurtainId,
                    CurtainTabId = c.CurtainTabId,
                    GeneratedId= c.GeneratedId,
                    CustomerId = c.CustomerId,
                    CurtainType = c.CurtainType,
                    FabricType = c.FabricType,
                    ProductCode = c.ProductCode,
                    Price = c.Price,
                    CurtainRemarks = c.CurtainRemarks,
                    RodType = c.RodType,
                    RodPrice = c.RodPrice,
                    RodProductCode = c.RodProductCode,
                    RodRemarks = c.RodRemarks,
                    FinialType = c.FinialType,
                    FinialProductCode   = c.FinialProductCode,
                    FinialPrice = c.FinialPrice,
                    FinialRemarks = c.FinialRemarks,
                    SectionTotalCurtain = c.SectionTotalCurtain,
                    WindowCurtainType = c.WindowCurtainType,
                    WindowCurtainPrice = c.WindowCurtainPrice,
                    WindowFabricType = c.WindowFabricType,
                    WindowCurtainProductCode = c.WindowCurtainProductCode,
                    WindowCurtainRemarks = c.WindowCurtainRemarks,  
                    WindowRodType = c.WindowRodType,
                    WindowRodPrice = c.WindowRodPrice,
                    WindowRodRemarks = c.WindowRodRemarks,
                    WindowFinialType = c.WindowFinialType,
                    WindowFinialPrice = c.WindowFinialPrice,
                    WindowFinialProductCode = c.WindowFinialProductCode,
                    WindowFinialRemarks = c.WindowFinialRemarks,
                    SectionTotalWindow=c.SectionTotalWindow,
                    SectionTotal=c.SectionTotal,
                    Deleted = c.Deleted,
                    CreatedBy = c.CreatedBy,
                    LastModifiedOn = c.LastModifiedOn,
                    LastModifiedBy = c.LastModifiedBy,
                    CreatedOn = c.CreatedOn
                })
                .ToList()
            );
        }
    }
}
