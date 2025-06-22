using System.Data;
using Dapper;
using Microsoft.Data.SqlClient;
using OnionTech.Billing.Software.Common.Model.HealthCheck;
using OnionTech.Billing.Software.Infrastructure.Contract;
using OnionTech.Billing.Software.Repository.Common;
using OnionTech.Billing.Software.Repository.Contract;


namespace OnionTech.Billing.Software.Repository.Implement
{
    public class HealthCheckRepository : IHealthCheckRepository
    {
        private readonly IConnectionManager _connectionManager;

        public HealthCheckRepository(IConnectionManager connectionManager)
        {
            _connectionManager = connectionManager;
        }
        async Task<StatusDTO> IHealthCheckRepository.GetHealthStatus()
        {
            await using var connection = new SqlConnection(_connectionManager.ConnectionString);
            connection.Open();
            return (await connection.QueryAsync<StatusDTO>(sql: ConstantProcedure.Get_HealthCheck, param: null,
                commandType: CommandType.StoredProcedure)).FirstOrDefault();
        }
    }
}
