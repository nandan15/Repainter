using Dapper;
using DataModels.Summary;
using MediatR;
using Microsoft.Extensions.Logging;
using Shared.Contexts.Base;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace DataServices.Summary.Queries
{
    public class GetSummaryDataById : IRequest<SummaryModel>
    {
        public int UserId { get; set; }
        public int CustomerId { get; set; }
        public decimal? ToVendorAmount { get; set; }
    }
    public class GetSummaryDataByIdHandler : IRequestHandler<GetSummaryDataById, SummaryModel>
    {
        private readonly IUnitOfWork _context;
        private readonly ILogger<GetSummaryDataByIdHandler> _logger;

        public GetSummaryDataByIdHandler(IUnitOfWork context, ILogger<GetSummaryDataByIdHandler> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<SummaryModel> Handle(GetSummaryDataById request, CancellationToken cancellationToken)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@UserId", request.UserId, DbType.Int32);
                parameters.Add("@CustomerId", request.CustomerId, DbType.Int32);
                parameters.Add("@ToVendorAmount", request.ToVendorAmount, DbType.Decimal);

                using (var connection = _context.CreateConnection())
                {
                    var result = await connection.QueryFirstOrDefaultAsync<SummaryModel>(
                        "SpGetCustomerQuoteSummary",
                        parameters,
                        commandType: CommandType.StoredProcedure
                    );

                    return result ?? new SummaryModel();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching summary data");
                throw;
            }
        }
    }
}