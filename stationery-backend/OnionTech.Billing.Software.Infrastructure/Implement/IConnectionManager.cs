using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections.Generic;
using OnionTech.Billing.Software.Infrastructure.Contract;
using Microsoft.Extensions.Configuration;

namespace OnionTech.Billing.Software.Infrastructure.Implement
{
    public class ConnectionManager(IConfiguration configuration) : IConnectionManager
    {
        public string ConnectionString { get; } = configuration.GetConnectionString("ConnectionString");

        public string GetConnectionString()
        {
            return ConnectionString;
        }
    }
}
