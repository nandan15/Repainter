using DataModels.Door_Grills;
using MediatR;
using Shared.Contexts.Base;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace DataServices.Door_Grills.Commands
{
    public class UpdateDoor_Grill : IRequest<Door_GrillModel>
    {
        public Door_GrillModel DoorGrillModel { get; set; }
    }

    public class UpdateDoor_GrillHandler : IRequestHandler<UpdateDoor_Grill, Door_GrillModel>
    {
        private readonly IUnitOfWork _context;

        public UpdateDoor_GrillHandler(IUnitOfWork context)
        {
            _context = context;
        }

        public async Task<Door_GrillModel> Handle(UpdateDoor_Grill request, CancellationToken cancellationToken)
        {
            try
            {
                var existingDoorGrill = _context.Repository<DataEntities.Door_Grills.Door_Grills>().Get()
                    .FirstOrDefault(x => x.Door_GrillId == request.DoorGrillModel.Door_GrillId);

                if (existingDoorGrill != null)
                {
                    existingDoorGrill.Door_GrillTabId = request.DoorGrillModel.Door_GrillTabId;
                    existingDoorGrill.GeneratedId = request.DoorGrillModel.GeneratedId;
                    existingDoorGrill.CustomerId = request.DoorGrillModel.CustomerId;
                    existingDoorGrill.MainDoorLength = request.DoorGrillModel.MainDoorLength;
                    existingDoorGrill.MainDoorHeight = request.DoorGrillModel.MainDoorHeight;
                    existingDoorGrill.MainDoorNumber_of_Doors = request.DoorGrillModel.MainDoorNumber_of_Doors;
                    existingDoorGrill.MainDoorSurface = request.DoorGrillModel.MainDoorSurface;
                    existingDoorGrill.MainDoorPrice = request.DoorGrillModel.MainDoorPrice;
                    existingDoorGrill.MainDoorRemarks = request.DoorGrillModel.MainDoorRemarks;
                    existingDoorGrill.InternalDoorLength = request.DoorGrillModel.InternalDoorLength;
                    existingDoorGrill.InternalDoorHeight = request.DoorGrillModel.InternalDoorHeight;
                    existingDoorGrill.InternalDoorNumber_of_Doors = request.DoorGrillModel.InternalDoorNumber_of_Doors;
                    existingDoorGrill.InternalDoorSurface = request.DoorGrillModel.InternalDoorSurface;
                    existingDoorGrill.InternalDoorPrice = request.DoorGrillModel.InternalDoorPrice;
                    existingDoorGrill.InternalDoorRemarks = request.DoorGrillModel.InternalDoorRemarks;
                    existingDoorGrill.Window_GrillLength = request.DoorGrillModel.Window_GrillLength;
                    existingDoorGrill.Window_GrillHeight = request.DoorGrillModel.Window_GrillHeight;
                    existingDoorGrill.Window_GrillPrice = request.DoorGrillModel.Window_GrillPrice;
                    existingDoorGrill.Window_GrillRemarks = request.DoorGrillModel.Window_GrillRemarks;
                    existingDoorGrill.Balcony_GrillLength = request.DoorGrillModel.Balcony_GrillLength;
                    existingDoorGrill.Balcony_GrillHeight = request.DoorGrillModel.Balcony_GrillHeight;
                    existingDoorGrill.Balcony_GrillPrice = request.DoorGrillModel.Balcony_GrillPrice;
                    existingDoorGrill.Balcony_GrillRemarks = request.DoorGrillModel.Balcony_GrillRemarks;
                    existingDoorGrill.SectionTotal = request.DoorGrillModel.SectionTotal;
                    existingDoorGrill.Deleted = request.DoorGrillModel.Deleted;
                    existingDoorGrill.LastModifiedBy = request.DoorGrillModel.LastModifiedBy;
                    existingDoorGrill.LastModifiedOn = DateTime.UtcNow;
                }

                await _context.SaveAsync();
                return request.DoorGrillModel;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}