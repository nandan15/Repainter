using DataModels.TexturePainting;
using DataModels.WallPaneling;
using DataServices.Repository;
using DataServices.Repository.TexturePainting;
using DataServices.Repository.Wallpaper;
using DataServices.TexturePainting.Queries;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.WallPaneling.Queries
{
    public class GetPanelingByCustomerId : IRequest<IEnumerable<PanelingModel>>
    {
        public int CustomerId { get; set; }
        public GetPanelingByCustomerId(int customerId)
        {
            CustomerId = customerId;
        }
    }

    public class GetPanelingByCustomerIdHandler : IRequestHandler<GetPanelingByCustomerId, IEnumerable<PanelingModel>>
    {
        private readonly IPanelingRepository _repository;

        public GetPanelingByCustomerIdHandler(IPanelingRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<PanelingModel>> Handle(GetPanelingByCustomerId request, CancellationToken cancellationToken)
        {
            return await _repository.GetByCustomerIdAsync(request.CustomerId);
        }
    }
}

