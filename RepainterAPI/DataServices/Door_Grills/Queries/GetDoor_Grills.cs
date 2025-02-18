using DataModels.Door_Grills;
using MediatR;
using Shared.Contexts.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace DataServices.Door_Grills.Queries
{
    public class GetDoor_Grills : IRequest<IEnumerable<Door_GrillModel>>
    {
        public Dictionary<string, string> Filters { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 20;
    }

    public class GetDoor_GrillsHandler : IRequestHandler<GetDoor_Grills, IEnumerable<Door_GrillModel>>
    {
        private readonly IUnitOfWork _context;

        public GetDoor_GrillsHandler(IUnitOfWork context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Door_GrillModel>> Handle(GetDoor_Grills request, CancellationToken cancellationToken)
        {
            try
            {
                var query = _context.Repository<DataEntities.Door_Grills.Door_Grills>().Get();

                if (request.Filters != null && request.Filters.Count > 0)
                {
                    foreach (var filter in request.Filters)
                    {
                        switch (filter.Key)
                        {
                            case "MainDoorRemarks":
                                query = query.Where(dg => dg.MainDoorRemarks.Contains(filter.Value));
                                break;
                            case "InternalDoorRemarks":
                                query = query.Where(dg => dg.InternalDoorRemarks.Contains(filter.Value));
                                break;
                            case "Window_GrillRemarks":
                                query = query.Where(dg => dg.Window_GrillRemarks.Contains(filter.Value));
                                break;
                        }
                    }
                }

                query = query.Where(dg => !dg.Deleted);

                return query.Skip((request.Page - 1) * request.PageSize)
                            .Take(request.PageSize)
                            .Select(dg => new Door_GrillModel
                            {
                                Door_GrillId = dg.Door_GrillId,
                                Door_GrillTabId = dg.Door_GrillTabId,
                                GeneratedId = dg.GeneratedId,
                                CustomerId = dg.CustomerId,
                                MainDoorLength = dg.MainDoorLength,
                                MainDoorHeight = dg.MainDoorHeight,
                                MainDoorNumber_of_Doors = dg.MainDoorNumber_of_Doors,
                                MainDoorSurface = dg.MainDoorSurface,
                                MainDoorPrice = dg.MainDoorPrice,
                                MainDoorRemarks = dg.MainDoorRemarks,
                                InternalDoorLength = dg.InternalDoorLength,
                                InternalDoorHeight = dg.InternalDoorHeight,
                                InternalDoorNumber_of_Doors = dg.InternalDoorNumber_of_Doors,
                                InternalDoorSurface = dg.InternalDoorSurface,
                                InternalDoorPrice = dg.InternalDoorPrice,
                                InternalDoorRemarks = dg.InternalDoorRemarks,
                                Window_GrillLength = dg.Window_GrillLength,
                                Window_GrillHeight = dg.Window_GrillHeight,
                                Window_GrillPrice = dg.Window_GrillPrice,
                                Window_GrillRemarks = dg.Window_GrillRemarks,
                                Balcony_GrillLength = dg.Balcony_GrillLength,
                                Balcony_GrillHeight = dg.Balcony_GrillHeight,
                                Balcony_GrillPrice = dg.Balcony_GrillPrice,
                                Balcony_GrillRemarks = dg.Balcony_GrillRemarks,
                                SectionTotal = dg.SectionTotal,
                                Deleted = dg.Deleted,
                                CreatedBy = dg.CreatedBy,
                                CreatedOn = dg.CreatedOn,
                                LastModifiedBy = dg.LastModifiedBy,
                                LastModifiedOn = dg.LastModifiedOn,
                            })
                            .ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
