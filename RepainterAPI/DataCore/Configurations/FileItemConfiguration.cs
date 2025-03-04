using DataEntities.Product;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataCore.Configurations
{
    public class CatalogFileConfiguration : IEntityTypeConfiguration<CatalogFile>
    {
        public void Configure(EntityTypeBuilder<CatalogFile> builder)
        {
            builder.HasKey(f => f.FileId);

            builder.Property(f => f.Name)
                .IsRequired()
                .HasMaxLength(255);

            builder.Property(f => f.FileType)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(f => f.FilePath)
                .IsRequired()
                .HasMaxLength(1000);
            builder.Property(f => f.FileSize).IsRequired().HasMaxLength(10000);

            builder.Property(f => f.FolderId)
                .IsRequired();

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

            // Relationships
            builder.HasOne(f => f.Folder)
                .WithMany(f => f.Files)
                .HasForeignKey(f => f.FolderId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(f => f.Category)
                .WithMany()
                .HasForeignKey(f => f.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);

            // Indexes
            builder.HasIndex(f => new { f.CustomerId, f.UserId });
            builder.HasIndex(f => new { f.FolderId, f.IsDeleted });
            builder.HasIndex(f => new { f.CategoryId, f.IsDeleted });
            builder.HasIndex(f => f.FileType);

            // Query filter
            builder.HasQueryFilter(f => !f.IsDeleted);
        }
    }
}