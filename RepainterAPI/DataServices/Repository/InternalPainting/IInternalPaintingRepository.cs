using DataModels.InternalPainting;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DataServices.Repository.InternalPainting
{
    public interface IInternalPaintingRepository
    {
        Task<IEnumerable<InternalPaintingModel>> GetByCustomerIdAsync(int customerId);
    }

}
