using DataModels.InternalPainting;
using MediatR;
using Shared.Contexts.Base;
using SQLitePCL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.InternalPainting.Queries
{
    public class GetInternalPainting : IRequest<IEnumerable<InternalPaintingModel>>
    {
        public Dictionary<string, string> Filters { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 20;
    }
    public class GetInternalPaintingHandler : IRequestHandler<GetInternalPainting, IEnumerable<InternalPaintingModel>>
    {
        private readonly IUnitOfWork _context;
        public GetInternalPaintingHandler(IUnitOfWork context)
        {
            _context = context;
        }
        public async Task<IEnumerable<InternalPaintingModel>> Handle(GetInternalPainting request, CancellationToken cancellationToken)
        {
            try
            {
                var query = _context.Repository<DataEntities.InternalPainting.InternalPainting>().Get();
                if (request.Filters != null && request.Filters.Count > 0)
                {
                    foreach (var filter in request.Filters)
                    {
                        switch (filter.Key)
                        {
                            case "CeilingType":
                                query = query.Where(i => i.CeilingType.Contains((string)filter.Value));
                                break;
                            case "WallType":
                                query = query.Where(i => i.WallType.Contains((string)filter.Value));
                                break;
                            case "CeilingRemarks":
                                query = query.Where(i => i.CeilingRemarks.Contains((string)filter.Value));
                                break;
                        }
                    }
                }
                query = query.Where(i => i.Deleted);
                return query.Skip((request.Page - 1) * request.PageSize).Take(request.PageSize).Select(i => new InternalPaintingModel
                {
                    IntenalPaintingId = i.IntenalPaintingId,
                    CarpetArea = i.CarpetArea,
                    CeilingPrice = i.CeilingPrice,
                    CeilingType = i.CeilingType,
                    CeilingRemarsk = i.CeilingRemarks,
                    WallPrice = i.WallPrice,
                    WallType = i.WallType,
                    WallRemarks = i.WallRemarks,
                    NoofWall = i.NoofWall,
                    DarkPrice = i.DarkPrice,
                    DarkRemarks = i.DarkRemarks,
                    CustomerId = i.CustomerId,
                    CreatedBy = i.CreatedBy,
                    CreatedOn = i.CreatedOn,
                    LastModifiedBy = i.LastModifiedBy,
                    LastModifiedDate = i.LastModifiedDate,
                    SectionTotalPost_tax = i.SectionTotalPost_tax,
                    SectionTotalPre_tax = i.SectionTotalPre_tax,
                    TotalRemarks = i.TotalRemarks,
                }).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
         }
    }

}
