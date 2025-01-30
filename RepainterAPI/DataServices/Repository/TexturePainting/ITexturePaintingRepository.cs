using DataModels.InternalPainting;
using DataModels.TexturePainting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.Repository.TexturePainting
{
    public interface ITexturePaintingRepository
    {
        Task<IEnumerable<TexturePaintingModel>> GetByCustomerIdAsync(int customerId);
    }
}
