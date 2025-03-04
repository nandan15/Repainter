using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using DataCore.Identity;

namespace DataCore
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, int>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Configure Identity tables to use identity columns
            builder.Entity<ApplicationUser>()
                .Property(e => e.Id)
                .UseIdentityColumn();

            builder.Entity<ApplicationRole>()
                .Property(e => e.Id)
                .UseIdentityColumn();
        }
    }
}