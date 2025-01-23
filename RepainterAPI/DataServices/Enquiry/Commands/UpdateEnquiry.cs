using DataModels.Enquiry;
using MediatR;
using Shared.Contexts.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.Enquiry.Commands
{
    public class UpdateEnquiry:IRequest<EnquiryModel>
    {
        public EnquiryModel enquirymodel { get; set; }
    }
    public class UpdateEnquiryHandler:IRequestHandler<UpdateEnquiry,EnquiryModel>
    {
        private readonly IUnitOfWork _context;
        public UpdateEnquiryHandler(IUnitOfWork context)
        {
            _context = context;
        }
        public async Task<EnquiryModel> Handle(UpdateEnquiry request,CancellationToken cancellationToken)
        {
            try
            {
                var existingenquiry = _context.Repository<DataEntities.Enquiry.Enquiry>().Get().Where(x => x.Id == request.enquirymodel.Id).FirstOrDefault();
                    if(existingenquiry!=null)
                {
                    existingenquiry.Title = request.enquirymodel.Title;
                    existingenquiry.Name = request.enquirymodel.Name;
                    existingenquiry.PhoneNumber = request.enquirymodel.PhoneNumber;
                    existingenquiry.AlternatePhoneNumber = request.enquirymodel.AlternatePhoneNumber;
                    existingenquiry.EmailId = request.enquirymodel.EmailId;
                    existingenquiry.ProjectName = request.enquirymodel.ProjectName;
                    existingenquiry.HouseNo = request.enquirymodel.HouseNo;
                    existingenquiry.ProjectType = request.enquirymodel.ProjectType;
                    existingenquiry.Configurtion = request.enquirymodel.Configurtion;
                    existingenquiry.CarpetArea = request.enquirymodel.CarpetArea;
                    existingenquiry.ProjectLocation = request.enquirymodel.ProjectLocation;
                    existingenquiry.City = request.enquirymodel.City;
                    existingenquiry.FloorPlan = request.enquirymodel.FloorPlan;
                    existingenquiry.SitePlan = request.enquirymodel.SitePlan;
                }
                await _context.SaveAsync();
                return request.enquirymodel;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
