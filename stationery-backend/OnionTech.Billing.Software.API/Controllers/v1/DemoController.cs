using Microsoft.AspNetCore.Mvc;
using OnionTech.Billing.Software.Common.Model.HealthCheck;
using OnionTech.Billing.Software.Service.Contract;

namespace OnionTech.Billing.Software.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DemoController : ApiController
    {
        private readonly ILogger<DemoController> _logger;
        private readonly IHealthCheckService _healthCheckService;

        public DemoController(ILogger<DemoController> logger, IHealthCheckService healthCheckService)
        {
            _logger = logger;
            _healthCheckService = healthCheckService;
        }

        [HttpGet("/api/health-check")]
        public async Task<ActionResult<StatusDTO>> HealthCheck()
        {
            return await _healthCheckService.GetHealthStatus();
        }

    }
}
