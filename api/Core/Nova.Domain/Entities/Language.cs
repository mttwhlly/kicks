using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nova.Domain.Entities
{
    public class Language
    {
        public Guid Id { get; set; }
        public string EmployeeType { get; set; }
        public string Name { get; set; } = null!;
        public string SkillName { get; set; } = null!;
    }
}
