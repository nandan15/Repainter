using DataModels.Door_Grills;
using MediatR;
using Shared.Contexts.Base;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace DataServices.Door_Grills.Queries
{
    public class GetDoor_GrillsById : IRequest<Door_GrillModel>
    {
        public int Id { get; set; }
    }

    public class GetDoor_GrillsByIdHandler : IRequestHandler<GetDoor_GrillsById, Door_GrillModel>
    {
        private readonly IUnitOfWork _context;

        public GetDoor_GrillsByIdHandler(IUnitOfWork context)
        {
            _context = context;
        }

        public async Task<Door_GrillModel> Handle(GetDoor_GrillsById request, CancellationToken cancellationToken)
        {
            try
            {
                var doorGrill = _context.Repository<DataEntities.Door_Grills.Door_Grills>().Get()
                    .FirstOrDefault(d => d.Door_GrillId == request.Id);

                if (doorGrill == null)
                {
                    return null;
                }

                return new Door_GrillModel
                {
                    Door_GrillId = doorGrill.Door_GrillId,
                    Door_GrillTabId = doorGrill.Door_GrillTabId,
                    GeneratedId = doorGrill.GeneratedId,
                    CustomerId = doorGrill.CustomerId,
                    MainDoorLength = doorGrill.MainDoorLength,
                    MainDoorHeight = doorGrill.MainDoorHeight,
                    MainDoorNumber_of_Doors = doorGrill.MainDoorNumber_of_Doors,
                    MainDoorSurface = doorGrill.MainDoorSurface,
                    MainDoorPrice = doorGrill.MainDoorPrice,
                    MainDoorRemarks = doorGrill.MainDoorRemarks,
                    InternalDoorLength = doorGrill.InternalDoorLength,
                    InternalDoorHeight = doorGrill.InternalDoorHeight,
                    InternalDoorNumber_of_Doors = doorGrill.InternalDoorNumber_of_Doors,
                    InternalDoorSurface = doorGrill.InternalDoorSurface,
                    InternalDoorPrice = doorGrill.InternalDoorPrice,
                    InternalDoorRemarks = doorGrill.InternalDoorRemarks,
                    Window_GrillLength = doorGrill.Window_GrillLength,
                    Window_GrillHeight = doorGrill.Window_GrillHeight,
                    Window_GrillPrice = doorGrill.Window_GrillPrice,
                    Window_GrillRemarks = doorGrill.Window_GrillRemarks,
                    Balcony_GrillLength = doorGrill.Balcony_GrillLength,
                    Balcony_GrillHeight = doorGrill.Balcony_GrillHeight,
                    Balcony_GrillPrice = doorGrill.Balcony_GrillPrice,
                    Balcony_GrillRemarks = doorGrill.Balcony_GrillRemarks,
                    SectionTotal = doorGrill.SectionTotal,
                    Deleted = doorGrill.Deleted,
                    CreatedBy = doorGrill.CreatedBy,
                    CreatedOn = doorGrill.CreatedOn,
                    LastModifiedBy = doorGrill.LastModifiedBy,
                    LastModifiedOn = doorGrill.LastModifiedOn,
                };
            }
            catch (Exception ex)
            {
                throw new Exception($"Error Fetching door grill: {ex.Message}", ex);
            }
        }
    }
}