using DataModels.Furniture;
using MediatR;
using Shared.Contexts.Base;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace DataServices.Furniture.Commands
{
    public class UpdateFurniture : IRequest<FurnitureModel>
    {
        public FurnitureModel FurnitureModel { get; set; }
    }

    public class UpdateFurnitureHandler : IRequestHandler<UpdateFurniture, FurnitureModel>
    {
        private readonly IUnitOfWork _context;

        public UpdateFurnitureHandler(IUnitOfWork context)
        {
            _context = context;
        }

        public async Task<FurnitureModel> Handle(UpdateFurniture request, CancellationToken cancellationToken)
        {
            try
            {
                var existingFurniture = _context.Repository<DataEntities.Furniture.Furniture>().Get()
                    .FirstOrDefault(x => x.FurnitureId == request.FurnitureModel.FurnitureId);

                if (existingFurniture != null)
                {
                    existingFurniture.FurnitureTabId = request.FurnitureModel.FurnitureTabId;
                    existingFurniture.GeneratedId = request.FurnitureModel.GeneratedId;
                    existingFurniture.CustomerId = request.FurnitureModel.CustomerId;
                    existingFurniture.ProductCode = request.FurnitureModel.ProductCode;
                    existingFurniture.Name = request.FurnitureModel.Name;
                    existingFurniture.Price = request.FurnitureModel.Price;
                    existingFurniture.SectionTotal = request.FurnitureModel.SectionTotal;
                    existingFurniture.Description = request.FurnitureModel.Description;
                    existingFurniture.Remarks = request.FurnitureModel.Remarks;
                    existingFurniture.Deleted = request.FurnitureModel.Deleted;
                    existingFurniture.LastModifiedBy = request.FurnitureModel.LastModifiedBy;
                    existingFurniture.LastModifiedOn = DateTime.UtcNow; // Set to current time
                }

                await _context.SaveAsync();
                return request.FurnitureModel;
            }
            catch (Exception ex)
            {
                throw ex; // Ideally, you should log the exception and throw a custom exception
            }
        }
    }
}