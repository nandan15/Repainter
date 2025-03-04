using DataModels.Package;
using MediatR;
using Shared.Contexts.Base;
using SQLitePCL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.Package.Queries
{
    public class GetPackageById : IRequest<PackageModel>
    {
        public int Id { get; set; }
    }
    public class GetPackageByIdHandler : IRequestHandler<GetPackageById, PackageModel>
    {
        private readonly IUnitOfWork _context;
        public GetPackageByIdHandler(IUnitOfWork context)
        {
            _context = context;
        }
        public async Task<PackageModel> Handle(GetPackageById request, CancellationToken cancellationToken)
        {
            try
            {
                var package = _context.Repository<DataEntities.Package.Package>().Get().FirstOrDefault(p => p.PackageId == request.Id);
                if (package == null)
                {
                    return null;
                }
                return new PackageModel
                {
                    PackageId=package.PackageId,
                    PackageTabId=package.PackageTabId,
                    GeneratedId=package.GeneratedId,
                    CustomerId=package.CustomerId,
                    PackageType=package.PackageType,
                    ProductCode=package.ProductCode,
                    Type=package.PackageType,
                    Amount=package.Amount,
                    SelectedCode=package.SelectedCode,
                    Specification=package.Specification,
                    Condition=package.Condition,
                    SectionTotalPreTax=package.SectionTotalPreTax,
                    SectionTotalPostTax=package.SectionTotalPostTax,
                    Deleted = package.Deleted,
                    CreatedBy = package.CreatedBy,
                    CreatedOn = package.CreatedOn,
                    LastModifiedBy = package.LastModifiedBy,
                    LastModifiedOn = package.LastModifiedOn
                };
            }
            catch (Exception ex)
            {
                throw new Exception($"Error Fetching package:{ex.Message}", ex);
            }
        }
    }

}
