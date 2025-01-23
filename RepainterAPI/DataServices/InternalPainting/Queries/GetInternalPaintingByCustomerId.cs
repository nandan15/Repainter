using MediatR;
using System.Collections.Generic;
using DataModels.InternalPainting;
using DataServices.Repository.InternalPainting;

namespace DataServices.InternalPainting.Queries
{
    public class GetInternalPaintingByCustomerId : IRequest<IEnumerable<InternalPaintingModel>>
    {
        public int CustomerId { get; set; }

        public GetInternalPaintingByCustomerId(int customerId)
        {
            CustomerId = customerId;
        }
    }
    public class GetInternalPaintingByCustomerIdHandler : IRequestHandler<GetInternalPaintingByCustomerId, IEnumerable<InternalPaintingModel>>
    {
        private readonly IInternalPaintingRepository _repository;

        public GetInternalPaintingByCustomerIdHandler(IInternalPaintingRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<InternalPaintingModel>> Handle(GetInternalPaintingByCustomerId request, CancellationToken cancellationToken)
        {
            return await _repository.GetByCustomerIdAsync(request.CustomerId);
        }
    }
}
