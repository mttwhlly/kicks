using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nova.Domain.Entities;

/// <summary>
/// Entity for State using caqh_stateBase table
/// </summary>
public class State
{
    /// <summary>
    /// State Id Guid from caqh_stateId
    /// </summary>
    public Guid StateId { get; set; }

    /// <summary>
    /// State Name, full name for states
    /// </summary>
    public string StateName { get; set; }

    /// <summary>
    /// State Code like FL, PA etc
    /// </summary>
    public string StateCode { get; set; }
}
