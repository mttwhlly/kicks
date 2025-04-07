using Dapper;
using Microsoft.Data.SqlClient;
using Nova.Application.Repository;
using Nova.Application.Results;
using Nova.Domain.Entities;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Nova.Persistence.Dapper.Repository
{
    public class NovaRepository : IBaseRepository
    {
        private readonly IDbConnection _dbConnection;

        public NovaRepository(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public async Task<Result<IReadOnlyList<State>>> GetAllStatesAsync(CancellationToken cancellationToken)
        {
            try
            {

                var sql = @"select caqh_stateId StateId, caqh_StateName StateName, caqh_name StateCode from caqh_stateBase";
               
                var result = await _dbConnection.QueryAsync<State>(sql, null, commandType: CommandType.Text);
                return Result<IReadOnlyList<State>>.Success(result.ToList());
            }
            catch (SqlException err)
            {
                return Result<IReadOnlyList<State>>.Failure(err.Message);
            }
        }

        public async Task<Result<IReadOnlyList<ParticipatingOrganization>>> GetParticipatingOrganizationsSearchResultAsync(Guid? practitionerGuid, Guid? specialtyGuid, Guid? stateId, CancellationToken cancellationToken)
        {
            try
            {
                var sql = @"SELECT top 12 ac.accountid Id, name Name, accountnumber, caqh_StateId
	                        FROM dbo.Account ac with (nolock)
	                        WHERE ac.StateCode = 0 -- only active ones
	                        AND caqh_type = 290530000 -- 29053000 = Participating Organization
	                        AND accountnumber IS NOT NULL	
	                        AND (@stateId is null or caqh_StateId = @stateId)	
	                        AND (@providerId is null and @specialtyId is null or AccountId IN (	SELECT 
	                        caqh_organizationid
	                        FROM [dbo].caqh_roster r with (nolock)
							left join caqh_specialty sp with (nolock) on r.caqh_ProviderId = sp.caqh_ProviderId
	                        WHERE (@providerId is null or r.caqh_providerid = @providerId)
							and (@specialtyId is null or sp.caqh_specialtyId = @specialtyId)
	                        and r.statecode =0))";

                var parameters = new DynamicParameters();
                parameters.Add("@specialtyId", specialtyGuid, dbType: DbType.Guid);
                parameters.Add("@providerId", practitionerGuid, dbType: DbType.Guid);
                parameters.Add("@stateId", stateId, dbType: DbType.Guid);
                var languages = await _dbConnection.QueryAsync<ParticipatingOrganization>(sql, parameters, commandType: CommandType.Text);
                return Result<IReadOnlyList<ParticipatingOrganization>>.Success(languages.ToList());
            }
            catch (SqlException err)
            {
                return Result<IReadOnlyList<ParticipatingOrganization>>.Failure(err.Message);
            }
        }

        public async Task<Result<IReadOnlyList<ParticipatingOrganizationSearchResult>>> GetParticipatingOrganizationsTypeaheadResultsAsync(string searchTerm, Guid? stateId, CancellationToken cancellationToken)
        {
            try
            {

                var sql = @"SELECT Name as Name, caqh_StateId as StateId, AccountId as ParticipatingOrganizationId	
	                FROM  dbo.Account account
	                LEFT JOIN dbo.caqh_contract contract ON account.accountid = contract.caqh_OrganizationID
	                AND contract.statecode = 0 -- Active Records 
	                WHERE account.statecode = 0 -- Active Records  
	                and name like  @SearchString +'%' and (@StateId is null or caqh_StateId = @StateId)";

                var parameters = new DynamicParameters();
                parameters.Add("@SearchString", searchTerm, dbType: DbType.String);
                parameters.Add("@StateId", stateId, dbType: DbType.Guid);
                var languages = await _dbConnection.QueryAsync<ParticipatingOrganizationSearchResult>(sql, parameters, commandType: CommandType.Text);
                return Result<IReadOnlyList<ParticipatingOrganizationSearchResult>>.Success(languages.ToList());
            }
            catch (SqlException err)
            {
                return Result<IReadOnlyList<ParticipatingOrganizationSearchResult>>.Failure(err.Message);
            }
        }

        public async Task<Result<Practitioner>> GetPractitionerAsync(Guid practitionerGuid, CancellationToken cancellationToken)
        {
            try
            {
                var sql = @"select ContactID as Id,  FirstName, LastName, MiddleName, Suffix, caqh_ProviderTypeIdName as Title, spec.caqh_name as PrimarySpecialty, caqh_primarypracticestateidname as PrimaryState
                            from [dbo].Contact c WITH (NOLOCK)       
                            Left join [dbo].caqh_specialty spec WITH (NOLOCK)              
                             on c.contactid=spec.caqh_ProviderId  
                            where c.ContactId = @PractitionerGuid and spec.caqh_specialtytype=100000000 ";
                var parms = new DynamicParameters();
                parms.Add("PractitionerGUID", practitionerGuid, dbType: DbType.Guid);
                var practitioner = await _dbConnection.QueryFirstAsync<Practitioner>(sql, parms, commandType: CommandType.Text);
                return Result<Practitioner>.Success(practitioner);

            }
            catch (SqlException err)
            {
                return Result<Practitioner>.Failure(err.Message);
            }
        }

        public async Task<Result<IReadOnlyList<Language>>> GetPractitionerLanguagesAsync(Guid practitionerGuid, CancellationToken cancellationToken)
        {
            try
            {
                var sql = @"SELECT caqh_languageskillid as Id
	                        ,ISNULL(sm1.Value,'') as EmployeeType
	                        ,caqh_languageidname as Name
	                        ,ISNULL(sm2.Value, '') as SkillName
	
	                        FROM [dbo].caqh_languageskill ls  WITH (NOLOCK)
		                        LEFT OUTER JOIN [dbo].StringMap sm1  WITH (NOLOCK)
			                        on sm1.AttributeValue = ls.caqh_EmployeeType and sm1.AttributeName = 'caqh_employeetype'
		                        LEFT OUTER JOIN [dbo].StringMap sm2  WITH (NOLOCK)
			                        on sm2.AttributeValue = ls.caqh_SkillType and sm2.AttributeName = 'caqh_skilltype'
	                        WHERE caqh_providerid = @PractitionerGuid 
	                        AND caqh_practicelocationid IS NULL
	                        And statecode = 0 -- Active Records ";
                var parms = new DynamicParameters();
                parms.Add("PractitionerGUID", practitionerGuid, dbType: DbType.Guid);
                var languages = await _dbConnection.QueryAsync<Language>(sql, parms, commandType: CommandType.Text);
                return Result<IReadOnlyList<Language>>.Success(languages.ToList());

            }
            catch (SqlException err)
            {
                return Result<IReadOnlyList<Language>>.Failure(err.Message);
            }
        }

        public async Task<Result<IReadOnlyList<PractitionerOrSpecialtySearchResult>>> GetPractitionerOrSpecialtyTypeaheadResultsAsync(string searchTerm, CancellationToken cancellationToken)
        {
            try
            {
                var sql = @"SELECT top 10[caqh_specialtycodeId] as Id, 'Specialty' as Type,  [caqh_name] as Name
                FROM[dbo].caqh_specialtycodeBase
                WHERE[caqh_name] like @SearchString +'%' and statecode = 0
                GROUP BY[caqh_specialtycodeId], [caqh_name]
                UNION ALL
                SELECT top 10 contactId as Id, 'Practitioner' as Type, FirstName + ' ' + LastName as Name
                FROM[dbo].Contact
                where caqh_Username is not null and CustomerTypeCode = 100000000 AND LastName like @SearchString +'%'";
                var parms = new DynamicParameters();
                parms.Add("SearchString", searchTerm, dbType: DbType.String);
                var result = await _dbConnection.QueryAsync<PractitionerOrSpecialtySearchResult>(sql, parms, commandType: CommandType.Text);
                return Result<IReadOnlyList<PractitionerOrSpecialtySearchResult>>.Success(result.ToList());

            }
            catch (SqlException err)
            {
                return Result<IReadOnlyList<PractitionerOrSpecialtySearchResult>>.Failure(err.Message);
            }
        }

        public async Task<Result<IReadOnlyList<ParticipatingOrganization>>> GetPractitionerParticipatingOrganizationsAsync(Guid practitionerGuid, CancellationToken cancellationToken)
        {
            try
            {
                var sql = @"SELECT 
	                        caqh_organizationid  as Id
	                        ,caqh_organizationidname as Name
	                        FROM [dbo].caqh_roster
	                        WHERE caqh_providerid = @PractitionerGuid 
	                        and statecode =0 ";
                var parms = new DynamicParameters();
                parms.Add("PractitionerGUID", practitionerGuid, dbType: DbType.Guid);
                var languages = await _dbConnection.QueryAsync<ParticipatingOrganization>(sql, parms, commandType: CommandType.Text);
                return Result<IReadOnlyList<ParticipatingOrganization>>.Success(languages.ToList());

            }
            catch (SqlException err)
            {
                return Result<IReadOnlyList<ParticipatingOrganization>>.Failure(err.Message);
            }
        }

        public async Task<Result<IReadOnlyList<PracticeLocation>>> GetPractitionerPracticeLocationsAsync(Guid practitionerGuid, CancellationToken cancellationToken)
        {
            try
            {
                var sql = @"SELECT caqh_practicelocationid as Id
	            ,caqh_name as Name
	            ,caqh_doyouacceptnewpatientsintothepractice as AcceptNewPatients
	            ,caqh_street1address as AddressLine1
	            ,caqh_street2address as AddressLine2
	            ,caqh_cityaddress as City
	            ,caqh_stateidname as State
	            , smOfficeType.Value as OfficeType
	            ,caqh_zipcodeaddress as Zip
	            ,caqh_officephonenumber as OfficePhoneNumber
	            ,caqh_officephoneextention as OfficePhoneExtension
	            ,caqh_officefaxnumber as OfficeFaxNumber
	            --,caqh_mondaystarttime 
	            --,caqh_mondayendtime
	            --,caqh_tuesdaystarttime
	            --,caqh_tuesdayendtime
	            --,caqh_wednesdaystarttime
	            --,caqh_wednesdayendtime
	            --,caqh_thursdaystarttime
	            --,caqh_thursdayendtime
	            --,caqh_fridaystarttime
	            --,caqh_fridayendtime
	            --,caqh_saturdaystarttime
	            --,caqh_saturdayendtime
	            --,caqh_sundaystarttime
	            --,caqh_sundayendtime
	            ,caqh_doesofficemeetadaaccessibilityrequirement as ADAAccessible
	            ,caqh_standardized_Latitude as Latitude
	            ,caqh_Standardized_Longitude as Longitude
	            FROM [dbo].CAQH_PRACTICELOCATION pl WITH (NOLOCK)
		            LEFT OUTER JOIN [dbo].StringMap  smOfficeType WITH (NOLOCK)
			            on pl.caqh_OfficeType = smOfficeType.AttributeValue and AttributeName = 'caqh_officeType'
	            WHERE   statecode = 0 AND caqh_providerid= @PractitionerGuid AND ((caqh_officetype = '100000000' and caqh_currentlypracticinginthisaddress = '100000000')
	            OR (caqh_currentlypracticinginthisaddress = '100000000' and caqh_officetype != '100000000'))";
                var parms = new DynamicParameters();
                parms.Add("PractitionerGUID", practitionerGuid, dbType: DbType.Guid);
                var languages = await _dbConnection.QueryAsync<PracticeLocation>(sql, parms, commandType: CommandType.Text);
                return Result<IReadOnlyList<PracticeLocation>>.Success(languages.ToList());

            }
            catch (SqlException err)
            {
                return Result<IReadOnlyList<PracticeLocation>>.Failure(err.Message);
            }
        }

        public async Task<Result<IReadOnlyList<Specialty>>> GetPractitionerSpecialtiesAsync(Guid practitionerGuid, CancellationToken cancellationToken)
        {
            try
            {
                var sql = @"SELECT caqh_specialtyid as Id
	                ,specType.Value as Type
	                ,ISNULL(boardCert.Value, 'No') as BoardCertified
	                ,ISNULL(caqh_specialtynameidname, '') as Name
	                ,ISNULL(caqh_specialtyboardidname, '') as BoardName
	                FROM [dbo].CAQH_SPECIALTY s WITH (NOLOCK)
		                INNER JOIN [dbo].StringMap specType WITH (NOLOCK)
			                on specType.AttributeName ='caqh_specialtytype' and specType.AttributeValue = s.caqh_SpecialtyType
		                LEFT OUTER JOIN [dbo].StringMap boardCert WITH (NOLOCK)
			                on boardCert.AttributeName ='caqh_boardcertified' and boardCert.AttributeValue = s.caqh_boardcertified
	                WHERE caqh_providerid= @PractitionerGuid 
	                AND statecode = 0 -- Active Records ";
                var parms = new DynamicParameters();
                parms.Add("PractitionerGUID", practitionerGuid, dbType: DbType.Guid);
                var specialties = await _dbConnection.QueryAsync<Specialty>(sql, parms, commandType: CommandType.Text);
                return Result<IReadOnlyList<Specialty>>.Success(specialties.ToList());

            }
            catch (SqlException err)
            {
                return Result<IReadOnlyList<Specialty>>.Failure(err.Message);
            }
        }

        public async Task<ParticipatingOrganizationResult> GetProvidersAndLocationsForPOAsync(Guid participatingOrganizationId, CancellationToken cancellationToken)
        {
            try
            {
                var sql = @"
	                    SELECT caqh_rosterid RosterId,
                        caqh_practicelocationid as PracticeLocationId,
                        caqh_organizationid ParticipatingOrganizationId,
                        roster.caqh_providerid PractitionerId,	
                        pl.caqh_name as PracticeLocationName,
                        caqh_doyouacceptnewpatientsintothepractice as AcceptNewPatients,
                        caqh_street1address as AddressLine1,
                        caqh_street2address as AddressLine2,
                        caqh_cityaddress as City,
                        caqh_stateidname as State, 
                        smOfficeType.Value as OfficeType,
                        caqh_zipcodeaddress as Zip,
                        caqh_officephonenumber as OfficePhoneNumber,
                        caqh_officephoneextention as OfficePhoneExtension,
                        caqh_officefaxnumber as OfficeFaxNumber,
                        caqh_doesofficemeetadaaccessibilityrequirement as ADAAccessible,
                        caqh_standardized_Latitude as Latitude,
                        caqh_Standardized_Longitude as Longitude,
                        roster.caqh_ProviderIdName FullName,
                        contact.FirstName,
                        contact.LastName,
                        contact.caqh_ProviderTypeIdName ProviderTypeIdName,
                        contact.caqh_ProviderTypeId ProviderTypeId,
                        pl.StateCode
                        ,count(*) over (partition by roster.caqh_providerid ) as providerCount
                        ,count(*) over (partition by caqh_practicelocationid) as locationCount
                        FROM dbo.caqh_roster AS Roster WITH (nolock)
                        INNER JOIN dbo.Contact Contact WITH (nolock) ON Contact.contactid = Roster.caqh_providerid	
                        left outer join caqh_practicelocation pl WITH (nolock) on roster.caqh_ProviderId = pl.caqh_ProviderId
                        LEFT OUTER JOIN [dbo].StringMap  smOfficeType WITH (NOLOCK) on pl.caqh_OfficeType = smOfficeType.AttributeValue and AttributeName = 'caqh_officeType'
                        WHERE Roster.caqh_authorize = 100000000 -- 100000000 = Yes
                        AND Roster.statecode = 0 -- 0 = Active
                        AND Roster.caqh_provideranniversarydate IS NULL
                        AND Roster.caqh_organizationid = @ParticipatingOrganizationId
                        --AND (Contact.caqh_providerstatus = 100000007 OR Contact.caqh_providerstatus = 100000008) -- 100000007 =Initial Profile Complete & 100000008 = Re-Attestation
                        AND Contact.customertypecode = 100000000 -- 100000000 = Provider
                        AND caqh_standardized_Latitude is not null and caqh_Standardized_Longitude is not null
                        order by roster.caqh_ProviderId

                        select ParticipatingOrganizationId, ParticipatingOrganizationName,  sum(providerCount) TotalProviderCount, sum(locationCount) TotalLocationCount 
	                        FROM
	                        (SELECT caqh_organizationidname ParticipatingOrganizationName, caqh_organizationid ParticipatingOrganizationId,count(*) over (partition by roster.caqh_providerid ) as providerCount,count(*) over (partition by caqh_practicelocationid) as locationCount
	                        FROM dbo.caqh_roster AS Roster WITH (nolock)
	                        INNER JOIN dbo.Contact Contact WITH (nolock) ON Contact.contactid = Roster.caqh_providerid	
	                        left outer join caqh_practicelocation pl WITH (nolock) on roster.caqh_ProviderId = pl.caqh_ProviderId
	                        LEFT OUTER JOIN [dbo].StringMap  smOfficeType WITH (NOLOCK) on pl.caqh_OfficeType = smOfficeType.AttributeValue and AttributeName = 'caqh_officeType'
	                        WHERE Roster.caqh_authorize = 100000000 -- 100000000 = Yes
	                        AND Roster.statecode = 0 -- 0 = Active
	                        AND Roster.caqh_provideranniversarydate IS NULL
	                        AND Roster.caqh_organizationid = @ParticipatingOrganizationId
	                        --AND (Contact.caqh_providerstatus = 100000007 OR Contact.caqh_providerstatus = 100000008) -- 100000007 =Initial Profile Complete & 100000008 = Re-Attestation
	                        AND Contact.customertypecode = 100000000 -- 100000000 = Provider
	                        And caqh_standardized_Latitude is not null and caqh_Standardized_Longitude is not null) subquery
                        group by subquery.ParticipatingOrganizationId, subquery.ParticipatingOrganizationName";
                var parms = new DynamicParameters();
                parms.Add("@ParticipatingOrganizationId", participatingOrganizationId, dbType: DbType.Guid);
                var result = await _dbConnection.QueryMultipleAsync(sql, parms, commandType: CommandType.Text);
                var result1 = await result.ReadAsync<ParticipatingOrganizationDetails>();
                var result2 = await result.ReadFirstAsync<ParticipatingOrganizationResult>();
                result2.ParticipatingOrganizationDetails = result1.ToList();

                return result2;
            }
            catch (SqlException err)
            {
                throw;
            }
        }

        public async Task<Result<IReadOnlyList<ProviderType>>> GetAllProviderTypesAsync(CancellationToken cancellationToken)
        {
            try
            {
                var sql = @"SELECT [caqh_providertypeId] as ProviderTypeID
                          ,[caqh_name] as Code
                          ,[caqh_Description] as Description
                      FROM [dbo].[caqh_providertypeBase]
                      where statecode =0 ";
                
                var types = await _dbConnection.QueryAsync<ProviderType>(sql,commandType: CommandType.Text);
                return Result<IReadOnlyList<ProviderType>>.Success(types.ToList());

            }
            catch (SqlException err)
            {
                return Result<IReadOnlyList<ProviderType>>.Failure(err.Message);
            }
        }

    }
}
