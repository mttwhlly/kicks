using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nova.Domain.Entities
{
    public class Practitioner
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string MiddleName { get; set; } = null!;
        public string Title { get; set; } = null!;
        public string PrimarySpecialty { get; set; } = null!;
        public string PrimaryState { get; set; } = null!;
        public string? NationalProviderId { get; set; }

    }
}
