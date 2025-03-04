using DataModels.Enquiry;
using MediatR;
using Shared.Contexts.Base;
using SQLitePCL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.Enquiry.Queries
{
    public class GetEnquiryById : IRequest<EnquiryModel>
    {
        public int Id { get; set; }
    }
    public class GetEnquiryByIdHandler : IRequestHandler<GetEnquiryById, EnquiryModel>
    {
        private readonly IUnitOfWork _context;
        public GetEnquiryByIdHandler(IUnitOfWork context)
        {
            _context = context;
        }
        public async Task<EnquiryModel> Handle(GetEnquiryById request, CancellationToken cancellationToken)
        {
            try
            {
                var enquiry = _context.Repository<DataEntities.Enquiry.Enquiry>().Get().FirstOrDefault(e => e.Id == request.Id);
                if (enquiry == null)
                {
                    return null;
                }
                return new EnquiryModel
                {
                    Id = enquiry.Id,
                    Title = enquiry.Title,
                    EnquiryId = enquiry.EnquiryId,
                    Name = enquiry.Name,
                    PhoneNumber = enquiry.PhoneNumber,
                    AlternatePhoneNumber = enquiry.AlternatePhoneNumber,
                    EmailId = enquiry.EmailId,
                    ProjectLocation = enquiry.ProjectLocation,
                    ProjectName = enquiry.ProjectName,
                    ProjectType = enquiry.ProjectType,
                    CarpetArea = enquiry.CarpetArea,
                    City = enquiry.City,
                    HouseNo = enquiry.HouseNo,
                    Configurtion = enquiry.Configurtion,
                    CreatedBy = enquiry.CreatedBy,
                    CreatedOn = enquiry.CreatedOn,
                    Deleted = enquiry.Deleted,

                    LastModified = enquiry.LastModified,
                    LastModifiedBy = enquiry.LastModifiedBy,
                };
            }
            catch (Exception ex)
            {
                throw new Exception($"Error fetching enquiry: {ex.Message}", ex);
            }
        }


    }
}
