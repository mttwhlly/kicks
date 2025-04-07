using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nova.Domain.Entities
{
    public class PracticeLocation
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string AddressLine1 { get; set; } = null!;
        public string? AddressLine2 { get; set; }
        public string City { get; set; } = null!;
        public string State { get; set; } = null!;
        public string Zip { get; set; } = null!;
        public string OfficeType { get; set; } = null!;
        public string? OfficePhoneNumber { get; set; }
        public string? OfficePhoneExtension { get; set; }
        public string? OfficeFaxNumber { get; set; }
        public bool IsAccessible { get; set; }
        public string? Latitude { get; set; }
        public string? Longitude { get; set; }

    }
}
