namespace DataModels.Enquiry
{
    public class EnquiryModel
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
        public string ProjectType { get; set; }
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
        public int CreatedBy { get; set; }
        public List<CustomerImage> FloorPlanImages { get; set; } = new List<CustomerImage>();
        public List<CustomerImage> SitePlanImages { get; set; } = new List<CustomerImage>();
    }

    public class CustomerImage
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public string ImageType { get; set; } // "floor" or "site"
        public byte[] ImageData { get; set; }
        public string ContentType { get; set; }
        public DateTime UploadedOn { get; set; }
    }
}