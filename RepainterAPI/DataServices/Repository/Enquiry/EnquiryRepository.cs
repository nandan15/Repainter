using DataCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.Repository.Enquiry
{
    public class EnquiryRepository : IEnquiryRepository
    {
        private readonly RepainterContext _context;

        public EnquiryRepository(RepainterContext context)
        {
            _context = context;
        }

        public async Task<DataEntities.Enquiry.Enquiry> GetByIdAsync(int id)
        {
            return await _context.ScCustomer.FindAsync(id);
        }

        public IQueryable<DataEntities.Enquiry.Enquiry> GetAll()
        {
            return _context.ScCustomer;
        }
    }

}
