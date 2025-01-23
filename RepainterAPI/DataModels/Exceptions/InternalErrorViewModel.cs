using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModels.Exceptions
{
    public class InternalErrorViewModel
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public string InternalError { get; set; }
        public string Data { get; set; }
    }
}
