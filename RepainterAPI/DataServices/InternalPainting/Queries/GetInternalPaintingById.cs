using DataModels.InternalPainting;
using MediatR;
using Shared.Contexts.Base;
using SQLitePCL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.InternalPainting.Queries
{
    public class GetInternalPaintingById:IRequest<InternalPaintingModel>
    {
        public int Id { get; set; }
    }
    public class GetInternalPaintingByIdHandler:IRequestHandler<GetInternalPaintingById,InternalPaintingModel>
    {
        private readonly IUnitOfWork _context;
        public GetInternalPaintingByIdHandler(IUnitOfWork context)
        {
            _context = context;
        }
        public async Task<InternalPaintingModel> Handle(GetInternalPaintingById request, CancellationToken cancellationToken)
        {
            try
            {
                var internalPainting = _context.Repository<DataEntities.InternalPainting.InternalPainting>().Get().FirstOrDefault(i => i.IntenalPaintingId == request.Id);
                if (internalPainting == null)
                {
                    return null;
                }
                return new InternalPaintingModel
                {
                    IntenalPaintingId = internalPainting.IntenalPaintingId,
                    CustomerId = internalPainting.CustomerId,
                    CarpetArea = internalPainting.CarpetArea,
                    ProductCode=internalPainting.ProductCode,
                    Color=internalPainting.Color,
                    CeilingPrice = internalPainting.CeilingPrice,
                    CeilingRemarsk = internalPainting.CeilingRemarks,
                    CeilingType = internalPainting.CeilingType,
                    WallPrice = internalPainting.WallPrice,
                    WallRemarks = internalPainting.WallRemarks,
                    WallType = internalPainting.WallType,
                    NoofWall = internalPainting.NoofWall,
                    DarkPrice = internalPainting.DarkPrice,
                    DarkRemarks = internalPainting.DarkRemarks,
                    SectionTotalPost_tax = internalPainting.SectionTotalPost_tax,
                    SectionTotalPre_tax = internalPainting.SectionTotalPre_tax,
                    TotalRemarks = internalPainting.TotalRemarks,
                    Deleted = internalPainting.Deleted,
                    CreatedBy = internalPainting.CreatedBy,
                    CreatedOn = internalPainting.CreatedOn,
                    LastModifiedBy = internalPainting.LastModifiedBy,
                    LastModifiedDate = internalPainting.LastModifiedDate,
                };
            }
            catch (Exception ex)
            {
                throw new Exception($"Error Fetching internalpainting:{ex.Message}", ex);
            }
    }
    }
    
}
