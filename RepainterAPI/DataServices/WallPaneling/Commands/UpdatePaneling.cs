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
    public class UpdatePaneling:IRequest<PanelingModel>
    {
        public PanelingModel panelingModel { get; set; }
    }
    public class UpdatePanelingHandler:IRequestHandler<UpdatePaneling,PanelingModel>
    {
        private readonly IUnitOfWork _context;
        public UpdatePanelingHandler(IUnitOfWork context)
        {
            _context = context;
        }
        public async Task<PanelingModel> Handle(UpdatePaneling request,CancellationToken cancellationToken)
        {
            try
            {
                var existingWallPaneling = _context.Repository<DataEntities.WallPaneling.Paneling>().Get().Where(x => x.PanelingId == request.panelingModel.PanelingId).FirstOrDefault();
                if (existingWallPaneling != null)
                {
                    existingWallPaneling.PanelingTabId = request.panelingModel.PanelingTabId;
                    existingWallPaneling.GeneratedId = request.panelingModel.GeneratedId;
                    existingWallPaneling.CustomerId = request.panelingModel.CustomerId;
                    existingWallPaneling.ProductCode = request.panelingModel.ProductCode;
                    existingWallPaneling.Type = request.panelingModel.Type;
                    existingWallPaneling.Price = request.panelingModel.Price;
                    existingWallPaneling.Description = request.panelingModel.Description;
                    existingWallPaneling.Remarks = request.panelingModel.Remarks;
                    existingWallPaneling.CreatedOn = request.panelingModel.CreatedOn;
                    existingWallPaneling.CreatedBy = request.panelingModel.CreatedBy;
                    existingWallPaneling.LastModifiedBy = request.panelingModel.LastModifiedBy;
                    existingWallPaneling.LastModifiedOn = request.panelingModel.LastModifiedOn;
                }
                await _context.SaveAsync();
                return request.panelingModel;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
