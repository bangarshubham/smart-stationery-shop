using Microsoft.Extensions.DependencyInjection;
using OnionTech.Billing.Software.Repository.Contract;
using OnionTech.Billing.Software.Repository.Implement;

namespace OnionTech.Billing.Software.Repository
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddConfiguration(this IServiceCollection services)
        {
            services.AddTransient<IHealthCheckRepository, HealthCheckRepository>();
            return services;
        }
    }
}
