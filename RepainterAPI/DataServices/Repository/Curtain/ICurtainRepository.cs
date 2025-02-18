using DataCore;
using DataModels.Curtain;
using Shared.Contexts.Base; 
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataServices.Repository.Curtain
{
    public interface ICurtainRepository
    {
        Task<IEnumerable<CurtainModel>> GetByCustomerIdAsync(int customerId);
    }
}
