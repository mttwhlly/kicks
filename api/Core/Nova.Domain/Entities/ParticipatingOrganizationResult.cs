using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nova.Domain.Entities;

public class ParticipatingOrganizationResult
{
    public Guid ParticipatingOrganizationId { get; set; }
    public string ParticipatingOrganizationName { get; set; }
    public int TotalProviderCount{ get; set; }
    public int TotalLocationCount { get; set; }

    public List<ParticipatingOrganizationDetails> ParticipatingOrganizationDetails { get; set; }
}
