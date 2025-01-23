using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.Authentication
{
    public static class ClaimsIdentityExtensions
    {
        public static string GetUserId(this ClaimsIdentity identity)
        {
            return identity.FindFirst(x => x.Type == "Sid")?.Value;
        }

        public static string GetUserEmail(this ClaimsIdentity identity)
        {
            return identity.FindFirst(x => x.Type == "Email")?.Value;
        }

        public static string GetUserFullName(this ClaimsIdentity identity)
        {
            return identity.FindFirst(x => x.Type == "Name")?.Value;
        }
    }
}
