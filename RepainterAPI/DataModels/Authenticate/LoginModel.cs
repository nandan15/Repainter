using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModels.Authenticate
{
    public class LoginModel
    {
        [Required(ErrorMessage ="UserName is required")]
        public string? UserName { get;set; }
        [Required(ErrorMessage ="Password is required")]
        public string? Password { get;set; }
        public string? Role { get;set; }
    }
}
