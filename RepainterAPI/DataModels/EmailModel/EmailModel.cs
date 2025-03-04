using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DataModels.EmailModel
{
    public class EmailModel
    {
        [Required(ErrorMessage = "At least one recipient is required")]
        public List<string> To { get; set; } = new List<string>();  // Changed from string to List<string>

        [Required(ErrorMessage = "Subject is required")]
        public string Subject { get; set; }

        [Required(ErrorMessage = "Body is required")]
        public string Body { get; set; }

        public List<EmailAttachment> Attachments { get; set; } = new List<EmailAttachment>();
    }

    public class EmailAttachment
    {
        [Required(ErrorMessage = "Filename is required")]
        public string FileName { get; set; }

        [Required(ErrorMessage = "Content is required")]
        public string Content { get; set; }
    }
}