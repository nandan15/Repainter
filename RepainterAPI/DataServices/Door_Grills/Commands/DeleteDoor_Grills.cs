using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DataEntities.Door_Grills;
using DataModels.Door_Grills;
using MediatR;
using Shared.Contexts.Base;

namespace DataServices.Door_Grills.Commands
{
    public class DeleteDoor_Grills : IRequest<Door_GrillModel>
    {
        public Door_GrillModel Door_GrillModel { get; set; }
    }

    public class DeleteDoor_GrillsHandler : IRequestHandler<DeleteDoor_Grills, Door_GrillModel>
    {
        private readonly IUnitOfWork _context;

        public DeleteDoor_GrillsHandler(IUnitOfWork context)
        {
            _context = context;
        }

        public async Task<Door_GrillModel> Handle(DeleteDoor_Grills request, CancellationToken cancellationToken)
        {
            try
            {
                var existingData = _context.Repository<DataEntities.Door_Grills.Door_Grills>().Get()
                    .FirstOrDefault(x => x.Door_GrillId == request.Door_GrillModel.Door_GrillId);

                if (existingData != null)
                {
                    existingData.Deleted = true;
                    existingData.LastModifiedOn = DateTime.UtcNow;
                    existingData.LastModifiedBy = request.Door_GrillModel.LastModifiedBy;
                    await _context.SaveAsync();
                    return request.Door_GrillModel;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}