using DataModels.Enquiry;
using MediatR;
using Microsoft.Extensions.Logging;
using Microsoft.Identity.Client;
using Shared.Contexts.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.Enquiry.Commands
{
    public class DeleteEnquiry:IRequest<EnquiryModel>
    {
        public EnquiryModel EnquiryModel { get; set; }
    }
    public class DeleteEnquiryHandler:IRequestHandler<DeleteEnquiry,EnquiryModel>
    {

        private readonly IUnitOfWork _context;
        public DeleteEnquiryHandler(IUnitOfWork context)
        {
            _context=context;
        }
        public async Task<EnquiryModel> Handle(DeleteEnquiry request,CancellationToken cancellationToken)
        {
            try
            {
                var existingData = _context.Repository<DataEntities.Enquiry.Enquiry>().Get()
                       .FirstOrDefault(x => x.EnquiryId == request.EnquiryModel.EnquiryId);
                    if(existingData!=null)
                {
                    existingData.Deleted = true;
                    existingData.LastModified = DateTime.UtcNow;
                    existingData.LastModifiedBy = request.EnquiryModel.LastModifiedBy;
                    await _context.SaveAsync();
                    return request.EnquiryModel;
                }
                else
                {
                    return null;
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
   
}
