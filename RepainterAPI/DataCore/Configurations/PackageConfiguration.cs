using DataEntities.Package;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataCore.Configurations
{
    public class PackageConfiguration:IEntityTypeConfiguration<Package>
    {
        public void Configure(EntityTypeBuilder<Package> entity)
        {
            entity.HasKey(p => p.PackageId).HasName("PK_Package");
            entity.ToTable("Package");
            entity.Property(p => p.PackageTabId);
            entity.Property(p => p.GeneratedId);
            entity.Property(p => p.ProductCode);
            entity.Property(p=>p.PackageType);
            entity.Property(p => p.Type);
            entity.Property(p => p.SelectedCode);
            entity.Property(p => p.Amount);
            entity.Property(p => p.Remarks);
            entity.Property(p=>p.SectionTotalPreTax);
            entity.Property(p => p.SectionTotalPostTax);
            entity.Property(p => p.CustomerId); 
            entity.Property(p => p.Specification);
            entity.Property(p => p.Condition);
            entity.Property(p => p.Deleted);
            entity.Property(p => p.CreatedBy);
            entity.Property(p=>p.CreatedOn);
            entity.Property(p => p.LastModifiedBy);
            entity.Property(P => P.LastModifiedOn);
        }
    }
}
