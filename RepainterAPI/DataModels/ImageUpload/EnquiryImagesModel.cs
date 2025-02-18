using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModels.ImageUpload
{
    public class EnquiryImagesModel
    {
        public int EnquiryId { get; set; }
        public List<string> FloorPlanImages { get; set; } = new List<string>();
        public List<string> SitePlanImages { get; set; } = new List<string>();
    }
}
