using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnionTech.Billing.Software.Common.Model.HealthCheck
{
    public class StatusDTO
    {
        public int Status { get; set; }
        public required string Message { get; set; }
    }
}
