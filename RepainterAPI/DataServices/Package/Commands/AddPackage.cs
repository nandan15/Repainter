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
    public class AddPackage : IRequest<PackageModel>
    {
        public PackageModel PackageModel { get; set;
        }
        public class AddPackageHandler : IRequestHandler<AddPackage, PackageModel>
        {
            private readonly IUnitOfWork _context;
            public AddPackageHandler(IUnitOfWork context)
            {
                _context = context;
            }
            public async Task<PackageModel> Handle(AddPackage request, CancellationToken cancellationToken)
            {
                try
                {
                    var package = new DataEntities.Package.Package
                    {
                        PackageTabId = request.PackageModel.PackageTabId,
                        GeneratedId = request.PackageModel.GeneratedId,
                        PackageType = request.PackageModel.PackageType,
                        ProductCode = request.PackageModel.ProductCode,
                        Type = request.PackageModel.Type,
                        Amount = request.PackageModel.Amount,
                        Specification = request.PackageModel.Specification,
                        Condition = request.PackageModel.Condition,
                        CustomerId = request.PackageModel.CustomerId,
                        Remarks = request.PackageModel.Remarks,
                        SectionTotalPostTax = request.PackageModel.SectionTotalPostTax,
                        SectionTotalPreTax = request.PackageModel.SectionTotalPreTax,
                        CreatedOn = request.PackageModel.CreatedOn,
                        CreatedBy = request.PackageModel.CreatedBy,
                        LastModifiedBy = request.PackageModel.LastModifiedBy,
                        LastModifiedOn = request.PackageModel.LastModifiedOn,
                        Deleted = request.PackageModel.Deleted,
                    };
                    var packaged = _context.Repository<DataEntities.Package.Package>().Add(package);
                    if (packaged is DataEntities.Package.Package packageentity)
                    {
                        await _context.SaveAsync();
                        request.PackageModel.PackageId = packageentity.PackageId;
                        return request.PackageModel;
                    }
                    else
                    {
                        throw new InvalidCastException("Unbale to cast added package to the package entity");
                    }
                }
                catch (Exception ex) { throw ex; }
            }
        }
    }
}