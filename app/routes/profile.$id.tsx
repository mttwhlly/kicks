import { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router';
import type { Route } from './+types/profile.$id';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  Chip,
  Stack,
} from '@mui/material';
import { ProfilePageSkeleton } from '~/components/Skeletons/Skeletons';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PublicIcon from '@mui/icons-material/Public';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import AccessibleForwardOutlinedIcon from '@mui/icons-material/AccessibleForwardOutlined';
import { formatPhoneNumber, formatZip } from '~/utils/formatters';

export async function clientLoader({
    params,
  }: Route.ClientLoaderArgs) {
    const practitionerApi = `http://localhost:5041/api/nova/practitioner?practitionerID=${params.id}`;
    const poApi = `http://localhost:5041/api/nova/po?practitionerID=${params.id}`;
    const locationApi = `http://localhost:5041/api/nova/location?practitionerID=${params.id}`;
    const specialtyApi = `http://localhost:5041/api/nova/specialty?practitionerID=${params.id}`;
    const languageApi = `http://localhost:5041/api/nova/language?practitionerID=${params.id}`;
  
    const fetchPromises = [
      fetch(practitionerApi),
      fetch(poApi),
      fetch(locationApi),
      fetch(specialtyApi),
      fetch(languageApi)
    ];
  
    try {
      const responses = await Promise.all(fetchPromises);
  
      const data = await Promise.all(responses.map(response => response.json()));
  
      const labeledData = {
        practitionerData: data[0],
        poData: data[1],
        locationData: data[2],
        specialtyData: data[3],
        languageData: data[4]
      };
  
      return labeledData;
  
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }

  }

