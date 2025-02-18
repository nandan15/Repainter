using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DataEntities.TexturePainting;
using DataModels.TexturePainting;
using MediatR;
using Shared.Contexts.Base;

namespace DataServices.TexturePainting.Commands
{
    public class DeleteTexturePainting : IRequest<TexturePaintingModel>
    {
        public TexturePaintingModel TexturePaintingModel { get; set; }
    }

    public class DeleteTexturePaintingHandler : IRequestHandler<DeleteTexturePainting, TexturePaintingModel>
    {
        private readonly IUnitOfWork _context;

        public DeleteTexturePaintingHandler(IUnitOfWork context)
        {
            _context = context;
        }

        public async Task<TexturePaintingModel> Handle(DeleteTexturePainting request, CancellationToken cancellationToken)
        {
            try
            {
                var existingData = _context.Repository<DataEntities.TexturePainting.TexturePainting>().Get()
                    .FirstOrDefault(x => x.TexturePaintingId == request.TexturePaintingModel.TexturePaintingId);

                if (existingData != null)
                {
                    existingData.Deleted = true;
                    existingData.LastModifiedOn = DateTime.UtcNow;
                    existingData.LastModifiedBy = request.TexturePaintingModel.LastModifiedBy;
                    await _context.SaveAsync();
                    return request.TexturePaintingModel;
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
