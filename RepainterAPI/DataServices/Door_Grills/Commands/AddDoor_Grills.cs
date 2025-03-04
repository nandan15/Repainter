using DataModels.Door_Grills;
using DataServices.Authentication;
using MediatR;
using Shared.Contexts.Base;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DataServices.Door_Grills.Commands
{
    public class AddDoor_Grill : IRequest<Door_GrillModel>
    {
        public Door_GrillModel Door_GrillModel { get; set; }
    }

    public class AddDoor_GrillHandler : IRequestHandler<AddDoor_Grill, Door_GrillModel>
    {
        private readonly IUnitOfWork _context;
        private readonly ICurrentUser _currentUser;

        public AddDoor_GrillHandler(IUnitOfWork context, ICurrentUser currentUser)
        {
            _context = context;
            _currentUser = currentUser;
        }

        public async Task<Door_GrillModel> Handle(AddDoor_Grill request, CancellationToken cancellationToken)
        {
            try
            {
                var doorGrill = new DataEntities.Door_Grills.Door_Grills
                {
                    Door_GrillTabId = request.Door_GrillModel.Door_GrillTabId,
                    GeneratedId = request.Door_GrillModel.GeneratedId,
                    CustomerId = request.Door_GrillModel.CustomerId,
                    MainDoorLength = request.Door_GrillModel.MainDoorLength,
                    MainDoorHeight = request.Door_GrillModel.MainDoorHeight,
                    MainDoorNumber_of_Doors = request.Door_GrillModel.MainDoorNumber_of_Doors,
                    MainDoorSurface = request.Door_GrillModel.MainDoorSurface,
                    MainDoorPrice = request.Door_GrillModel.MainDoorPrice,
                    MainDoorRemarks = request.Door_GrillModel.MainDoorRemarks,
                    InternalDoorLength = request.Door_GrillModel.InternalDoorLength,
                    InternalDoorHeight = request.Door_GrillModel.InternalDoorHeight,
                    InternalDoorNumber_of_Doors = request.Door_GrillModel.InternalDoorNumber_of_Doors,
                    InternalDoorSurface = request.Door_GrillModel.InternalDoorSurface,
                    InternalDoorPrice = request.Door_GrillModel.InternalDoorPrice,
                    InternalDoorRemarks = request.Door_GrillModel.InternalDoorRemarks,
                    Window_GrillLength = request.Door_GrillModel.Window_GrillLength,
                    Window_GrillHeight = request.Door_GrillModel.Window_GrillHeight,
                    Window_GrillPrice = request.Door_GrillModel.Window_GrillPrice,
                    Window_GrillRemarks = request.Door_GrillModel.Window_GrillRemarks,
                    Balcony_GrillLength = request.Door_GrillModel.Balcony_GrillLength,
                    Balcony_GrillHeight = request.Door_GrillModel.Balcony_GrillHeight,
                    Balcony_GrillPrice = request.Door_GrillModel.Balcony_GrillPrice,
                    Balcony_GrillRemarks = request.Door_GrillModel.Balcony_GrillRemarks,
                    SectionTotal = request.Door_GrillModel.SectionTotal,
                    Deleted = request.Door_GrillModel.Deleted,
                    CreatedBy = request.Door_GrillModel.CreatedBy,
                    CreatedOn = request.Door_GrillModel.CreatedOn,
                    LastModifiedBy = request.Door_GrillModel.LastModifiedBy,
                    LastModifiedOn = request.Door_GrillModel.LastModifiedOn,
                };

                var addedDoorGrill = _context.Repository<DataEntities.Door_Grills.Door_Grills>().Add(doorGrill);
                if (addedDoorGrill is DataEntities.Door_Grills.Door_Grills doorGrillEntity)
                {
                    await _context.SaveAsync();
                    request.Door_GrillModel.Door_GrillId = doorGrillEntity.Door_GrillId;
                    return request.Door_GrillModel;
                }
                else
                {
                    throw new InvalidOperationException("Unable to cast addedDoorGrill to Door_Grill entity.");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
