using DataModels.TexturePainting;
using DataModels.Wallpaper;
using MediatR;
using Shared.Contexts.Base;
using SQLitePCL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.TexturePainting.Queries
{
    public class GetTexturePaintingById : IRequest<TexturePaintingModel>
    {
        public int Id { get; set; }
    }
    public class GetTexturePaintingByIdHandler : IRequestHandler<GetTexturePaintingById, TexturePaintingModel>
    {
        private readonly IUnitOfWork _context;
        public GetTexturePaintingByIdHandler(IUnitOfWork context)
        {
            _context = context;
        }
        public async Task<TexturePaintingModel> Handle(GetTexturePaintingById request, CancellationToken cancellationToken)
        {
            try
            {
                var texturepainting = _context.Repository<DataEntities.TexturePainting.TexturePainting>().Get().FirstOrDefault(i => i.TexturePaintingId == request.Id);
                if (texturepainting == null)
                {
                    return null;
                }
                return new TexturePaintingModel
                {
                   TexturePaintingId=texturepainting.TexturePaintingId,
                   TexturePaintingTabId=texturepainting.TexturePaintingTabId,
                   CustomerId=texturepainting.CustomerId,
                   GenerateId=texturepainting.GenerateId,
                   Area=texturepainting.Area,
                   Type=texturepainting.Type,
                   ProductCode =texturepainting.ProductCode,
                   Price=texturepainting.Price,
                   Remarks=texturepainting.Remarks,
                   SectionTotal=texturepainting.SectionTotal,
                   Deleted=texturepainting.Deleted,
                   CreatedBy=texturepainting.CreatedBy,
                   CreatedOn=texturepainting.CreatedOn,
                   LastModifiedBy=texturepainting.LastModifiedBy,
                   LastModifiedOn=texturepainting.LastModifiedOn,
                };
            }
            catch (Exception ex)
            {
                throw new Exception($"Error Fetching texture painting:{ex.Message}", ex);
            }
        }
    }

}
