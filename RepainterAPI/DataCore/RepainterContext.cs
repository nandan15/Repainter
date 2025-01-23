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
using DbContext = Microsoft.EntityFrameworkCore.DbContext;
using DataEntities.TexturePainting;
using DataEntities.Package;

namespace DataCore
{
    public class RepainterContext:DbContext
    {
        public RepainterContext(DbContextOptions options):base(options) { }
        public Microsoft.EntityFrameworkCore.DbSet<Enquiry> ScCustomer { get; set; }
        public Microsoft.EntityFrameworkCore.DbSet<InternalPainting> ScInternalPainting { get; set; }
        public Microsoft.EntityFrameworkCore.DbSet<Wallpaper> ScWallpaper { get;set; }
        public Microsoft.EntityFrameworkCore.DbSet<TexturePainting> ScTexturePainting { get; set; }
        public Microsoft.EntityFrameworkCore.DbSet<Package> ScPackage { get; set; }
    }
}
