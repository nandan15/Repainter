using DataModels.InternalPainting;
using DataModels.Package;
using DataServices.InternalPainting.Queries;
using DataServices.Repository.InternalPainting;
using DataServices.Repository.Package;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.Package.Queries
{
    public class GetPackageByCustomerId : IRequest<IEnumerable<PackageModel>>
    { 
        public int CustomerId { get; set; }

        public GetPackageByCustomerId(int customerId)
        {
            CustomerId = customerId;
        }
    }
    public class GetPackageByCustomerIdHandler : IRequestHandler<GetPackageByCustomerId, IEnumerable<PackageModel>>
    {
        private readonly IPackageRepository _repository;

        public GetPackageByCustomerIdHandler(IPackageRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<PackageModel>> Handle(GetPackageByCustomerId request, CancellationToken cancellationToken)
        {
            return await _repository.GetByCustomerIdAsync(request.CustomerId);
        }
    }

}
