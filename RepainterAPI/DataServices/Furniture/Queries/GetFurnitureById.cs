using DataModels.Furniture;
using MediatR;
using Shared.Contexts.Base;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace DataServices.Furniture.Queries
{
    public class GetFurnitureById : IRequest<FurnitureModel>
    {
        public int Id { get; set; }
    }

    public class GetFurnitureByIdHandler : IRequestHandler<GetFurnitureById, FurnitureModel>
    {
        private readonly IUnitOfWork _context;

        public GetFurnitureByIdHandler(IUnitOfWork context)
        {
            _context = context;
        }

        public async Task<FurnitureModel> Handle(GetFurnitureById request, CancellationToken cancellationToken)
        {
            try
            {
                var furniture = _context.Repository<DataEntities.Furniture.Furniture>()
                    .Get()
                    .FirstOrDefault(f => f.FurnitureId == request.Id);

                if (furniture == null)
                {
                    return null;
                }

                return new FurnitureModel
                {
                    FurnitureId = furniture.FurnitureId,
                    CustomerId = furniture.CustomerId,
                    FurnitureTabId = furniture.FurnitureTabId,
                    GeneratedId=furniture.GeneratedId,
                    ProductCode = furniture.ProductCode,
                    Name=furniture.Name,
                    Price = furniture.Price,
                    Description=furniture.Description,
                    Remarks=furniture.Remarks,
                    SectionTotal = furniture.SectionTotal,
                    Deleted = furniture.Deleted,
                    CreatedBy = furniture.CreatedBy,
                    CreatedOn = furniture.CreatedOn,
                    LastModifiedBy = furniture.LastModifiedBy,
                    LastModifiedOn = furniture.LastModifiedOn,
                };
            }
            catch (Exception ex)
            {
                throw new Exception($"Error fetching furniture: {ex.Message}", ex);
            }
        }
    }
}
