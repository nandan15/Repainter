using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModels.ImageUpload
{
    public class CustomerImagesModel
    {
        public bool Success { get; set; }
        public int CustomerId { get; set; }
        public List<EnquiryImagesModel> EnquiryImages { get; set; } = new List<EnquiryImagesModel>();
    }
}
