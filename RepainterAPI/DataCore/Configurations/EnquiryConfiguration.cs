using DataEntities.Enquiry;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataCore.Configurations
{
    public class EnquiryConfiguration:IEntityTypeConfiguration<Enquiry>
    {
      public void Configure(EntityTypeBuilder<Enquiry> entity)
        {
            entity.HasKey(e => e.Id).HasName("PK_Customer");
            entity.ToTable("ScCustomer");
            entity.Property(e => e.EnquiryId);
            entity.Property(e => e.Title);
            entity.Property(e => e.Name);
            entity.Property(e => e.PhoneNumber);
            entity.Property(e => e.AlternatePhoneNumber);
            entity.Property(e => e.EmailId);
            entity.Property(e => e.ProjectName);
            entity.Property(e => e.HouseNo);
            entity.Property(e => e.ProjectType);
            entity.Property(e => e.Configurtion);
            entity.Property(e => e.CarpetArea);
            entity.Property(e => e.ProjectLocation);
            entity.Property(e => e.City);
            entity.Property(e => e.FloorPlan);
            entity.Property(e => e.SitePlan);
            entity.Property(e => e.Deleted);
            entity.Property(e=>e.CreatedBy);
            entity.Property(e => e.CreatedOn);
            entity.Property(e => e.LastModified);
            entity.Property(e => e.LastModified);
        }
    }
}
