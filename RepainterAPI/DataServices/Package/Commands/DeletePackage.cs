using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DataEntities.Package;
using DataModels.Package;
using MediatR;
using Shared.Contexts.Base;

namespace DataServices.Package.Commands
{
    public class DeletePackage : IRequest<PackageModel>
    {
        public PackageModel PackageModel { get; set; }
    }

    public class DeletePackageHandler : IRequestHandler<DeletePackage, PackageModel>
    {
        private readonly IUnitOfWork _context;

        public DeletePackageHandler(IUnitOfWork context)
        {
            _context = context;
        }

        public async Task<PackageModel> Handle(DeletePackage request, CancellationToken cancellationToken)
        {
            try
            {
                var existingData = _context.Repository<DataEntities.Package.Package>().Get()
                    .FirstOrDefault(x => x.PackageId == request.PackageModel.PackageId);

                if (existingData != null)
                {
                    existingData.Deleted = true;
                    existingData.LastModifiedOn = DateTime.UtcNow;
                    existingData.LastModifiedBy = request.PackageModel.LastModifiedBy;
                    await _context.SaveAsync();
                    return request.PackageModel;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
