using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Nova.Application.Repository;
using Nova.Domain.Entities;

namespace Nova.API.Controllers
{
    [Route("api/nova")]
    [ApiController]
    public class NovaController : ControllerBase
    {
        private IBaseRepository _novaRepository;

        public NovaController(IBaseRepository novaRepository)
        {
            _novaRepository = novaRepository;
        }

        [HttpGet]
        [Route("practitioner")]
        public async Task<IActionResult> Get_PractitionerAsync(string practitionerID, CancellationToken cancellationToken)
        {
            var practitioner = await _novaRepository.GetPractitionerAsync(Guid.Parse(practitionerID), cancellationToken);
            if (practitioner.IsSuccess)
            {
                if (practitioner.Value != null)
                {
                    return Ok(practitioner.Value);
                }
            }

            return BadRequest(practitioner.Error);
        }

        [HttpGet]
        [Route("language")]
        public async Task<IActionResult> Get_PractitionerLanguagesAsync(string practitionerID, CancellationToken cancellationToken)
        {
            var languages = await _novaRepository.GetPractitionerLanguagesAsync(Guid.Parse(practitionerID), cancellationToken);
            if (languages.IsSuccess)
            {
                if (languages.Value != null)
                {
                    return Ok(languages.Value);
                }
            }

            return BadRequest(languages.Error);
        }
        [HttpGet]
        [Route("po")]
        public async Task<IActionResult> Get_PractitionerParticipatingOrganizationsAsync(string practitionerID, CancellationToken cancellationToken)
        {
            var rosteredByPO = await _novaRepository.GetPractitionerParticipatingOrganizationsAsync(Guid.Parse(practitionerID), cancellationToken);
            if (rosteredByPO.IsSuccess)
            {
                if (rosteredByPO.Value != null)
                {
                    return Ok(rosteredByPO.Value);
                }
            }

            return BadRequest(rosteredByPO.Error);
        }

        [HttpGet]
        [Route("location")]
        public async Task<IActionResult> Get_PractitionerPracticeLocationsAsync(string practitionerID, CancellationToken cancellationToken)
        {
            var practiceLocations = await _novaRepository.GetPractitionerPracticeLocationsAsync(Guid.Parse(practitionerID), cancellationToken);
            if (practiceLocations.IsSuccess)
            {
                if (practiceLocations.Value != null)
                {
                    return Ok(practiceLocations.Value);
                }
            }

            return BadRequest(practiceLocations.Error);
        }

        [HttpGet]
        [Route("specialty")]
        public async Task<IActionResult> Get_PractitionerSpecialtiesAsync(string practitionerID, CancellationToken cancellationToken)
        {
            var specialties = await _novaRepository.GetPractitionerSpecialtiesAsync(Guid.Parse(practitionerID), cancellationToken);
            if (specialties.IsSuccess)
            {
                if (specialties.Value != null)
                {
                    return Ok(specialties.Value);
                }
            }

            return BadRequest(specialties.Error);
        }

        [HttpGet]
        [Route("{participatingOrganizationId}/providersandlocations")]
        public async Task<IActionResult> GetProvidersAndLocationsForPOAsync([FromRoute] Guid participatingOrganizationId, CancellationToken cancellationToken)
        {
            try
            {
                var result = await _novaRepository.GetProvidersAndLocationsForPOAsync(participatingOrganizationId, cancellationToken);
                return Ok(result);

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);

            }
        }

    }
}
