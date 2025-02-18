using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModels.WhatsApp
{
    public class WhatsAppSendMessageRequest
    {
        public string PhoneNumber { get; set; }
        public string Message { get; set; }
    }
}
