using DataEntities.Furniture;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataCore.Configurations
{
    public class FurnitureConfiguration:IEntityTypeConfiguration<Furniture>
    {
        public void Configure(EntityTypeBuilder<Furniture>entity)
        {
            entity.HasKey(f => f.FurnitureId).HasName("PK_FurnitureId");
            entity.ToTable("Furniture");
            entity.Property(f => f.FurnitureTabId);
            entity.Property(f => f.GeneratedId);
            entity.Property(f => f.CustomerId);
            entity.Property(f => f.ProductCode);
            entity.Property(f => f.Name);
            entity.Property(f => f.Price);
            entity.Property(f => f.Description);
            entity.Property(f => f.Remarks);
            entity.Property(f => f.SectionTotal);
            entity.Property(f => f.Deleted);
            entity.Property(f=>f.CreatedBy);
            entity.Property(f => f.CreatedOn);
            entity.Property(f => f.LastModifiedBy);
            entity.Property(f => f.LastModifiedOn);
        }
    }
}
