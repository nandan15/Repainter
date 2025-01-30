using DataModels.TexturePainting;
using MediatR;
using Shared.Contexts.Base;
using SQLitePCL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.TexturePainting.Queries
{
    public class GetTexturePainting : IRequest<IEnumerable<TexturePaintingModel>>
    {
        public Dictionary<string, string> Filters { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 20;
    }
    public class GetTexturePaintingHandler : IRequestHandler<GetTexturePainting, IEnumerable<TexturePaintingModel>>
    {
        private readonly IUnitOfWork _context;
        public GetTexturePaintingHandler(IUnitOfWork context)
        {
            _context = context;
        }
        public async Task<IEnumerable<TexturePaintingModel>> Handle(GetTexturePainting request, CancellationToken cancellationToken)
        {
            try
            {
                var query = _context.Repository<DataEntities.TexturePainting.TexturePainting>().Get();
                if (request.Filters != null && request.Filters.Count > 0)
                {
                    foreach (var filter in request.Filters)
                    {
                        switch (filter.Key)
                        {
                            case "Area":
                                query = query.Where(i => i.Area.Contains((string)filter.Value));
                                break;
                            case "productCode":
                                query = query.Where(i => i.ProductCode.Contains((string)filter.Value));
                                break;
                            case "remarks":
                                query = query.Where(i => i.Remarks.Contains((string)filter.Value));
                                break;
                        }
                    }
                }
                query = query.Where(i => i.Deleted);
                return query.Skip((request.Page - 1) * request.PageSize).Take(request.PageSize).Select(i => new TexturePaintingModel
                {
                  TexturePaintingId=i.TexturePaintingId,
                  TexturePaintingTabId=i.TexturePaintingTabId,
                  CustomerId=i.CustomerId,
                  GenerateId=i.GenerateId,
                  Area=i.Area,
                  Type=i.Type,
                  ProductCode=i.ProductCode,
                  Price=i.Price,
                  Remarks=i.Remarks,
                  SectionTotal=i.SectionTotal, 
                  Deleted=i.Deleted,
                  CreatedBy =i.CreatedBy,
                  CreatedOn =i.CreatedOn,
                  LastModifiedBy =i.LastModifiedBy,
                  LastModifiedOn =i.LastModifiedOn,
                }).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }

}
