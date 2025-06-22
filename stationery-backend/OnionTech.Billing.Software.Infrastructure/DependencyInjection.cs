using Microsoft.Extensions.DependencyInjection;
using OnionTech.Billing.Software.Infrastructure.Contract;
using OnionTech.Billing.Software.Infrastructure.Implement;

namespace OnionTech.Billing.Software.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddConfiguration(this IServiceCollection services)
        {
            services.AddSingleton<IConnectionManager, ConnectionManager>();
            return services;
        }
    }
}
