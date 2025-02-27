using DataEntities.Product;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataCore.Configurations
{
    // FolderConfiguration.cs
    public class FolderConfiguration : IEntityTypeConfiguration<Folder>
    {
        public void Configure(EntityTypeBuilder<Folder> builder)
        {
            builder.HasKey(f => f.FolderId);
            builder.Property(f => f.Name)
                .IsRequired()
                .HasMaxLength(200);
            builder.Property(f => f.CategoryId)
                .IsRequired();
            builder.Property(f => f.CustomerId)
                .IsRequired();
            builder.Property(f => f.UserId)
                .IsRequired();
            builder.Property(f => f.CreatedBy)
                .IsRequired();
            builder.Property(f => f.CreatedOn)
                .IsRequired();
            builder.Property(f => f.IsDeleted)
                .HasDefaultValue(false);

            // Relationship with Category only
            builder.HasOne(f => f.Category)
                .WithMany(c => c.Folders)
                .HasForeignKey(f => f.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);

            // Indexes
            builder.HasIndex(f => new { f.CustomerId, f.UserId });
            builder.HasIndex(f => new { f.CategoryId, f.IsDeleted });

            // Query filter
            builder.HasQueryFilter(f => !f.IsDeleted);
        }
    }
}
