using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
namespace DataCore.Identity
{
    public class ApplicationUser : IdentityUser<int>
    {
        public ApplicationUser() : base()
        {
        }
    }
}
