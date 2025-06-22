using Microsoft.Extensions.DependencyInjection;
using OnionTech.Billing.Software.Service.Contract;
using OnionTech.Billing.Software.Service.Implement;

namespace OnionTech.Billing.Software.Service
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddConfiguration(this IServiceCollection services)
        {
            services.AddTransient<IHealthCheckService, HealthCheckService>();
            return services;
        }
    }
}
