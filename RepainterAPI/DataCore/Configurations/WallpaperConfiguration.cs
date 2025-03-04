using DataEntities.Wallpaper;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataCore.Configurations
{
    public class WallpaperConfiguration:IEntityTypeConfiguration<Wallpaper>
    {
        public void Configure(EntityTypeBuilder<Wallpaper> entity)
        {
            entity.HasKey(w => w.WallpaperId).HasName("PK_Wallpaper");
            entity.ToTable("Wallpaper");
            entity.Property(w => w.CustomerId);
            entity.Property(w => w.ProductType);
            entity.Property(w => w.ProductCode);
            entity.Property(w => w.NoOfRolls);
            entity.Property(w => w.Remarks);
            entity.Property(w => w.Price);
            entity.Property(w => w.SectionTotal);
            entity.Property(w => w.Deleted);
            entity.Property(w=>w.CreatedBy);
            entity.Property(w => w.CreatedOn);
            entity.Property(w => w.LastModifiedBy);
            entity.Property(w => w.LastModifiedOn);
        }
    }
}
