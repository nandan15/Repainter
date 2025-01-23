using DataModels.Wallpaper;
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
    public class GetWallpaper : IRequest<IEnumerable<WallpaperModel>>
    {
        public Dictionary<string, string> Filters { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 20;
    }
    public class GetWallpaperHandler : IRequestHandler<GetWallpaper, IEnumerable<WallpaperModel>>
    {
        private readonly IUnitOfWork _context;
        public GetWallpaperHandler(IUnitOfWork context)
        {
            _context = context;
        }
        public async Task<IEnumerable<WallpaperModel>> Handle(GetWallpaper request, CancellationToken cancellationToken)
        {
            try
            {
                var query = _context.Repository<DataEntities.Wallpaper.Wallpaper>().Get();
                if (request.Filters != null && request.Filters.Count > 0)
                {
                    foreach (var filter in request.Filters)
                    {
                        switch (filter.Key)
                        {
                            case "productType":
                                query = query.Where(i => i.ProductType.Contains((string)filter.Value));
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
                return query.Skip((request.Page - 1) * request.PageSize).Take(request.PageSize).Select(i => new WallpaperModel
                {
                  WallpaperId=i.WallpaperId,
                  CustomerId=i.CustomerId,
                  ProductType =i.ProductType,
                  ProductCode =i.ProductCode,
                  NoOfRolls=i.NoOfRolls,
                   Price =i.Price,
                   Remarks =i.Remarks,
                   SectionTotal =i.SectionTotal,
                    Deleted =i.Deleted,
                    CreatedBy =i.CreatedBy,
                    CreatedOn =i.CreatedOn,
                    LastModifiedBy=i.LastModifiedBy,
                    LastModifiedOn=i.LastModifiedOn,
                }).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }

}
