using DataModels.Curtain;

using MediatR;
using Shared.Contexts.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.Enquiry.Commands
{
    public class UpdateCurtain : IRequest<CurtainModel>
    {
        public CurtainModel CurtainModel { get; set; }
    }
    public class UpdateCurtainHandler : IRequestHandler<UpdateCurtain, CurtainModel>
    {
        private readonly IUnitOfWork _context;
        public UpdateCurtainHandler(IUnitOfWork context)
        {
            _context = context;
        }
        public async Task<CurtainModel> Handle(UpdateCurtain request, CancellationToken cancellationToken)
        {
            try
            {
                var existingcurtain = _context.Repository<DataEntities.Curtain.Curtain>().Get().Where(x => x.CurtainId == request.CurtainModel.CurtainId).FirstOrDefault();
                if (existingcurtain != null)
                {
                    existingcurtain.CurtainTabId = request.CurtainModel.CurtainTabId;
                    existingcurtain.GeneratedId = request.CurtainModel.GeneratedId;
                    existingcurtain.CustomerId = request.CurtainModel.CustomerId;
                    existingcurtain.CurtainType = request.CurtainModel.CurtainType;
                    existingcurtain.FabricType = request.CurtainModel.FabricType;
                    existingcurtain.ProductCode = request.CurtainModel.ProductCode;
                    existingcurtain.Price = request.CurtainModel.Price;
                    existingcurtain.CurtainRemarks = request.CurtainModel.CurtainRemarks;
                    existingcurtain.RodType = request.CurtainModel.RodType;
                    existingcurtain.RodProductCode = request.CurtainModel.RodProductCode;
                    existingcurtain.RodPrice = request.CurtainModel.RodPrice;
                    existingcurtain.RodRemarks = request.CurtainModel.RodRemarks;
                    existingcurtain.FinialType = request.CurtainModel.FinialType;
                    existingcurtain.FinialPrice = request.CurtainModel.FinialPrice;
                    existingcurtain.FinialProductCode = request.CurtainModel.FinialProductCode;
                    existingcurtain.FinialRemarks = request.CurtainModel.FinialRemarks;
                    existingcurtain.SectionTotalCurtain = request.CurtainModel.SectionTotalCurtain;
                    existingcurtain.WindowCurtainType = request.CurtainModel.WindowCurtainType;
                    existingcurtain.WindowFabricType = request.CurtainModel.WindowFabricType;
                    existingcurtain.WindowCurtainProductCode = request.CurtainModel.WindowCurtainProductCode;
                    existingcurtain.WindowCurtainPrice = request.CurtainModel.WindowCurtainPrice;
                    existingcurtain.WindowCurtainRemarks = request.CurtainModel.WindowCurtainRemarks;
                    existingcurtain.WindowRodType = request.CurtainModel.WindowRodType;
                    existingcurtain.WindowRodProductCode = request.CurtainModel.WindowRodProductCode;
                    existingcurtain.WindowRodPrice = request.CurtainModel.WindowRodPrice;
                    existingcurtain.WindowRodRemarks = request.CurtainModel.WindowRodRemarks;
                    existingcurtain.WindowFinialType = request.CurtainModel.WindowFinialType;
                    existingcurtain.WindowFinialProductCode = request.CurtainModel.WindowFinialProductCode;
                    existingcurtain.WindowFinialPrice = request.CurtainModel.WindowFinialPrice;
                    existingcurtain.WindowFinialRemarks = request.CurtainModel.WindowFinialRemarks;
                    existingcurtain.SectionTotalWindow = request.CurtainModel.SectionTotalWindow;
                    existingcurtain.SectionTotal = request.CurtainModel.SectionTotal;
                }
                await _context.SaveAsync();
                return request.CurtainModel;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
