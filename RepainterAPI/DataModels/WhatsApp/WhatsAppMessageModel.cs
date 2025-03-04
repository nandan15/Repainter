using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModels.WhatsApp
{
    public class WhatsAppMessageRequest
    {
        public string MessagingProduct { get; set; } = "whatsapp";
        public string To { get; set; }
        public string Type { get; set; } = "template";
        public Template Template { get; set; }
    }

    public class Template
    {
        public string Name { get; set; }
        public Language Language { get; set; }
        public List<Component> Components { get; set; }
    }

    public class Language
    {
        public string Code { get; set; } = "en";
    }

    public class Component
    {
        public string Type { get; set; } = "body";
        public List<Parameter> Parameters { get; set; }
    }

    public class Parameter
    {
        public string Type { get; set; } = "text";
        public string Text { get; set; }
    }
}
