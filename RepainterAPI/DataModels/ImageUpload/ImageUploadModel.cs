using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModels.ImageUpload
{
    public class ImageUpdateModel
    {
        public string Type { get; set; } // "floor" or "site"
        public List<string> Images { get; set; }
    }
}
