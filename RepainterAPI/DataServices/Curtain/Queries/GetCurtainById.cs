using DataModels.Curtain;
using MediatR;
using Shared.Contexts.Base;
using SQLitePCL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.Curtain.Queries
{
    public class GetCurtainById : IRequest<CurtainModel>
    {
        public int Id { get; set; }
    }
    public class GetCurtainByIdHandler : IRequestHandler<GetCurtainById, CurtainModel>
    {
        private readonly IUnitOfWork _context;
        public GetCurtainByIdHandler(IUnitOfWork context)
        {
            _context = context;
        }
        public async Task<CurtainModel> Handle(GetCurtainById request, CancellationToken cancellationToken)
        {
            try
            {
                var curtain = _context.Repository<DataEntities.Curtain.Curtain>().Get().FirstOrDefault(c => c.CurtainId == request.Id);
                if (curtain == null)
                {
                    return null;
                }
                return new CurtainModel
                {
                    CurtainId = curtain.CurtainId,
                    CurtainTabId=curtain.CurtainTabId,
                    GeneratedId=curtain.GeneratedId,
                    CustomerId = curtain.CustomerId,
                    CurtainType = curtain.CurtainType,
                    FabricType = curtain.FabricType,
                    ProductCode = curtain.ProductCode,
                    Price = curtain.Price,
                    CurtainRemarks = curtain.CurtainRemarks,
                    RodType = curtain.RodType,
                    RodProductCode = curtain.RodProductCode,
                    RodPrice = curtain.RodPrice,
                    RodRemarks = curtain.RodRemarks,
                    FinialType = curtain.FinialType,
                    FinialProductCode = curtain.FinialProductCode,
                    FinialPrice = curtain.FinialPrice,
                    FinialRemarks = curtain.FinialRemarks,
                    SectionTotalCurtain = curtain.SectionTotalCurtain,
                    WindowCurtainType = curtain.WindowCurtainType,
                    WindowFabricType = curtain.WindowFabricType,
                    WindowCurtainProductCode = curtain.WindowCurtainProductCode,
                    WindowCurtainPrice = curtain.WindowCurtainPrice,
                    WindowCurtainRemarks = curtain.WindowCurtainRemarks,
                    WindowRodType = curtain.WindowRodType,
                    WindowRodProductCode = curtain.WindowRodProductCode,
                    WindowRodPrice = curtain.WindowRodPrice,
                    WindowRodRemarks = curtain.WindowRodRemarks,
                    WindowFinialType = curtain.WindowFinialType,
                    WindowFinialProductCode = curtain.WindowFinialProductCode,
                    WindowFinialPrice = curtain.WindowFinialPrice,
                    WindowFinialRemarks = curtain.WindowFinialRemarks,
                    SectionTotalWindow = curtain.SectionTotalWindow,
                    SectionTotal = curtain.SectionTotal,
                    Deleted = curtain.Deleted,
                    CreatedBy = curtain.CreatedBy,
                    CreatedOn = curtain.CreatedOn,
                    LastModifiedBy = curtain.LastModifiedBy,
                    LastModifiedOn = curtain.LastModifiedOn,
                };
            }
            catch (Exception ex)
            {
                throw new Exception($"Error Fetching curtain:{ex.Message}", ex);
            }
        }
    }

}
