using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nova.Domain.Entities;

public class ParticipatingOrganizationDetails
{
    public Guid RosterId { get; set; }
    public Guid PracticeLocationId { get; set; }
    public Guid ParticipatingOrganizationId { get; set; }
    public Guid PractitionerId { get; set; }
    public string PracticeLocationName { get; set; }
    public int AcceptNewPatients { get; set; }
    public string AddressLine1 { get; set; }
    public string AddressLine2 { get; set; }

    public string City { get; set; }
    public string State { get; set; }
    public string OfficeType { get; set; }
    public string Zip { get; set; }
    public string OfficePhoneNumber { get; set; }
    public string OfficePhoneExtension { get; set; }
    public string OfficeFaxNumber { get; set; }

    public decimal Latitude { get; set; }
    public decimal Longitude { get; set; }

    public string FullName { get; set; }

    public string FirstName { get; set; }
    public string LastName { get; set; }

    public Guid ProviderTypeId { get; set; }
    public string ProviderTypeIdName { get; set; }

    public int StateCode { get; set; }
    public int ProviderCount { get; set; }
    public int LocationCount { get; set; }
}
