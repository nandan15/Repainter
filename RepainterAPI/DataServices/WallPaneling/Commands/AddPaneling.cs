using DataModels.WallPaneling;
using MediatR;
using Shared.Contexts.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.WallPaneling.Commands
{
    public class AddPaneling : IRequest<PanelingModel>
    {
        public PanelingModel PanelingModel { get; set; }
    }
    public class AddPanelingHandler : IRequestHandler<AddPaneling,PanelingModel>
    {
        private readonly IUnitOfWork _context;
        public AddPanelingHandler(IUnitOfWork context)
        {
            _context = context;
        }
        public async Task<PanelingModel> Handle(AddPaneling request,CancellationToken cancellationToken)
        {
            try
            {
                var paneling = new DataEntities.WallPaneling.Paneling
                {
                    PanelingTabId = request.PanelingModel.PanelingTabId,
                    GeneratedId = request.PanelingModel.GeneratedId,
                    CustomerId = request.PanelingModel.CustomerId,
                    ProductCode = request.PanelingModel.ProductCode,
                    Price = request.PanelingModel.Price,
                    Type = request.PanelingModel.Type,
                    Description = request.PanelingModel.Description,
                    Remarks = request.PanelingModel.Remarks,
                    SectionTotal = request.PanelingModel.SectionTotal,
                    CreatedBy = request.PanelingModel.CreatedBy,
                    CreatedOn = request.PanelingModel.CreatedOn,
                    LastModifiedBy = request.PanelingModel.LastModifiedBy,
                    LastModifiedOn = request.PanelingModel.LastModifiedOn
                };
                var wallpaneling = _context.Repository<DataEntities.WallPaneling.Paneling>().Add(paneling);
                if (paneling is DataEntities.WallPaneling.Paneling wallpanelingentity)
                {
                    await _context.SaveAsync();
                    request.PanelingModel.PanelingId = wallpanelingentity.PanelingId;
                    return request.PanelingModel;
                }
                else
                {
                    throw new InvalidCastException("Unable to cast added wallpaneling to the wallpaneling entity");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
