using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nova.Domain.Entities;

public class ParticipatingOrganizationSearchResult
{
    public string Name { get; set; }
    public Guid StateId { get; set; }

    /// <summary>
    /// TODO: Make sure whatever id we set here we can use it for loading practicipating organization
    /// </summary>
    public Guid ParticipatingOrganizationId { get; set; }
}
