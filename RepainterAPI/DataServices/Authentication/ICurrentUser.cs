using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.Authentication
{
    public interface ICurrentUser
    {
        int UserId { get;  }
        string Email { get;  }
        string FullName { get; }
    }
}
