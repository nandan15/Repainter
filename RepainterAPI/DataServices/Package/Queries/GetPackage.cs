using DataModels.InternalPainting;
using DataModels.Package;
using MediatR;
using Shared.Contexts.Base;
using SQLitePCL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.Package.Queries
{
    public class GetPackage : IRequest<IEnumerable<PackageModel>>
    {
        public Dictionary<string, string> Filters { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 20;
    }
    public class GetPackageHandler : IRequestHandler<GetPackage, IEnumerable<PackageModel>>
    {
        private readonly IUnitOfWork _context;
        public GetPackageHandler(IUnitOfWork context)
        {
            _context = context;
        }
        public async Task<IEnumerable<PackageModel>> Handle(GetPackage request, CancellationToken cancellationToken)
        {
            try
            {
                var query = _context.Repository<DataEntities.Package.Package>().Get();
                if (request.Filters != null && request.Filters.Count > 0)
                {
                    foreach (var filter in request.Filters)
                    {
                        switch (filter.Key)
                        {
                            case "PackageType":
                                query = query.Where(p => p.PackageType.Contains((string)filter.Value));
                                break;
                            case "ProductCode":
                                query = query.Where(p => p.ProductCode.Contains((string)filter.Value));
                                break;
                            case "Type":
                                query = query.Where(p => p.Type.Contains((string)filter.Value));
                                break;
                        }
                    }
                }
                query = query.Where(p => p.Deleted);
                return query.Skip((request.Page - 1) * request.PageSize).Take(request.PageSize).Select(p => new PackageModel
                {
                    PackageId=p.PackageId,
                    PackageTabId=p.PackageTabId,
                    GeneratedId=p.GeneratedId,
                    CustomerId=p.CustomerId,
                    PackageType=p.PackageType,
                    ProductCode=p.ProductCode,
                    Type=p.Type,
                    SelectedCode=p.SelectedCode,
                    Amount=p.Amount,
                    Specification=p.Specification,
                    Condition=p.Condition,
                    Remarks=p.Remarks,
                    SectionTotalPreTax=p.SectionTotalPreTax,
                    SectionTotalPostTax =p.SectionTotalPostTax,

                }).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }

}
