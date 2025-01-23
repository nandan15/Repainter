using DataEntities.TexturePainting;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataCore.Configurations
{
    public class TexturePaintingConfiguration:IEntityTypeConfiguration<TexturePainting>
    {
        public void Configure(EntityTypeBuilder<TexturePainting> entity)
        {
            entity.HasKey(t => t.TexturePaintingId).HasName("PK_TexturePainting");
            entity.ToTable("ScTexturePainting");
            entity.Property(t => t.TexturePaintingTabId);
            entity.Property(t => t.CustomerId);
            entity.Property(t => t.Area);
            entity.Property(t => t.ProductCode);
            entity.Property(t => t.Type);
            entity.Property(t => t.Price);
            entity.Property(t => t.Remarks);
            entity.Property(t => t.Deleted);
            entity.Property(t => t.SectionTotal);
            entity.Property(t => t.CreatedOn);
            entity.Property(t => t.CreatedBy);
            entity.Property(t => t.LastModifiedBy);
            entity.Property(t => t.LastModifiedOn);
        }
    }
}
