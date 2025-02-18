using DataCore;
using DataModels.Door_Grills;
using Shared.Contexts.Base; // Replace with the correct namespace for your ApplicationDbContext
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataServices.Repository.Door_Grills
{
    public class Door_GrillsRepository : IDoor_GrillRepository
    {
        private readonly RepainterContext _context;

        public Door_GrillsRepository(RepainterContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Door_GrillModel>> GetByCustomerIdAsync(int customerId)
        {
            return await Task.Run(() => _context.Door_Grills.Where(d => d.CustomerId == customerId && !d.Deleted).Select(d => new Door_GrillModel
            {
                Door_GrillId = d.Door_GrillId,
                Door_GrillTabId = d.Door_GrillTabId,
                GeneratedId = d.GeneratedId,
                CustomerId = d.CustomerId,
                MainDoorLength = d.MainDoorLength,
                MainDoorHeight = d.MainDoorHeight,
                MainDoorNumber_of_Doors = d.MainDoorNumber_of_Doors,
                MainDoorSurface = d.MainDoorSurface,
                MainDoorPrice = d.MainDoorPrice,
                MainDoorRemarks = d.MainDoorRemarks,
                InternalDoorLength = d.InternalDoorLength,
                InternalDoorHeight = d.InternalDoorHeight,
                InternalDoorNumber_of_Doors = d.InternalDoorNumber_of_Doors,
                InternalDoorSurface = d.InternalDoorSurface,
                InternalDoorPrice = d.InternalDoorPrice,
                InternalDoorRemarks = d.InternalDoorRemarks,
                Window_GrillLength = d.Window_GrillLength,
                Window_GrillHeight = d.Window_GrillHeight,
                Window_GrillPrice = d.Window_GrillPrice,
                Window_GrillRemarks = d.Window_GrillRemarks,
                Balcony_GrillLength = d.Balcony_GrillLength,
                Balcony_GrillHeight = d.Balcony_GrillHeight,
                Balcony_GrillPrice = d.Balcony_GrillPrice,
                Balcony_GrillRemarks = d.Balcony_GrillRemarks,
                SectionTotal = d.SectionTotal,
                Deleted = d.Deleted,
                CreatedBy = d.CreatedBy,
                LastModifiedOn = d.LastModifiedOn,
                LastModifiedBy = d.LastModifiedBy,
                CreatedOn = d.CreatedOn
            })
                .ToList()
            );
        }
    }
}