using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nova.Domain.Entities
{
    public class OfficeHour
    {
        public string DayOfWeek { get; set; } = null!;
        public string? StartTime { get; set; }
        public string? EndTime { get; set; }
    }
}
