using DataModels.TexturePainting;
using MediatR;
using Shared.Contexts.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServices.TexturePainting.Commands
{
    public class UpdateTexturePainting:IRequest<TexturePaintingModel>
    {
        public TexturePaintingModel TexturePaintingModel { get; set; }
    }
    public class UpdateTexturePaintingHandler:IRequestHandler<UpdateTexturePainting,TexturePaintingModel>
    {
        private readonly IUnitOfWork _context;
        public UpdateTexturePaintingHandler(IUnitOfWork context)
        {
            _context = context;
        }
        public async Task<TexturePaintingModel> Handle(UpdateTexturePainting request, CancellationToken cancellationToken)
        {
            try
            {
                var existingtexturepainting = _context.Repository<DataEntities.TexturePainting.TexturePainting>().Get().Where(x => x.TexturePaintingId == request.TexturePaintingModel.TexturePaintingId).FirstOrDefault();
                if (existingtexturepainting != null)
                {
                    existingtexturepainting.TexturePaintingTabId = request.TexturePaintingModel.TexturePaintingTabId;
                    existingtexturepainting.CustomerId = request.TexturePaintingModel.CustomerId;
                    existingtexturepainting.Area = request.TexturePaintingModel.Area;
                    existingtexturepainting.ProductCode = request.TexturePaintingModel.ProductCode;
                    existingtexturepainting.Type = request.TexturePaintingModel.Type;
                    existingtexturepainting.Price = request.TexturePaintingModel.Price;
                    existingtexturepainting.Remarks = request.TexturePaintingModel.Remarks;
                    existingtexturepainting.SectionTotal = request.TexturePaintingModel.SectionTotal;
                    existingtexturepainting.Deleted = request.TexturePaintingModel.Deleted;
                    existingtexturepainting.CreatedOn = request.TexturePaintingModel.CreatedOn;
                    existingtexturepainting.CreatedBy = request.TexturePaintingModel.CreatedBy;
                    existingtexturepainting.LastModifiedBy = request.TexturePaintingModel.LastModifiedBy;
                    existingtexturepainting.LastModifiedOn = request.TexturePaintingModel.LastModifiedOn;
                }
                await _context.SaveAsync();
                return request.TexturePaintingModel;
            }
            catch (Exception ex)
            {
                throw ex;
            }   
        }
    }
}
