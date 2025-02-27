using AutoMapper;
using DataEntities.Enquiry;
using DataModels.Enquiry;
namespace DataServices.Mappings
{
    public class EnquiryMappingProfile : Profile
    {
        public EnquiryMappingProfile()
        {
            CreateMap<DataEntities.Enquiry.Enquiry, EnquiryModel>();
            CreateMap<EnquiryModel, DataEntities.Enquiry.Enquiry>();
        }
    }
}