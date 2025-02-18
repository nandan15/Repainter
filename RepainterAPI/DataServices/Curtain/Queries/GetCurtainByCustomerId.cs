using MediatR;
using System.Collections.Generic;
using DataModels.InternalPainting;
using DataServices.Repository.Curtain;
using DataModels.Curtain;

namespace DataServices.Curtain.Queries
{
    public class GetCurtainByCustomerId : IRequest<IEnumerable<CurtainModel>>
    {
        public int CustomerId { get; set; }

        public GetCurtainByCustomerId(int customerId)
        {
            CustomerId = customerId;
        }
    }
    public class GetCurtainByCustomerIdHandler : IRequestHandler<GetCurtainByCustomerId, IEnumerable<CurtainModel>>
    {
        private readonly ICurtainRepository _repository;

        public GetCurtainByCustomerIdHandler(ICurtainRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<CurtainModel>> Handle(GetCurtainByCustomerId request, CancellationToken cancellationToken)
        {
            return await _repository.GetByCustomerIdAsync(request.CustomerId);
        }
    }
}
