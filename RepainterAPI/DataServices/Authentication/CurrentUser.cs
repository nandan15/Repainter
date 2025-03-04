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
    public class CurrentUser : ICurrentUser
    {
        private readonly Lazy<int> _userId;
        private readonly Lazy<string> _email;
        private readonly Lazy<string> _fullName;

        public int UserId => _userId.Value;
        public string Email => _email?.Value;
        public string FullName => _fullName?.Value;

        public CurrentUser(IHttpContextAccessor httpContextAccessor)
        {
            var identity = httpContextAccessor?.HttpContext?.User?.Identity as ClaimsIdentity;
            if (identity == null)
            {
                return;
            }

            _userId = new Lazy<int>(() => int.Parse(identity.GetUserId() ?? "0"));
            _email = new Lazy<string>(() => identity.GetUserEmail());
            _fullName = new Lazy<string>(() => identity.GetUserFullName());
        }
    }
}
