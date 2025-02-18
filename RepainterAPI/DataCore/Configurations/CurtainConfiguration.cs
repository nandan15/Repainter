using DataEntities.Curtain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataCore.Configurations
{
    public class CurtainConfiguration:IEntityTypeConfiguration<Curtain>
    {
        public void Configure(EntityTypeBuilder<Curtain>entity)
        {
            entity.HasKey(c => c.CurtainId).HasName("PK_CurtainId");
            entity.ToTable("Curtain");
            entity.Property(c => c.CurtainTabId);
            entity.Property(c => c.GeneratedId);
            entity.Property(c => c.CustomerId);
            entity.Property(c => c.CurtainType);
            entity.Property(c => c.FabricType);
            entity.Property(c=>c.ProductCode); ;
            entity.Property(c => c.Price);
            entity.Property(c => c.CurtainRemarks);
            entity.Property(c => c.RodType);
            entity.Property(c => c.RodProductCode);
            entity.Property(c => c.RodPrice);
            entity.Property(c => c.RodRemarks);
            entity.Property(c => c.FinialType);
            entity.Property(c => c.FinialProductCode);
            entity.Property(c => c.FinialPrice);
            entity.Property(c => c.FinialRemarks);
            entity.Property(c => c.SectionTotalCurtain);
            entity.Property(c => c.WindowCurtainType);
            entity.Property(c => c.WindowFabricType);
            entity.Property(c => c.WindowCurtainPrice);
            entity.Property(c => c.WindowCurtainProductCode);
            entity.Property(c => c.WindowCurtainRemarks);
            entity.Property(c => c.WindowRodType);
            entity.Property(c => c.WindowRodProductCode);
            entity.Property(c=>c.WindowRodPrice);
            entity.Property(c => c.WindowRodRemarks);
            entity.Property(c => c.WindowFinialType);
            entity.Property(c => c.WindowFinialProductCode);
            entity.Property(c => c.WindowFinialPrice);
            entity.Property(c => c.WindowFinialRemarks);
            entity.Property(c => c.SectionTotalWindow);
            entity.Property(c => c.SectionTotal);
            entity.Property(c => c.Deleted);
            entity.Property(c => c.CreatedOn);
            entity.Property(c => c.CreatedBy);
            entity.Property(c=>c.LastModifiedBy);
            entity.Property(c => c.LastModifiedOn);
        }
    }
}
