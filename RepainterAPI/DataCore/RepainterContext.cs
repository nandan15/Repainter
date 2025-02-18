using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataEntities.Enquiry;
using DataEntities.Wallpaper;
using DataEntities.InternalPainting;
using Microsoft.EntityFrameworkCore;
using DataEntities.TexturePainting;
using DataEntities.Package;
using DataEntities.WallPaneling;
using DataEntities.PackageData;
using DataEntities.Furniture;
using DataEntities.Curtain;
using DataEntities.Door_Grills;
using DataEntities.Product;
using DataCore.Configurations;
using DbContext = Microsoft.EntityFrameworkCore.DbContext;


namespace DataCore
{
    public class RepainterContext : DbContext
    {
        public RepainterContext(DbContextOptions options) : base(options) { }

        public Microsoft.EntityFrameworkCore.DbSet<Enquiry> Customer { get; set; }
        public Microsoft.EntityFrameworkCore.DbSet<InternalPainting> InternalPainting { get; set; }
        public Microsoft.EntityFrameworkCore.DbSet<Wallpaper> Wallpaper { get; set; }
        public Microsoft.EntityFrameworkCore.DbSet<TexturePainting> TexturePainting { get; set; }
        public Microsoft.EntityFrameworkCore.DbSet<Package> Package { get; set; }
        public Microsoft.EntityFrameworkCore.DbSet<Paneling> Panelings { get; set; }
        public Microsoft.EntityFrameworkCore.DbSet<PackageData> packageData { get; set; }
        public Microsoft.EntityFrameworkCore.DbSet<Furniture> Furniture { get; set; }
        public Microsoft.EntityFrameworkCore.DbSet<Curtain> Curtains { get; set; }
        public Microsoft.EntityFrameworkCore.DbSet<Door_Grills> Door_Grills { get; set; }
        public Microsoft.EntityFrameworkCore.DbSet<Category> Categories { get; set; }
        public Microsoft.EntityFrameworkCore.DbSet<Folder> Folders { get; set; }
        public Microsoft.EntityFrameworkCore.DbSet<CatalogFile> CatalogFile { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Apply catalog configurations
            modelBuilder.ApplyConfiguration(new CategoryConfiguration());
            modelBuilder.ApplyConfiguration(new FolderConfiguration());
            modelBuilder.ApplyConfiguration(new CatalogFileConfiguration());

            // You can add other existing configurations here
        }
    }
}
