using DataModels.Wallpaper;
using MediatR;
using Shared.Contexts.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.Wallpaper.Commands
{
    public class UpdateWallpaper : IRequest<WallpaperModel>
    {
        public WallpaperModel WallpaperModel { get; set; }
    }
    public class UpdateWallpaperHandler : IRequestHandler<UpdateWallpaper, WallpaperModel>
    {
        private readonly IUnitOfWork _context;
        public UpdateWallpaperHandler(IUnitOfWork context)
        {
            _context = context;
        }
        public async Task<WallpaperModel> Handle(UpdateWallpaper request, CancellationToken cancellationToken)
        {
            try
            {
                var existingWallpaper = _context.Repository<DataEntities.Wallpaper.Wallpaper>().Get().Where(x => x.WallpaperId == request.WallpaperModel.WallpaperId).FirstOrDefault();
                if (existingWallpaper != null)
                {
                    existingWallpaper.CustomerId = request.WallpaperModel.CustomerId;
                    existingWallpaper.ProductType = request.WallpaperModel.ProductType;
                    existingWallpaper.ProductCode = request.WallpaperModel.ProductCode;
                    existingWallpaper.NoOfRolls = request.WallpaperModel.NoOfRolls;
                    existingWallpaper.Price = request.WallpaperModel.Price;
                    existingWallpaper.Remarks = request.WallpaperModel.Remarks;
                    existingWallpaper.SectionTotal = request.WallpaperModel.SectionTotal;
                    existingWallpaper.CreatedBy = request.WallpaperModel.CreatedBy;
                    existingWallpaper.CreatedOn = request.WallpaperModel.CreatedOn;
                    existingWallpaper.LastModifiedOn = request.WallpaperModel.LastModifiedOn;
                    existingWallpaper.LastModifiedBy = request.WallpaperModel.LastModifiedBy;
                }
                await _context.SaveAsync();
                return request.WallpaperModel;
            }
            catch (Exception ex)
            {
                throw ex;

            }
        }
    }
}
