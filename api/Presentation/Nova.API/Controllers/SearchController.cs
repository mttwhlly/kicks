using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Nova.API.Models.Search;
using Nova.Application.Repository;
using System.Threading;

namespace Nova.API.Controllers
{
    [Route("api/search")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly IBaseRepository _novaRepository;

        public SearchController(IBaseRepository baseRepository)
        {
            _novaRepository = baseRepository;
        }

        [HttpGet]
        [Route("practitionerorspecialty")]
        public async Task<IActionResult> GetSearchPractitionersOrSpecialties(string searchString, CancellationToken cancellationToken)
        {
            var result = await _novaRepository.GetPractitionerOrSpecialtyTypeaheadResultsAsync(searchString, cancellationToken);
            if (result.IsSuccess)
            {
                if (result.Value != null)
                {
                    return Ok(result.Value);
                }
            }

            return BadRequest(result.Error);
        }

        [HttpGet]
        [Route("po")]
        public async Task<IActionResult> GetSearchParticipantingOrganizations(string searchString, Guid? stateId, CancellationToken cancellationToken)
        {
            var result = await _novaRepository.GetParticipatingOrganizationsTypeaheadResultsAsync(searchString, stateId, cancellationToken);
            if (result.IsSuccess)
            {
                if (result.Value != null)
                {
                    return Ok(result.Value);
                }
            }

            return BadRequest(result.Error);
        }

        [HttpPost]
        public List<Specialty> PostSearchPractitioner(string specialtyOrPractitioner, string state, string participantingOrganization)
        {
            var specialites = new List<Specialty>();
            return specialites;
        }

        [HttpPost]
        [Route("po")]
        public async Task<IActionResult> PostSearchParticipatingOrganizations(Guid? practitionerGuid, Guid? specialtyGuid, Guid? stateGuid, CancellationToken cancellationToken)
        {
            var result = await _novaRepository.GetParticipatingOrganizationsSearchResultAsync(practitionerGuid, specialtyGuid, stateGuid, cancellationToken);
            if (result.IsSuccess)
            {
                if (result.Value != null)
                {
                    return Ok(result.Value);
                }
            }

            return BadRequest(result.Error);
        }

        [HttpGet]
        [Route("states")]
        public async Task<IActionResult> GetAllStatesAsync(CancellationToken cancellationToken)
        {
            var result = await _novaRepository.GetAllStatesAsync(cancellationToken);
            if (result.IsSuccess)
            {
                if (result.Value != null)
                {
                    return Ok(result.Value);
                }
            }

            return BadRequest(result.Error);
        }

        [HttpGet]
        [Route("providertype")]
        public async Task<IActionResult> GetAllProviderTypesAsync(CancellationToken cancellationToken)
        {
            var result = await _novaRepository.GetAllProviderTypesAsync(cancellationToken);
            if (result.IsSuccess)
            {
                if (result.Value != null)
                {
                    return Ok(result.Value);
                }
            }

            return BadRequest(result.Error);
        }
    }
}
