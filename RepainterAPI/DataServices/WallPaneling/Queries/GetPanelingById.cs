using DataModels.WallPaneling;
using MediatR;
using Shared.Contexts.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.WallPaneling.Queries
{
    public class GetPanelingById:IRequest<PanelingModel>
    {
        public int Id { get; set; }
    }
    public class GetPanelingByIdHandler : IRequestHandler<GetPanelingById, PanelingModel>
    {
        private readonly IUnitOfWork _context;
        public GetPanelingByIdHandler(IUnitOfWork context)
        {
            _context = context;
        }
        public async Task<PanelingModel> Handle(GetPanelingById request,CancellationToken cancellationToken)
        {
            try
            {
                var wallpaneling = _context.Repository<DataEntities.WallPaneling.Paneling>().Get().FirstOrDefault(p => p.PanelingId == request.Id);
                if (wallpaneling == null)
                {
                    return null;
                }
                return new PanelingModel
                {
                    PanelingId = wallpaneling.PanelingId,
                    PanelingTabId = wallpaneling.PanelingTabId,
                    GeneratedId = wallpaneling.GeneratedId,
                    CustomerId = wallpaneling.CustomerId,
                    Type = wallpaneling.Type,
                    PaintingType = wallpaneling.PaintingType,
                    PanelingType = wallpaneling.PanelingType,
                    TextureType = wallpaneling.TextureType,
                    WallPaperType = wallpaneling.WallPaperType,
                    Price = wallpaneling.Price,
                    Lighting = wallpaneling.Lighting,
                    LightingPrice = wallpaneling.LightingPrice,
                    Remarks = wallpaneling.Remarks,
                    Description = wallpaneling.Description,
                    Deleted = wallpaneling.Deleted,
                    SectionTotal = wallpaneling.SectionTotal,
                    CreatedBy = wallpaneling.CreatedBy,
                    CreatedOn = wallpaneling.CreatedOn,
                    LastModifiedBy = wallpaneling.LastModifiedBy,
                    LastModifiedOn = wallpaneling.LastModifiedOn,
                };
            }
            catch (Exception ex)
            {
                throw new Exception($"Error Fetching paneling:{ex.Message}", ex);
            }
        }
    }
}
