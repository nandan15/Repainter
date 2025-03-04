using DataModels.InternalPainting;
using DataServices.Authentication;
using MediatR;
using Shared.Contexts.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.InternalPainting.Commands
{
    public class AddInternalPainting : IRequest<InternalPaintingModel>
    {
        public InternalPaintingModel InternalPaintingModel { get; set; }
    }
    public class AddInternalPaintingHandler : IRequestHandler<AddInternalPainting, InternalPaintingModel>
    {
        private readonly IUnitOfWork _context;
        private readonly ICurrentUser _currentUser;
        public AddInternalPaintingHandler(IUnitOfWork context, ICurrentUser currentUser)
        {
            _context = context;
            _currentUser = currentUser;
        }
        public async Task<InternalPaintingModel> Handle(AddInternalPainting request, CancellationToken cancellationToken)
        {
            try
            {
                var InternalPainting = new DataEntities.InternalPainting.InternalPainting
                {
                    CarpetArea = request.InternalPaintingModel.CarpetArea,
                    ProductCode=request.InternalPaintingModel.ProductCode,
                    Color=request.InternalPaintingModel.Color,
                    CustomerId=request.InternalPaintingModel.CustomerId,
                    CeilingType = request.InternalPaintingModel.CeilingType,
                    CeilingPrice = request.InternalPaintingModel.CeilingPrice,
                    CeilingRemarks = request.InternalPaintingModel.CeilingRemarsk,
                    WallType = request.InternalPaintingModel.WallType,
                    WallPrice = request.InternalPaintingModel.WallPrice,
                    WallRemarks = request.InternalPaintingModel.WallRemarks,
                    NoofWall = request.InternalPaintingModel.NoofWall,
                    DarkPrice = request.InternalPaintingModel.DarkPrice,
                    DarkRemarks = request.InternalPaintingModel.DarkRemarks,
                    Deleted=request.InternalPaintingModel.Deleted,
                    CreatedBy = request.InternalPaintingModel.CreatedBy,
                    CreatedOn = request.InternalPaintingModel.CreatedOn,
                    SectionTotalPost_tax = request.InternalPaintingModel.SectionTotalPost_tax,
                    SectionTotalPre_tax = request.InternalPaintingModel.SectionTotalPre_tax,
                    TotalRemarks=request.InternalPaintingModel.TotalRemarks,
                    LastModifiedBy = request.InternalPaintingModel.LastModifiedBy,
                    LastModifiedDate = request.InternalPaintingModel.LastModifiedDate,
                };
                var addedInternalPainting = _context.Repository<DataEntities.InternalPainting.InternalPainting>().Add(InternalPainting);
                if (addedInternalPainting is DataEntities.InternalPainting.InternalPainting internalPaintingEntity)
                {
                    await _context.SaveAsync();
                    request.InternalPaintingModel.IntenalPaintingId = internalPaintingEntity.IntenalPaintingId;
                    return request.InternalPaintingModel;
                }
                else
                {
                    throw new InvalidOperationException("Unable to casr addedInternalPainting to InternalPainting entity.");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
