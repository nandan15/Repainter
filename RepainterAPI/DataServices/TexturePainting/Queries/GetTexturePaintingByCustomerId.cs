using MediatR;
using System.Collections.Generic;
using DataModels.InternalPainting;
using DataServices.Repository.InternalPainting;
using DataModels.TexturePainting;
using DataServices.Repository.TexturePainting;

namespace DataServices.TexturePainting.Queries
{
    public class GetTexturePaintingByCustomerId : IRequest<IEnumerable<TexturePaintingModel>>
    {
        public int CustomerId { get; set; }

        public GetTexturePaintingByCustomerId(int customerId)
        {
            CustomerId = customerId;
        }
    }
    public class GetTexturePaintingByCustomerIdHandler : IRequestHandler<GetTexturePaintingByCustomerId, IEnumerable<TexturePaintingModel>>
    {
        private readonly ITexturePaintingRepository _repository;

        public GetTexturePaintingByCustomerIdHandler(ITexturePaintingRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<TexturePaintingModel>> Handle(GetTexturePaintingByCustomerId request, CancellationToken cancellationToken)
        {
            return await _repository.GetByCustomerIdAsync(request.CustomerId);
        }
    }
}
