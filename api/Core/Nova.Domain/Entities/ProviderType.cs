using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nova.Domain.Entities
{
    public class ProviderType    
    {
        public Guid ProviderTypeID { get; set; }
        public string Code { get; set; } = null!;
        public string Description { get; set; } = null!;
    }
}
