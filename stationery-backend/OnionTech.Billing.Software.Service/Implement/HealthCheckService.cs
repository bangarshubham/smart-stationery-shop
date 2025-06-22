using OnionTech.Billing.Software.Common.Model.HealthCheck;
using OnionTech.Billing.Software.Repository.Contract;
using OnionTech.Billing.Software.Service.Contract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace OnionTech.Billing.Software.Service.Implement
{
    public class HealthCheckService : IHealthCheckService
    {
        private readonly IHealthCheckRepository _healthCheckRepository;

        public HealthCheckService(IHealthCheckRepository healthCheckRepository)
        {
            _healthCheckRepository = healthCheckRepository;
        }
        Task<StatusDTO> IHealthCheckService.GetHealthStatus()
        {
            return _healthCheckRepository.GetHealthStatus();
        }
    }
}
