using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModels.ImageUpload
{
    public class ImageUpdateModel
    {
        public bool Success { get; set; }
        public string FileUrl { get; set; }
        public string Type { get; set; }
        public List<string> Images { get; set; } = new List<string>();
    }
}
