using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DataEntities.Curtain;
using DataModels.Curtain;
using MediatR;
using Shared.Contexts.Base;

namespace DataServices.Curtain.Commands
{
    public class DeleteCurtain : IRequest<CurtainModel>
    {
        public CurtainModel CurtainModel { get; set; }
    }

    public class DeleteCurtainHandler : IRequestHandler<DeleteCurtain, CurtainModel>
    {
        private readonly IUnitOfWork _context;

        public DeleteCurtainHandler(IUnitOfWork context)
        {
            _context = context;
        }

        public async Task<CurtainModel> Handle(DeleteCurtain request, CancellationToken cancellationToken)
        {
            try
            {
                var existingData = _context.Repository<DataEntities.Curtain.Curtain>().Get()
                    .FirstOrDefault(x => x.CurtainId == request.CurtainModel.CurtainId);

                if (existingData != null)
                {
                    existingData.Deleted = true;
                    existingData.LastModifiedOn = DateTime.UtcNow;
                    existingData.LastModifiedBy = request.CurtainModel.LastModifiedBy;
                    await _context.SaveAsync();
                    return request.CurtainModel;
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
