using DataEntities.Package;
using DataEntities.PackageData;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataCore.Configurations
{
    public class PackageDataConfiguration: IEntityTypeConfiguration<PackageData>
    {
        public void Configure(EntityTypeBuilder<PackageData> entity)
        {
            entity.HasKey(p => p.PackageId).HasName("PK_PackageData");
            entity.ToTable("PackageData");
            entity.Property(p => p.ProductCode);
            entity.Property(p => p.Type);
            entity.Property(p => p.Price);
            entity.Property(p => p.Content);
            entity.Property(p => p.Description);
        }
    }
}
