using DataModels.Curtain;
using DataModels.Furniture;
using DataServices.Curtain.Queries;
using DataServices.Repository.Curtain;
using DataServices.Repository.Furniture;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.Furniture.Queries
{
    public class GetFurnitureByCustomerId: IRequest<IEnumerable<FurnitureModel>>
    {
        public int CustomerId { get; set; }

        public GetFurnitureByCustomerId(int customerId)
        {
            CustomerId = customerId;
        }
    }
    public class GetFurnitureByCustomerIdHandler : IRequestHandler<GetFurnitureByCustomerId, IEnumerable<FurnitureModel>>
    {
        private readonly IFurnitureRepository _repository;

        public GetFurnitureByCustomerIdHandler(IFurnitureRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<FurnitureModel>> Handle(GetFurnitureByCustomerId request, CancellationToken cancellationToken)
        {
            return await _repository.GetByCustomerIdAsync(request.CustomerId);
        }
    }
}
