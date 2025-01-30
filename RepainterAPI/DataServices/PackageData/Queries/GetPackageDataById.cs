using DataEntities.Package;
using DataModels.PackageData;
using MediatR;
using Shared.Contexts.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.PackageData.Queries
{
    public class GetPackageDataById : IRequest<PackageDataModel>
    {
        private string _productCode;
        public string ProductCode
        {
            get { return _productCode; }
            set { _productCode = value; }
        }
    }

    public class GetPackageDataByIdHandler : IRequestHandler<GetPackageDataById, PackageDataModel>
    {
        private readonly IUnitOfWork _context;

        public GetPackageDataByIdHandler(IUnitOfWork context)
        {
            _context = context;
        }

        public async Task<PackageDataModel> Handle(GetPackageDataById request, CancellationToken cancellationToken)
        {
            try
            {
                var packageData = _context.Repository<DataEntities.PackageData.PackageData>().Get().FirstOrDefault(p => p.ProductCode == request.ProductCode);

                if (packageData == null)
                {
                    return null;
                }

                return new PackageDataModel
                {
                    PackageId = packageData.PackageId,
                    ProductCode = packageData.ProductCode,
                    Type = packageData.Type,
                    Price = packageData.Price,
                    Content = packageData.Content,
                    Description = packageData.Description,
                };
            }
            catch (Exception ex)
            {
                throw new Exception($"Error Fetching package Data: {ex.Message}", ex);
            }
        }
    }
}