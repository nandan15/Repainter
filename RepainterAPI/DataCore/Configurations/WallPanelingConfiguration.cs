using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataEntities.WallPaneling;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
namespace DataCore.Configurations
{
    public class WallPanelingConfiguration:IEntityTypeConfiguration<Paneling>
    {
        public void Configure(EntityTypeBuilder<Paneling>entity)
        {
            entity.HasKey(p => p.PanelingId).HasName("PK_Paneling");
            entity.ToTable("Panelings");
            entity.Property(p => p.PanelingTabId);
            entity.Property(p => p.GeneratedId);
            entity.Property(p => p.CustomerId);
            entity.Property(p => p.ProductCode);
            entity.Property(p => p.Type);
            entity.Property(p => p.Price);
            entity.Property(p => p.Description);
            entity.Property(p => p.Remarks);
            entity.Property(p => p.SectionTotal);
            entity.Property(p => p.Deleted);
            entity.Property(p=>p.CreatedBy);
            entity.Property(p => p.CreatedOn);
            entity.Property(p=>p.LastModifiedBy);
            entity.Property(p => p.LastModifiedOn);
        }
    }
}
