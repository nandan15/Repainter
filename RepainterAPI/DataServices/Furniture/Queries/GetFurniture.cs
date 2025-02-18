using DataModels.Furniture;
using MediatR;
using Shared.Contexts.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace DataServices.Furniture.Queries
{
    public class GetFurniture : IRequest<IEnumerable<FurnitureModel>>
    {
        public Dictionary<string, string> Filters { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 20;
    }

    public class GetFurnitureHandler : IRequestHandler<GetFurniture, IEnumerable<FurnitureModel>>
    {
        private readonly IUnitOfWork _context;
        public GetFurnitureHandler(IUnitOfWork context)
        {
            _context = context;
        }

        public async Task<IEnumerable<FurnitureModel>> Handle(GetFurniture request, CancellationToken cancellationToken)
        {
            try
            {
                var query = _context.Repository<DataEntities.Furniture.Furniture>().Get();

                if (request.Filters != null && request.Filters.Count > 0)
                {
                    foreach (var filter in request.Filters)
                    {
                        switch (filter.Key)
                        {
                            case "ProductCode":
                                query = query.Where(f => f.ProductCode.Contains(filter.Value));
                                break;
                            case "Name":
                                query = query.Where(f => f.Name.Contains(filter.Value));
                                break;
                            case "Description":
                                query = query.Where(f => f.Description.Contains(filter.Value));
                                break;
                        }
                    }
                }

                query = query.Where(f => !f.Deleted);

                return query.Skip((request.Page - 1) * request.PageSize).Take(request.PageSize).Select(f => new FurnitureModel
                {
                    FurnitureId = f.FurnitureId,
                    FurnitureTabId = f.FurnitureTabId,
                    GeneratedId = f.GeneratedId,
                    CustomerId = f.CustomerId,
                    ProductCode = f.ProductCode,
                    Name = f.Name,
                    Price = f.Price,
                    SectionTotal = f.SectionTotal,
                    Description = f.Description,
                    Remarks = f.Remarks,
                    CreatedBy = f.CreatedBy,
                    CreatedOn = f.CreatedOn,
                    LastModifiedBy = f.LastModifiedBy,
                    LastModifiedOn = f.LastModifiedOn,
                }).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
