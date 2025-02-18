using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModels.WhatsApp
{
    public class WhatsAppWebhookModel
    {
        public string Object { get; set; }
        public List<Entry> Entry { get; set; }
    }

    public class Entry
    {
        public string Id { get; set; }
        public List<Change> Changes { get; set; }
    }

    public class Change
    {
        public string Field { get; set; }
        public Value Value { get; set; }
    }

    public class Value
    {
        public string MessagingProduct { get; set; }
        public Metadata Metadata { get; set; }
        public List<Message> Messages { get; set; }
    }

    public class Metadata
    {
        public string DisplayPhoneNumber { get; set; }
        public string PhoneNumberId { get; set; }
    }

    public class Message
    {
        public string From { get; set; }
        public string Id { get; set; }
        public string Text { get; set; }
    }
}