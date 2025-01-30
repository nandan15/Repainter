using DataModels.PackageData;
using MediatR;
using Microsoft.EntityFrameworkCore.Metadata;
using Shared.Contexts.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.PackageData.Queries
{
    public class GetPackageData:IRequest<IEnumerable<PackageDataModel>>
    {
        public Dictionary<string, string>Filters { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 20;
    }
    public class GetPackageDataHandler:IRequestHandler<GetPackageData,IEnumerable<PackageDataModel>>
    {
        private readonly IUnitOfWork _context;
        public GetPackageDataHandler(IUnitOfWork context)
        {
            _context = context;
        }
        public async Task<IEnumerable<PackageDataModel>> Handle(GetPackageData request,CancellationToken cancellationToken)
        {
            try
            {
                var query = _context.Repository<DataEntities.PackageData.PackageData>().Get();
                if (request.Filters != null && request.Filters.Count>0)
                {
                    foreach(var filter in request.Filters)
                    {
                        switch(filter.Key)
                        {
                            case "ProductCode":
                                query = query.Where(p => p.ProductCode.Contains((string)filter.Value));
                                break;
                            case "Type":
                                query = query.Where(p => p.Type.Contains((string)filter.Value));
                                break;
                            case "Price":
                                query = query.Where(p => p.Price.Contains((string)filter.Value));
                                break;
                        }
                    }
                }
                return query.Skip((request.Page - 1) * request.PageSize).Take(request.PageSize).Select(p => new PackageDataModel
                {
                    PackageId = p.PackageId,
                    ProductCode = p.ProductCode,
                    Type = p.Type,
                    Price = p.Price,
                    Content = p.Content,
                    Description = p.Description,
                }).ToList();
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
