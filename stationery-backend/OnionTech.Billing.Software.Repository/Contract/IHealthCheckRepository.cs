using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OnionTech.Billing.Software.Common.Model.HealthCheck;


namespace OnionTech.Billing.Software.Repository.Contract
{
    public interface IHealthCheckRepository
    {
        Task<StatusDTO> GetHealthStatus();
    }
}
