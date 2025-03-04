using DataModels.Curtain;
using DataModels.Door_Grills;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.Repository.Door_Grills
{
    public interface IDoor_GrillRepository
    {
        Task<IEnumerable<Door_GrillModel>> GetByCustomerIdAsync(int customerId);
    }
}
