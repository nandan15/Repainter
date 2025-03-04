using DataModels.Furniture;
using DataModels.Package;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.Repository.Package
{
    public interface IPackageRepository
    {
        Task<IEnumerable<PackageModel>> GetByCustomerIdAsync(int customerId);
    }
}
