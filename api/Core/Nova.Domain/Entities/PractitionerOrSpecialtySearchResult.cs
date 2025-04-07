using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nova.Domain.Entities;

public class PractitionerOrSpecialtySearchResult
{
    /// <summary>
    /// Id of the Practitioner or Specialty
    /// </summary>
    public Guid Id { get; set; }
    public string Name { get; set; }

    /// <summary>
    /// Type could be Specialty or Practitioner
    /// </summary>
    public string Type { get; set; }
}
