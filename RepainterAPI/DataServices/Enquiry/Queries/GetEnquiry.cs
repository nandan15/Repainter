using DataModels.Enquiry;
using MediatR;
using Shared.Contexts.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.Enquiry.Queries
{
    public class GetEnquiry : IRequest<IEnumerable<EnquiryModel>>
    {
        public Dictionary<string, string> Filters { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 20;
    }
    public class GetEnquiryHandler : IRequestHandler<GetEnquiry, IEnumerable<EnquiryModel>>
    {
        private readonly IUnitOfWork _context;
        public GetEnquiryHandler(IUnitOfWork context)
        {
            _context = context;
        }
        public async Task<IEnumerable<EnquiryModel>> Handle(GetEnquiry request, CancellationToken cancellationToken)
        {
            try
            {
                var query = _context.Repository<DataEntities.Enquiry.Enquiry>().Get();
                if (request.Filters != null && request.Filters.Count > 0)
                {
                    foreach (var filter in request.Filters)
                    {
                        switch (filter.Key)
                        {
                            case "Name":
                                query = query.Where(e => e.Name.Contains((string)filter.Value));
                                break;
                            case "ProjectLocation":
                                query = query.Where(e => e.ProjectLocation.Contains((string)filter.Value));
                                break;
                            case "ProjectType":
                                query = query.Where(e => e.ProjectType.Contains((string)filter.Value));
                                break;
                        }
                    }
                }
                query = query.Where(e => !e.Deleted);
                return query.Skip((request.Page - 1) * request.PageSize).Take(request.PageSize).Select(e => new EnquiryModel
                {
                    Id = e.Id,
                    EnquiryId = e.EnquiryId,
                    Title = e.Title,
                    Name = e.Name,
                    EmailId = e.EmailId,
                    PhoneNumber = e.PhoneNumber,
                    AlternatePhoneNumber = e.AlternatePhoneNumber,
                    ProjectName = e.ProjectName,
                    ProjectLocation = e.ProjectLocation,
                    ProjectType = e.ProjectType,
                    HouseNo = e.HouseNo,
                    CarpetArea = e.CarpetArea,
                    City = e.City,
                    Configurtion = e.Configurtion,
                  
                    CreatedBy = e.CreatedBy,
                    CreatedOn = e.CreatedOn,
                    LastModified = e.LastModified,
                    LastModifiedBy = e.LastModifiedBy,


                }).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
