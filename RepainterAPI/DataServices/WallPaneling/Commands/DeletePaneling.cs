using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DataEntities.WallPaneling;
using DataModels.WallPaneling;
using MediatR;
using Shared.Contexts.Base;

namespace DataServices.WallPaneling.Commands
{
    public class DeletePaneling : IRequest<PanelingModel>
    {
        public PanelingModel PanelingModel { get; set; }
    }

    public class DeletePanelingHandler : IRequestHandler<DeletePaneling, PanelingModel>
    {
        private readonly IUnitOfWork _context;

        public DeletePanelingHandler(IUnitOfWork context)
        {
            _context = context;
        }

        public async Task<PanelingModel> Handle(DeletePaneling request, CancellationToken cancellationToken)
        {
            try
            {
                var existingData = _context.Repository<DataEntities.WallPaneling.Paneling>().Get()
                    .FirstOrDefault(x => x.PanelingId == request.PanelingModel.PanelingId);

                if (existingData != null)
                {
                    existingData.Deleted = true;
                    existingData.LastModifiedOn = DateTime.UtcNow;
                    existingData.LastModifiedBy = request.PanelingModel.LastModifiedBy;
                    await _context.SaveAsync();
                    return request.PanelingModel;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
