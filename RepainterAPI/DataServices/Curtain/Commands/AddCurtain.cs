using DataModels.Curtain;
using DataServices.Authentication;
using MediatR;
using Shared.Contexts.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.Curtain.Commands
{
    public class AddCurtain : IRequest<CurtainModel>
    {
        public CurtainModel CurtainModel { get; set; }
    }
    public class AddCurtainHandler : IRequestHandler<AddCurtain, CurtainModel>
    {
        private readonly IUnitOfWork _context;
        private readonly ICurrentUser _currentUser;
        public AddCurtainHandler(IUnitOfWork context, ICurrentUser currentUser)
        {
            _context = context;
            _currentUser = currentUser;
        }
        public async Task<CurtainModel> Handle(AddCurtain request, CancellationToken cancellationToken)
        {
            try
            {
                var Curtain = new DataEntities.Curtain.Curtain
                {
                    CurtainTabId = request.CurtainModel.CurtainTabId,
                    GeneratedId=request.CurtainModel.GeneratedId,
                    CustomerId = request.CurtainModel.CustomerId,
                    CurtainType = request.CurtainModel.CurtainType,
                    FabricType = request.CurtainModel.FabricType,
                    ProductCode = request.CurtainModel.ProductCode,
                    Price = request.CurtainModel.Price,
                    CurtainRemarks = request.CurtainModel.CurtainRemarks,
                    RodType = request.CurtainModel.RodType,
                    RodProductCode = request.CurtainModel.RodProductCode,
                    RodPrice = request.CurtainModel.RodPrice,
                    RodRemarks = request.CurtainModel.RodRemarks,
                    FinialType =request.CurtainModel.FinialType,
                    FinialProductCode=request.CurtainModel.FinialProductCode,
                    FinialPrice=request.CurtainModel.FinialPrice,
                    FinialRemarks=request.CurtainModel.FinialRemarks,
                    SectionTotalCurtain=request.CurtainModel.SectionTotalCurtain,
                    WindowCurtainType=request.CurtainModel.WindowCurtainType,
                    WindowFabricType=request.CurtainModel.WindowFabricType,
                    WindowCurtainProductCode=request.CurtainModel.WindowCurtainProductCode,
                    WindowCurtainPrice=request.CurtainModel.WindowCurtainPrice,
                    WindowCurtainRemarks=request.CurtainModel.WindowCurtainRemarks,
                    WindowRodType=request.CurtainModel.WindowRodType,
                    WindowRodProductCode=request.CurtainModel.WindowRodProductCode,
                    WindowRodRemarks=request.CurtainModel.WindowRodRemarks,
                    WindowRodPrice=request.CurtainModel.WindowRodPrice,
                    WindowFinialType=request.CurtainModel.WindowFinialType,
                    WindowFinialProductCode=request.CurtainModel.WindowFinialProductCode,
                    WindowFinialPrice=request.CurtainModel.WindowFinialPrice,
                    WindowFinialRemarks=request.CurtainModel.WindowFinialRemarks,
                    SectionTotalWindow=request.CurtainModel.SectionTotalWindow,
                    SectionTotal=request.CurtainModel.SectionTotal,
                    Deleted = request.CurtainModel.Deleted,
                    CreatedBy = request.CurtainModel.CreatedBy,
                    CreatedOn = request.CurtainModel.CreatedOn,
                    LastModifiedBy = request.CurtainModel.LastModifiedBy,
                    LastModifiedOn = request.CurtainModel.LastModifiedOn,
                };
                var addedCurtain = _context.Repository<DataEntities.Curtain.Curtain>().Add(Curtain);
                if (addedCurtain is DataEntities.Curtain.Curtain curtainEntity)
                {
                    await _context.SaveAsync();
                    request.CurtainModel.CurtainId = curtainEntity.CurtainId;
                    return request.CurtainModel;
                }
                else
                {
                    throw new InvalidOperationException("Unable to casr addedCurtain to Curtain entity.");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
