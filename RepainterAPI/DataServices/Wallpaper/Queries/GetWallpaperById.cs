using DataModels.Wallpaper;
using MediatR;
using Shared.Contexts.Base;
using SQLitePCL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.Wallpaper.Queries
{
    public class GetWallpaperById : IRequest<WallpaperModel>
    {
        public int Id { get; set; }
    }
    public class GetWallpaperByIdHandler : IRequestHandler<GetWallpaperById, WallpaperModel>
    {
        private readonly IUnitOfWork _context;
        public GetWallpaperByIdHandler(IUnitOfWork context)
        {
            _context = context;
        }
        public async Task<WallpaperModel> Handle(GetWallpaperById request, CancellationToken cancellationToken)
        {
            try
            {
                var wallpaper = _context.Repository<DataEntities.Wallpaper.Wallpaper>().Get().FirstOrDefault(i => i.WallpaperId == request.Id);
                if (wallpaper == null)
                {
                    return null;
                }
                return new WallpaperModel
                {
                    WallpaperId = wallpaper.WallpaperId,
                    CustomerId = wallpaper.CustomerId,
                    ProductType = wallpaper.ProductType,
                    ProductCode = wallpaper.ProductCode,
                    Price = wallpaper.Price,
                    Remarks = wallpaper.Remarks,
                    NoOfRolls = wallpaper.NoOfRolls,
                    SectionTotal = wallpaper.SectionTotal,
                    Deleted = wallpaper.Deleted,
                    CreatedBy = wallpaper.CreatedBy,
                    CreatedOn = wallpaper.CreatedOn,
                    LastModifiedBy = wallpaper.LastModifiedBy,
                    LastModifiedOn =  wallpaper.LastModifiedOn,
                };
            }
            catch (Exception ex)
            {
                throw new Exception($"Error Fetching wallpaper:{ex.Message}", ex);
            }
        }
    }

}
