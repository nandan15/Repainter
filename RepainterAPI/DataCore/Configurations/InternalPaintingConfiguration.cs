using DataEntities.InternalPainting;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataCore.Configurations
{
    public class InternalPaintingConfiguration:IEntityTypeConfiguration<InternalPainting>
    {
        public void Configure(EntityTypeBuilder<InternalPainting> entity)
        {
            entity.HasKey(I => I.IntenalPaintingId).HasName("PK_InternalPainting");
            entity.ToTable("InternalPainting");
            entity.Property(I => I.CarpetArea);
            entity.Property(I => I.ProductCode);
            entity.Property(I => I.Color);
            entity.Property(I => I.CeilingType);
            entity.Property(I => I.CeilingPrice);
            entity.Property(I => I.WallType);
            entity.Property(I => I.WallPrice);
            entity.Property(I=>I.WallType);
            entity.Property(I => I.SectionTotalPost_tax);
            entity.Property(I=>I.SectionTotalPost_tax);
            entity.Property(I => I.CreatedBy);
            entity.Property(I => I.CreatedOn);
            entity.Property(I => I.LastModifiedBy);
            entity.Property(I => I.LastModifiedDate);
        }
    }
}
