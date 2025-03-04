using DataModels.Furniture;
using DataServices.Authentication;
using MediatR;
using Shared.Contexts.Base;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DataServices.Furniture.Commands
{
    public class AddFurniture : IRequest<FurnitureModel>
    {
        public FurnitureModel FurnitureModel { get; set; }
    }

    public class AddFurnitureHandler : IRequestHandler<AddFurniture, FurnitureModel>
    {
        private readonly IUnitOfWork _context;
        private readonly ICurrentUser _currentUser;

        public AddFurnitureHandler(IUnitOfWork context, ICurrentUser currentUser)
        {
            _context = context;
            _currentUser = currentUser;
        }

        public async Task<FurnitureModel> Handle(AddFurniture request, CancellationToken cancellationToken)
        {
            try
            {
                var furniture = new DataEntities.Furniture.Furniture
                {
                    FurnitureTabId = request.FurnitureModel.FurnitureTabId,
                    GeneratedId = request.FurnitureModel.GeneratedId,
                    CustomerId = request.FurnitureModel.CustomerId,
                    ProductCode = request.FurnitureModel.ProductCode,
                    Name = request.FurnitureModel.Name,
                    Price = request.FurnitureModel.Price,
                    SectionTotal = request.FurnitureModel.SectionTotal,
                    Description = request.FurnitureModel.Description,
                    Remarks = request.FurnitureModel.Remarks,
                    Deleted = request.FurnitureModel.Deleted,
                    CreatedBy = request.FurnitureModel.CreatedBy,
                    CreatedOn = request.FurnitureModel.CreatedOn,
                    LastModifiedBy = request.FurnitureModel.LastModifiedBy,
                    LastModifiedOn = request.FurnitureModel.LastModifiedOn,
                };

                var addedFurniture = _context.Repository<DataEntities.Furniture.Furniture>().Add(furniture);
                if (addedFurniture is DataEntities.Furniture.Furniture furnitureEntity)
                {
                    await _context.SaveAsync();
                    request.FurnitureModel.FurnitureId = furnitureEntity.FurnitureId;
                    return request.FurnitureModel;
                }
                else
                {
                    throw new InvalidOperationException("Unable to cast addedFurniture to Furniture entity.");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
