using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nova.Domain.Entities
{
    public class ParticipatingOrganization
    {
        public  Guid Id { get; set; }
        public string Name { get; set; } = null!;

    }
}
