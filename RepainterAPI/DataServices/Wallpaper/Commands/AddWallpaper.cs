using DataModels.Wallpaper;
using MediatR;
using Shared.Contexts.Base;
using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.Wallpaper.Commands
{
    public class AddWallpaper:IRequest<WallpaperModel>
    {
        public WallpaperModel WallpaperModel { get; set; }
    }
    public class AddWallpaperHandler:IRequestHandler<AddWallpaper,WallpaperModel>
    {
        private readonly IUnitOfWork _context;
        public AddWallpaperHandler(IUnitOfWork context)
        {
            _context = context;
        }
        public async Task<WallpaperModel> Handle(AddWallpaper request,CancellationToken cancellationToken)
        {
            try
            {
                var wallpaper = new DataEntities.Wallpaper.Wallpaper
                {
                    CustomerId = request.WallpaperModel.CustomerId,
                    ProductType = request.WallpaperModel.ProductType,
                    ProductCode = request.WallpaperModel.ProductCode,
                    NoOfRolls = request.WallpaperModel.NoOfRolls,
                    Remarks = request.WallpaperModel.Remarks,
                    SectionTotal = request.WallpaperModel.SectionTotal,
                    Deleted = request.WallpaperModel.Deleted,
                    CreatedBy = request.WallpaperModel.CreatedBy,
                    CreatedOn = request.WallpaperModel.CreatedOn,
                    LastModifiedBy = request.WallpaperModel.LastModifiedBy,
                    LastModifiedOn = request.WallpaperModel.LastModifiedOn
                };
                var wallpapered = _context.Repository<DataEntities.Wallpaper.Wallpaper>().Add(wallpaper);
                if (wallpapered is DataEntities.Wallpaper.Wallpaper wallpaperEntity)
                {
                    await _context.SaveAsync();
                    request.WallpaperModel.WallpaperId = wallpaperEntity.WallpaperId;
                    return request.WallpaperModel;
                }
                else
                {
                    throw new InvalidCastException("Unable to cast added Wallpaper to the wallpaper entity");
                }
            }
            catch (Exception ex)
            {
                throw ex;

            }
        }
    }
}
