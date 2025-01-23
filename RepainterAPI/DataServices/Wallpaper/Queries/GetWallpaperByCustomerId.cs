using MediatR;
using System.Collections.Generic;
using DataModels.InternalPainting;
using DataModels.Wallpaper;
using DataServices.Repository.InternalPainting;

namespace DataServices.InternalPainting.Queries
{
    public class GetWallpaperByCustomerId : IRequest<IEnumerable<WallpaperModel>>
    {
        public int CustomerId { get; set; }

        public GetWallpaperByCustomerId(int customerId)
        {
            CustomerId = customerId;
        }
    }
    public class GetWallpaperByCustomerIdHandler : IRequestHandler<GetWallpaperByCustomerId, IEnumerable<WallpaperModel>>
    {
        private readonly IInternalPaintingRepository _repository;

        public GetWallpaperByCustomerIdHandler(IInternalPaintingRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<WallpaperModel>> Handle(GetWallpaperByCustomerId request, CancellationToken cancellationToken)
        {
            return (IEnumerable<WallpaperModel>)await _repository.GetByCustomerIdAsync(request.CustomerId);
        }
    }
}
