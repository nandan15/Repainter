    using MediatR;
    using System.Collections.Generic;
    using DataModels.InternalPainting;
    using DataModels.Wallpaper;
    using DataServices.Repository.InternalPainting;
using DataServices.Repository.Wallpaper;

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
        private readonly IWallpaperRepository _repository;

        public GetWallpaperByCustomerIdHandler(IWallpaperRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<WallpaperModel>> Handle(GetWallpaperByCustomerId request, CancellationToken cancellationToken)
        {
            return await _repository.GetByCustomerIdAsync(request.CustomerId);
        }
    }
}
