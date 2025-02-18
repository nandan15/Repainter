using DataModels.Wallpaper;
using MediatR;
using Shared.Contexts.Base;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DataEntities.Wallpaper;
using DataModels.Wallpaper;
using MediatR;
using Shared.Contexts.Base;

namespace DataServices.Wallpaper.Commands
{
    public class DeleteWallpaper : IRequest<WallpaperModel>
    {
        public WallpaperModel WallpaperModel { get; set; }
    }

    public class DeleteWallpaperHandler : IRequestHandler<DeleteWallpaper, WallpaperModel>
    {
        private readonly IUnitOfWork _context;

        public DeleteWallpaperHandler(IUnitOfWork context)
        {
            _context = context;
        }

        public async Task<WallpaperModel> Handle(DeleteWallpaper request, CancellationToken cancellationToken)
        {
            try
            {
                var existingData = _context.Repository<DataEntities.Wallpaper.Wallpaper>().Get()
                    .FirstOrDefault(x => x.WallpaperId == request.WallpaperModel.WallpaperId);

                if (existingData != null)
                {
                    existingData.Deleted = true;
                    existingData.LastModifiedOn = DateTime.UtcNow;
                    existingData.LastModifiedBy = request.WallpaperModel.LastModifiedBy;
                    await _context.SaveAsync();
                    return request.WallpaperModel;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
