using DataModels.Curtain;
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
    public class GetCurtain : IRequest<IEnumerable<CurtainModel>>
    {
        public Dictionary<string, string> Filters { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 20;
    }
    public class GetCurtainHandler : IRequestHandler<GetCurtain, IEnumerable<CurtainModel>>
    {
        private readonly IUnitOfWork _context;
        public GetCurtainHandler(IUnitOfWork context)
        {
            _context = context;
        }
        public async Task<IEnumerable<CurtainModel>> Handle(GetCurtain request, CancellationToken cancellationToken)
        {
            try
            {
                var query = _context.Repository<DataEntities.Curtain.Curtain>().Get();
                if (request.Filters != null && request.Filters.Count > 0)
                {
                    foreach (var filter in request.Filters)
                    {
                        switch (filter.Key)
                        {
                            case "CurtainType":
                                query = query.Where(c => c.CurtainType.Contains((string)filter.Value));
                                break;
                            case "FabricType":
                                query = query.Where(c => c.FabricType.Contains((string)filter.Value));
                                break;
                            case "ProductCode":
                                query = query.Where(c => c.ProductCode.Contains((string)filter.Value));
                                break;
                        }
                    }
                }
                query = query.Where(c => c.Deleted);
                return query.Skip((request.Page - 1) * request.PageSize).Take(request.PageSize).Select(c => new CurtainModel
                {
                    CurtainId = c.CurtainId,
                    CurtainTabId = c.CurtainTabId,
                    GeneratedId = c.GeneratedId,
                    CustomerId = c.CustomerId,
                    CurtainType = c.CurtainType,
                    FabricType = c.FabricType,
                    ProductCode = c.ProductCode,
                    Price = c.Price,
                    CurtainRemarks = c.CurtainRemarks,
                    RodType = c.RodType,
                    RodProductCode = c.RodProductCode,
                    RodPrice=c.RodPrice,
                    RodRemarks=c.RodRemarks,
                    FinialType = c.FinialType,
                    FinialProductCode = c.FinialProductCode,
                    FinialPrice = c.FinialPrice,
                    FinialRemarks = c.FinialRemarks,
                    SectionTotalCurtain = c.SectionTotalCurtain,
                    WindowCurtainType = c.WindowCurtainType,
                    WindowFabricType = c.WindowFabricType,
                    WindowCurtainProductCode = c.WindowCurtainProductCode,
                    WindowCurtainPrice = c.WindowCurtainPrice,
                    WindowCurtainRemarks = c.WindowCurtainRemarks,
                    WindowRodType = c.WindowRodType,
                    WindowRodProductCode = c.WindowRodProductCode,
                    WindowRodPrice = c.WindowRodPrice,
                    WindowRodRemarks = c.WindowRodRemarks,
                    WindowFinialType = c.WindowFinialType,
                    WindowFinialProductCode = c.WindowFinialProductCode,
                    WindowFinialPrice = c.WindowFinialPrice,
                    WindowFinialRemarks = c.WindowFinialRemarks,
                    SectionTotalWindow=c.SectionTotalWindow,
                    SectionTotal=c.SectionTotal,
                    CreatedBy = c.CreatedBy,
                    CreatedOn = c.CreatedOn,
                    LastModifiedBy = c.LastModifiedBy,
                    LastModifiedOn = c.LastModifiedOn,
                }).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }

}
