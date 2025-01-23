using DataModels.Enquiry;
using DataEntities.Enquiry;
using MediatR;
using Shared.Contexts.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataServices.Authentication;
using Microsoft.AspNetCore.Identity;

namespace DataServices.Enquiry.Commands
{
    public class AddEnquiry:IRequest<EnquiryModel>
    {
        public EnquiryModel EnquiryModel { get; set; }
    }
    public class AddEnquiryHandler:IRequestHandler<AddEnquiry,EnquiryModel>
    {
        private readonly IUnitOfWork _context;
        public AddEnquiryHandler(IUnitOfWork context)
        {
            _context = context;
        }
        public async Task<EnquiryModel> Handle(AddEnquiry request,CancellationToken cancellationToken)
        {
            try
            {
                var enquiry = new DataEntities.Enquiry.Enquiry
                {
                    EnquiryId = request.EnquiryModel.EnquiryId,
                    Title=request.EnquiryModel.Title,
                    Name = request.EnquiryModel.Name,
                    EmailId = request.EnquiryModel.EmailId,
                    PhoneNumber =request.EnquiryModel.PhoneNumber,
                    AlternatePhoneNumber=request.EnquiryModel.AlternatePhoneNumber,
                    ProjectName = request.EnquiryModel.ProjectName,
                    HouseNo = request.EnquiryModel.HouseNo,
                    ProjectType = request.EnquiryModel.ProjectType,
                    Configurtion = request.EnquiryModel.Configurtion,
                    CarpetArea = request.EnquiryModel.CarpetArea,
                    ProjectLocation = request.EnquiryModel.ProjectLocation,
                    City = request.EnquiryModel.City,
                    FloorPlan = request.EnquiryModel.FloorPlan,
                    SitePlan = request.EnquiryModel.SitePlan,
                    Deleted = false,
                    CreatedBy = request.EnquiryModel.CreatedBy,
                    CreatedOn = DateTime.UtcNow,
                    LastModifiedBy = request.EnquiryModel.LastModifiedBy,
                    LastModified = DateTime.UtcNow
                };
                var enquired = _context.Repository<DataEntities.Enquiry.Enquiry>().Add(enquiry);
                if(enquired is DataEntities.Enquiry.Enquiry enquiryentity)
                {
                    await _context.SaveAsync();
                    request.EnquiryModel.Id = enquiryentity.Id;
                    return request.EnquiryModel;
                }
                else
                {
                    throw new InvalidCastException("Unable to cast added enquiry to the enquiry entity");
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
