using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DataEntities.Furniture;
using DataModels.Furniture;
using MediatR;
using Shared.Contexts.Base;

namespace DataServices.Furniture.Commands
{
    public class DeleteFurniture : IRequest<FurnitureModel>
    {
        public FurnitureModel FurnitureModel { get; set; }
    }

    public class DeleteFurnitureHandler : IRequestHandler<DeleteFurniture, FurnitureModel>
    {
        private readonly IUnitOfWork _context;

        public DeleteFurnitureHandler(IUnitOfWork context)
        {
            _context = context;
        }

        public async Task<FurnitureModel> Handle(DeleteFurniture request, CancellationToken cancellationToken)
        {
            try
            {
                var existingData = _context.Repository<DataEntities.Furniture.Furniture>().Get()
                    .FirstOrDefault(x => x.FurnitureId == request.FurnitureModel.FurnitureId);

                if (existingData != null)
                {
                    existingData.Deleted = true;
                    existingData.LastModifiedOn = DateTime.UtcNow;
                    existingData.LastModifiedBy = request.FurnitureModel.LastModifiedBy;
                    await _context.SaveAsync();
                    return request.FurnitureModel;
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
