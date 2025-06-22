using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnionTech.Billing.Software.Infrastructure.Contract
{
    public interface IConnectionManager
    {
        public string ConnectionString { get; }
        string GetConnectionString();
    }
}
