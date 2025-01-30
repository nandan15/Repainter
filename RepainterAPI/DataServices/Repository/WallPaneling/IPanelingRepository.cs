using DataModels.WallPaneling;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.Repository
{
    public interface IPanelingRepository
    {
        Task<IEnumerable<PanelingModel>> GetByCustomerIdAsync(int customerId);
    }
}