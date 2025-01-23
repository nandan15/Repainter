using DataModels.TexturePainting;
using MediatR;
using Shared.Contexts.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.TexturePainting.Commands
{
    public class AddTexturePainting:IRequest<TexturePaintingModel>
    {
        public TexturePaintingModel TexturePaintingModel { get; set; }
    }
    public class AddTexturePaintingHandler : IRequestHandler<AddTexturePainting, TexturePaintingModel>
    {
        private readonly IUnitOfWork _context;
        public AddTexturePaintingHandler(IUnitOfWork context)
        {
            _context = context;
        }
        public async Task<TexturePaintingModel> Handle(AddTexturePainting request, CancellationToken cancellationToken)
        {
            try
            {
                var texturepainting = new DataEntities.TexturePainting.TexturePainting
                {
                    TexturePaintingTabId = request.TexturePaintingModel.TexturePaintingTabId,
                    CustomerId = request.TexturePaintingModel.CustomerId,
                    Area = request.TexturePaintingModel.Area,
                    ProductCode = request.TexturePaintingModel.ProductCode,
                    Type = request.TexturePaintingModel.Type,
                    Price = request.TexturePaintingModel.Price,
                    Remarks = request.TexturePaintingModel.Remarks,
                    SectionTotal = request.TexturePaintingModel.SectionTotal,
                    Deleted = request.TexturePaintingModel.Deleted,
                    CreatedOn = request.TexturePaintingModel.CreatedOn,
                    CreatedBy = request.TexturePaintingModel.CreatedBy,
                    LastModifiedBy = request.TexturePaintingModel.LastModifiedBy,
                    LastModifiedOn = request.TexturePaintingModel.LastModifiedOn,
                };
                var texturepaintinged = _context.Repository<DataEntities.TexturePainting.TexturePainting>().Add(texturepainting);
                if (texturepainting is DataEntities.TexturePainting.TexturePainting texturepaintingentity)
                {
                    await _context.SaveAsync();
                    request.TexturePaintingModel.TexturePaintingId = texturepaintingentity.TexturePaintingId;
                    return request.TexturePaintingModel;
                }
                else
                {
                    throw new InvalidCastException("Unable to casr added texturepainting to the texturepainting entity");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
