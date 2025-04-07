using Nova.Application.Results;
using Nova.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Nova.Application.Repository
{
    public interface IBaseRepository
    {
        Task<Result<Practitioner>> GetPractitionerAsync(Guid practitionerGuid, CancellationToken cancellationToken);
        Task<Result<IReadOnlyList<Specialty>>> GetPractitionerSpecialtiesAsync(Guid practitionerGuid, CancellationToken cancellationToken);
        Task<Result<IReadOnlyList<Language>>> GetPractitionerLanguagesAsync(Guid practitionerGuid, CancellationToken cancellationToken);
        Task<Result<IReadOnlyList<PracticeLocation>>> GetPractitionerPracticeLocationsAsync(Guid practitionerGuid, CancellationToken cancellationToken);
        Task<Result<IReadOnlyList<ParticipatingOrganization>>> GetPractitionerParticipatingOrganizationsAsync(Guid practitionerGuid, CancellationToken cancellationToken);
        Task<Result<IReadOnlyList<PractitionerOrSpecialtySearchResult>>> GetPractitionerOrSpecialtyTypeaheadResultsAsync(string searchTerm, CancellationToken cancellationToken);
        Task<Result<IReadOnlyList<ParticipatingOrganizationSearchResult>>> GetParticipatingOrganizationsTypeaheadResultsAsync(string searchTerm, Guid? stateId,  CancellationToken cancellationToken);
        Task<Result<IReadOnlyList<State>>> GetAllStatesAsync(CancellationToken cancellationToken);
        Task<Result<IReadOnlyList<ParticipatingOrganization>>> GetParticipatingOrganizationsSearchResultAsync(Guid? practitionerGuid, Guid? specialtyGuid, Guid? StateId, CancellationToken cancellationToken);
        Task<ParticipatingOrganizationResult> GetProvidersAndLocationsForPOAsync(Guid participatingOrganizationId, CancellationToken cancellationToken);
        Task<Result<IReadOnlyList<ProviderType>>> GetAllProviderTypesAsync(CancellationToken cancellationToken);
    }
}
