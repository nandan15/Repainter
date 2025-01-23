using DataServices.Authentication;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.Authentication
{
    public class Currentuser:ICurrentUser
    {
        private readonly Lazy<string> _userId;
        private readonly Lazy<string> _email;
        private readonly Lazy<string> _fullName;

        public Guid UserId => new Guid(_userId?.Value);

        public string Email => _email?.Value;

        public string FullName => _fullName?.Value;

        public Currentuser(IHttpContextAccessor httpContextAccessor)
        {
            var identity = httpContextAccessor?.HttpContext?.User?.Identity as ClaimsIdentity;

            if (identity == null)
            {
                return;
            }

            _userId = new Lazy<string>(() => identity.GetUserId());
            _email = new Lazy<string>(() => identity.GetUserEmail());
            _fullName = new Lazy<string>(() => identity.GetUserFullName());
        }
    }
}
