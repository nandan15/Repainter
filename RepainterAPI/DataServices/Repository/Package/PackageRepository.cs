using DataCore;
using DataModels.Furniture;
using DataModels.Package;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.Repository.Package
{
    public class PackageRepository : IPackageRepository
    {
        private readonly RepainterContext _context;

        public PackageRepository(RepainterContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<PackageModel>> GetByCustomerIdAsync(int customerId)
        {
            return await Task.Run(() => _context.Package.Where(f => f.CustomerId == customerId && !f.Deleted)
                .Select(f => new PackageModel
                {
                    PackageId = f.PackageId,
                    PackageTabId = f.PackageTabId,
                    GeneratedId = f.GeneratedId,
                    CustomerId = f.CustomerId,
                    PackageType = f.PackageType,
                    ProductCode = f.ProductCode,
                    Type = f.PackageType,
                    Amount = f.Amount,
                    Specification = f.Specification,
                    Condition = f.Condition,
                    SectionTotalPreTax = f.SectionTotalPreTax,
                    SectionTotalPostTax = f.SectionTotalPostTax,
                    Deleted = f.Deleted,
                    CreatedBy = f.CreatedBy,
                    LastModifiedOn = f.LastModifiedOn,
                    LastModifiedBy = f.LastModifiedBy,
                    CreatedOn = f.CreatedOn
                })
                .ToList());
        }
    }

}
