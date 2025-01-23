using DataModels.Package;
using MediatR;
using Shared.Contexts.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.Package.Commands
{
    public class UpdatePackage : IRequest<PackageModel>
    {
        public PackageModel PackageModel
        {
            get; set;
        }
        public class UpdatePackageHandler : IRequestHandler<UpdatePackage, PackageModel>
        {
            private readonly IUnitOfWork _context;
            public UpdatePackageHandler(IUnitOfWork context)
            {
                _context = context;
            }
            public async Task<PackageModel> Handle(UpdatePackage request, CancellationToken cancellationToken)
            {
                try
                {

                    var existingPackage = _context.Repository<DataEntities.Package.Package>().Get().Where(x => x.PackageId == request.PackageModel.PackageId).FirstOrDefault();
                    if (existingPackage != null)
                    {
                        existingPackage.PackageTabId = request.PackageModel.PackageTabId;
                        existingPackage.GeneratedId = request.PackageModel.GeneratedId;
                        existingPackage.PackageType = request.PackageModel.PackageType;
                        existingPackage.ProductCode = request.PackageModel.ProductCode;
                        existingPackage.Type = request.PackageModel.Type;
                        existingPackage.Amount = request.PackageModel.Amount;
                        existingPackage.Specification = request.PackageModel.Specification;
                        existingPackage.Condition = request.PackageModel.Condition;
                        existingPackage.Remarks = request.PackageModel.Remarks;
                        existingPackage.SectionTotalPreTax = request.PackageModel.SectionTotalPostTax;
                        existingPackage.SectionTotalPreTax = request.PackageModel.SectionTotalPreTax;
                        existingPackage.CustomerId = request.PackageModel.CustomerId;
                        existingPackage.Deleted = request.PackageModel.Deleted;
                        existingPackage.CreatedOn = request.PackageModel.CreatedOn;
                        existingPackage.CreatedBy = request.PackageModel.CreatedBy;
                        existingPackage.LastModifiedBy = request.PackageModel.LastModifiedBy;
                        existingPackage.LastModifiedOn = request.PackageModel.LastModifiedOn;
                    }
                    await _context.SaveAsync();
                    return request.PackageModel;
                }
                catch (Exception ex) { throw ex; }
            }
        }
    }
}
