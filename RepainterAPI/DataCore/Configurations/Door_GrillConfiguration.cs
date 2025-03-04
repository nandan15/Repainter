using DataEntities.Door_Grills;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataCore.Configurations
{
    public  class Door_GrillConfiguration:IEntityTypeConfiguration<Door_Grills>
    {
        public void Configure(EntityTypeBuilder<Door_Grills>entity)
        {
            entity.HasKey(d => d.Door_GrillId).HasName("PK_Door_Grill");
            entity.Property(d => d.GeneratedId);
            entity.Property(d => d.Door_GrillTabId);
            entity.Property(d=>d.CustomerId);
            entity.Property(d => d.MainDoorLength);
            entity.Property(d => d.MainDoorHeight);
            entity.Property(d => d.MainDoorNumber_of_Doors);
            entity.Property(d => d.MainDoorPrice);
            entity.Property(d => d.MainDoorRemarks);
            entity.Property(d => d.InternalDoorLength);
            entity.Property(d => d.InternalDoorHeight);
            entity.Property(d => d.InternalDoorNumber_of_Doors);
            entity.Property(d => d.InternalDoorPrice);
            entity.Property(d => d.InternalDoorSurface);
            entity.Property(d => d.InternalDoorRemarks);
            entity.Property(d => d.Balcony_GrillLength);
            entity.Property(d => d.Balcony_GrillHeight);
            entity.Property(d => d.Balcony_GrillPrice);
            entity.Property(d => d.Balcony_GrillRemarks);
            entity.Property(d => d.Window_GrillHeight);
            entity.Property(d => d.Window_GrillLength);
            entity.Property(d => d.Window_GrillPrice);
            entity.Property(d => d.Window_GrillRemarks);
            entity.Property(d => d.SectionTotal);
            entity.Property(d => d.Deleted);
            entity.Property(d => d.CreatedBy);
            entity.Property(d => d.CreatedOn);
            entity.Property(d => d.LastModifiedOn);
            entity.Property(d => d.LastModifiedBy);
        }
    }
}