export default function Practitioner({loaderData}:Route.ComponentProps){
    const navigate = useNavigate();
    const handleGoBack = () => {
      navigate(-1);
    };

    const [isLoading, setIsLoading] = useState(true);
    const [profileData, setProfileData] = useState(null);

    const {practitionerData, poData, locationData, specialtyData, languageData} = loaderData;
    const {firstName, middleName, lastName, primarySpecialty, primaryState, title} = practitionerData; 
    const primaryPracticeLocation = locationData.find(location => location.officeType === 'Primary Practice');
  
    useEffect(() => {
      const fetchData = async () => {
        await new Promise(resolve => setTimeout(resolve, 0));

        const data = {
            name: 'Dr. Alice Auburn',
            pronouns: 'She, Her, Hers',
            primarySpecialty: 'Orthopedic Surgeon',
            healthPlanNetwork: {
              count: 12,
              plans: [
                'Insurance 1',
                'Insurance 2',
                'Insurance 3',
                'Insurance 4',
                'Insurance 5',
                'Insurance 6',
                'Insurance 7',
                'Insurance 8',
                'Insurance 9',
                'Insurance 10',
                'Insurance 11',
                'Insurance 12',
              ],
            },
            contactInfo: {
              website: 'DocAuburnCare.com',
              email: 'docauburncare@nypresbyterianhospital.com',
            },
            publicNotice: [],
            locations: [
              {
                name: 'New York Presbyterian Hospital',
                address: '123 Main St',
                city: 'New York',
                state: 'NY',
                zip: '10001',
                phone: '(123) 456-7890',
                hours: 'Monday - Friday: 9am - 5pm\nSaturday - Sunday: Closed',
                accessibility: true,
                type: 'Primary Location',
              },
              {
                name: 'Mount Sinai Hospital',
                address: '456 Elm St',
                city: 'New York',
                state: 'NY',
                zip: '10002',
                phone: '(987) 654-3210',
                hours: 'Monday - Friday: 9am - 5pm\nSaturday - Sunday: Closed',
                accessibility: true,
                type: 'Secondary Location',
              },
            ],
            professionalCredentials: {
              count: 4,
              description: 'Professional credentials will go here.',
            },
            specialtyDetails: {
              count: 2,
              description: 'Specialty details will go here.',
            },
            languageAccessibility: {
              count: 2,
              description: 'Language and accessibility details will go here.',
            },
            npiNumber: 'NPI Number',
          };

          setProfileData(data);
          setIsLoading(false);
      }
      fetchData();
    }, [])

      if (isLoading) {
        return <ProfilePageSkeleton />
      }

      const data = profileData;
    return (
      <>
        <Box className='bg-neutral-100 pt-[60px]'>
          <Box className='max-w-3xl mx-auto gap-4 mt-12 py-8 flex flex-col'>
            <Box className='mb-8'>
                <Button className='text-black' onClick={handleGoBack}>
                  <ArrowBackIosIcon />Back
                </Button>
            </Box>
            <h1 className="text-4xl font-bold">{`${firstName} ${middleName} ${lastName} ${title}`}</h1>
            {/* <p>{data.pronouns}</p> */}
            <p>{primarySpecialty}</p>
            <p>
              {primaryState}
            </p>
          </Box>
        </Box>
        <Box className="max-w-3xl mx-auto gap-4 flex flex-col my-4">
        <h2 className="text-xl font-bold mt-4">{`Health Plan Network (${poData.length})`}</h2>
          <Box className="flex flex-row gap-4 overflow-x-scroll">
            <Stack direction="row" spacing={2}>
              {poData.map((po) => (
                <Card className="px-2 py-8 bg-neutral-100 rounded text-center hover:bg-neutral-200 transition-colors my-2 w-3xs font-semibold shadow-none"><Link to={`/organization/${po.id}/map`} viewTransition>{po.name}</Link></Card>
              ))}
            </Stack>
          </Box>
          <h2 className="text-xl font-bold mt-4">Contact Information</h2>
          <p>
            <PublicIcon /> <a href={`https://${data.contactInfo.website}`}>{data.contactInfo.website}</a>
          </p>
          <p>
            <EmailOutlinedIcon /> <a href={`mailto:${data.contactInfo.email}`}>{data.contactInfo.email}</a>
          </p>
          <h2 className="text-xl font-bold mt-8">
            Public Notice ({data.publicNotice.length})
          </h2>
          <Card className="p-4 my-2">
            {data.publicNotice.length > 0
              ? 'Some concerns here...'
              : 'No known concerns to the public'}
          </Card>
          <h2 className="text-xl font-bold mt-8">Where to find this provider</h2>

              <Card className="p-4 my-2">
                <h3 className="font-bold mb-2">Primary Location</h3>
                <p>
                  <RoomOutlinedIcon /> {primaryPracticeLocation.name}
                </p>
                <p>{primaryPracticeLocation.addressLine1}</p>
                <p>{primaryPracticeLocation.addressLine2}</p>
                <p>{primaryPracticeLocation.city}, {primaryPracticeLocation.state} {primaryPracticeLocation.zip}</p>
                <p>{formatPhoneNumber(primaryPracticeLocation.officePhoneNumber)}</p>
                {/* <p>Office Hours</p> */}
                {/* <p>{location.hours}</p> */}
                {primaryPracticeLocation.isAccessible && (
                  <Chip
                    className="mt-2"
                    label="Accessible Facility"
                    icon={<AccessibleForwardOutlinedIcon />}
                  />
                )}
              </Card>
    
          {locationData.filter(
              (location) => location.officeType.toLowerCase() !== 'primary practice'
            )
            .map((location) => (
              <Card className="p-4 my-2">
                <h3 className="font-bold mb-2">{location.officeType}</h3>
                <p>
                  <RoomOutlinedIcon /> {location.name}
                </p>
                {(location.addressLine1 && location.addressLine2 && location.city && location.state && location.zip) && (
                <>
                  <p>{location.addressLine1}</p>
                  <p>{location.addressLine2}</p>
                  <p>{location.city}, {location.state} {formatZip(location.zip)}</p>
                </>)}
                <p>{formatPhoneNumber(location.officePhoneNumber)}</p>
                {/* <p>Office Hours</p> */}
                {/* <p>{location.hours}</p> */}
                {location.isAccessible && (
                  <Chip
                    className="mt-2"
                    label="Accessible Facility"
                    icon={<AccessibleForwardOutlinedIcon />}
                  />
                )}
              </Card>
            ))}
          <Accordion>
            <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
              <h2 className="text-lg font-bold">
                Professional Credentials ({data.professionalCredentials.count})
              </h2>
            </AccordionSummary>
            <AccordionDetails>
              <p>{data.professionalCredentials.description}</p>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
              <h2 className="text-lg font-bold">
                Specialties ({specialtyData.filter(item => item.name !== "").length})
              </h2>
            </AccordionSummary>
            <AccordionDetails>
              {specialtyData.map((specialty) => {
                return <p key={specialty.id}>{specialty.name}</p>
              })}
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
              <h2 className="text-lg font-bold">
                Language and Accessibility ({languageData.length})
              </h2>
            </AccordionSummary>
            <AccordionDetails>
              {languageData.map((language) => {
                  return <p key={language.id}>{language.name} ({language.skillName})</p>
                })
              }
            </AccordionDetails>
          </Accordion>
          <Card className="p-4 my-2">{practitionerData.nationalProviderId ?? 'No National Provider Id (NPI) found'}</Card>
        </Box>
      </>

    )
}