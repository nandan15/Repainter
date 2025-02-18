using DataModels.Furniture;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.Repository.Furniture
{
    public interface IFurnitureRepository
    {
        Task<IEnumerable<FurnitureModel>> GetByCustomerIdAsync(int customerId);
    }
}
