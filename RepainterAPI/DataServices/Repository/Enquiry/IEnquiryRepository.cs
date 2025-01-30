using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.Repository.Enquiry
{
    public interface IEnquiryRepository
    {
        Task<DataEntities.Enquiry.Enquiry> GetByIdAsync(int id);
        IQueryable<DataEntities.Enquiry.Enquiry> GetAll();
    }
}
