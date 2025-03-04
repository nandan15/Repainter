using DataCore;
using DataEntities.Wallpaper;
using DataModels.InternalPainting;
using DataModels.Wallpaper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.Repository.Wallpaper
{
    public class WallpaperRepository:IWallpaperRepository
    {
        private readonly RepainterContext _context;

        public WallpaperRepository(RepainterContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<WallpaperModel>> GetByCustomerIdAsync(int customerId)
        {
            return await Task.Run(() =>
                _context.Wallpaper
                .Where(w => w.CustomerId == customerId && !w.Deleted)
                .Select(w => new WallpaperModel
                {
                    WallpaperId = w.WallpaperId,
                    CustomerId = w.CustomerId,
                    ProductType = w.ProductType,
                    ProductCode = w.ProductCode,
                    NoOfRolls = w.NoOfRolls,
                    Price = w.Price,
                    Remarks = w.Remarks,
                    SectionTotal = w.SectionTotal,
                    Deleted = w.Deleted,
                    CreatedOn = w.CreatedOn,
                    CreatedBy = w.CreatedBy,
                    LastModifiedOn = w.LastModifiedOn,
                    LastModifiedBy = w.LastModifiedBy
                })
                .ToList()
            );
        }
    }
}
