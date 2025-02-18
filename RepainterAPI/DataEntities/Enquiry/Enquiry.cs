using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace DataEntities.Enquiry
{
    public class Enquiry
    {
        public int Id { get; set; }
        public string EnquiryId { get; set; }
        public string Title { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string AlternatePhoneNumber { get; set; }
        public string EmailId { get; set; }
        public string ProjectName { get; set; }
        public string HouseNo { get; set; }
        public string ProjectType { get;set; }
        public string Configurtion { get; set; }
        public string CarpetArea { get; set; }
        public string ProjectLocation { get; set; }
        public string City { get; set; }
        public string FloorPlan { get; set; }
        public string SitePlan { get; set; }
        public bool Deleted { get; set; }
        public DateTime LastModified { get; set; }
        public int LastModifiedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get;set; }

    }
}
