using DataModels.Door_Grills;
using DataModels.Furniture;
using DataServices.Furniture.Queries;
using DataServices.Repository.Door_Grills;
using DataServices.Repository.Furniture;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.Door_Grills.Queries
{
    public class GetDoor_GrillByCustomerId : IRequest<IEnumerable<Door_GrillModel>>
    {
        public int CustomerId { get; set; }

        public GetDoor_GrillByCustomerId(int customerId)
        {
            CustomerId = customerId;
        }
    }
    public class GetDoor_GrillByCustomerIdHandler : IRequestHandler<GetDoor_GrillByCustomerId, IEnumerable<Door_GrillModel>>
    {
        private readonly IDoor_GrillRepository _repository;

        public GetDoor_GrillByCustomerIdHandler(IDoor_GrillRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Door_GrillModel>> Handle(GetDoor_GrillByCustomerId request, CancellationToken cancellationToken)
        {
            return await _repository.GetByCustomerIdAsync(request.CustomerId);
        }
    }
}
