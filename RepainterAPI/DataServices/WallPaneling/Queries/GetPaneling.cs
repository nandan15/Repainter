using DataModels.WallPaneling;
using MediatR;
using Shared.Contexts.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.WallPaneling.Queries
{
    public class GetPaneling:IRequest<IEnumerable<PanelingModel>>
    {
        public Dictionary<string, string> Filters { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 20;
    }
    public class GetPanelingHandler : IRequestHandler<GetPaneling, IEnumerable<PanelingModel>>
    {
        private readonly IUnitOfWork _context;
        public GetPanelingHandler(IUnitOfWork context)
        {
            _context = context;
        }
        public async Task<IEnumerable<PanelingModel>> Handle(GetPaneling request, CancellationToken cancellationToken)
        {
            try
            {
                var query = _context.Repository<DataEntities.WallPaneling.Paneling>().Get();
                if (request.Filters != null && request.Filters.Count > 0)
                {
                    foreach (var filter in request.Filters)
                    {
                        switch (filter.Key)
                        {
                            case "productCode":
                                query = query.Where(p => p.PanelingType.Contains((string)filter.Value));
                                break;
                            case "type":
                                query = query.Where(p => p.Type.Contains((string)filter.Value));
                                break;
                            case "remarks":
                                query = query.Where(p => p.Remarks.Contains((string)filter.Value));
                                break;
                        }
                    }
                }
                query = query.Where(p => p.Deleted);
                return query.Skip((request.Page - 1) * request.PageSize).Take(request.PageSize).Select(p => new PanelingModel
                {
                    PanelingId = p.PanelingId,
                    PanelingTabId = p.PanelingTabId,
                    GeneratedId = p.GeneratedId,
                    CustomerId = p.CustomerId,
                    Type = p.Type,
                    PaintingType = p.PaintingType,
                    PanelingType   = p.PanelingType,
                    TextureType = p.TextureType,
                    WallPaperType = p.WallPaperType,
                    Price = p.Price,
                    Lighting=p.Lighting,
                    LightingPrice=p.LightingPrice,
                    Remarks = p.Remarks,
                    Description = p.Description,
                    Deleted = p.Deleted,
                    SectionTotal = p.SectionTotal,
                    CreatedBy = p.CreatedBy,
                    CreatedOn = p.CreatedOn,
                    LastModifiedBy = p.LastModifiedBy,
                    LastModifiedOn = p.LastModifiedOn,
                }).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
