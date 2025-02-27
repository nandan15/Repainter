using DataCore;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DataServices.Enquiry.Queries
{
    public class GenerateNextEnquiryId : IRequest<string>
    {

    }
    public class GenerateNextEnquiryIdHandler : IRequestHandler<GenerateNextEnquiryId, string>
    {
        private readonly RepainterContext _context;

        public GenerateNextEnquiryIdHandler(RepainterContext context)
        {
            _context = context;
        }

        public async Task<string> Handle(GenerateNextEnquiryId request, CancellationToken cancellationToken)
        {
            using (var transaction = await _context.Database.BeginTransactionAsync(cancellationToken))
            {
                try
                {
                    var latestId = await _context.Customer
                        .OrderByDescending(c => c.EnquiryId)
                        .Select(c => c.EnquiryId)
                        .FirstOrDefaultAsync(cancellationToken);

                    string nextId;
                    if (string.IsNullOrEmpty(latestId))
                    {
                        nextId = "ES6001";
                    }
                    else
                    {
                        if (int.TryParse(latestId.Substring(2), out int currentNumber)) // Changed Substring(1) to Substring(2)
                        {
                            nextId = $"ES{(currentNumber + 1).ToString("D4")}";
                        }
                        else
                        {
                            nextId = "ES6001";
                        }
                    }

                    await transaction.CommitAsync(cancellationToken);
                    return nextId;
                }
                catch (Exception)
                {
                    await transaction.RollbackAsync(cancellationToken);
                    throw;
                }
            }
        }
    }
}