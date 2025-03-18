import { Suspense } from 'react';
import { Link } from 'react-router';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  Chip,
  Stack,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PublicIcon from '@mui/icons-material/Public';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import AccessibleForwardOutlinedIcon from '@mui/icons-material/AccessibleForwardOutlined';

export default function Profile() {
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
      email: 'mailto:docauburncare@nypresbyterianhospital.com',
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
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Box className="max-w-3xl mx-auto gap-4 mt-12 mb-8 flex flex-col">
        <Link to="/plan" className="p-3 border-1 w-fit border-gray-300 rounded">
          <ArrowBackIosIcon /> Back to Search
        </Link>
        <h1 className="text-4xl font-bold">{data.name}</h1>
        <p>{data.pronouns}</p>
        <p>{data.primarySpecialty}</p>
        <p>
          {data.locations
            .filter(
              (location) => location.type.toLowerCase() === 'primary location'
            )
            .map((location) => location.city + ', ' + location.state)}
        </p>
        <h2 className="text-xl font-bold">{`Health Plan Network (${data.healthPlanNetwork.count})`}</h2>
        <Box className="flex flex-row gap-4 overflow-x-scroll">
          <Stack direction="row" spacing={2}>
            {data.healthPlanNetwork.plans.map((plan) => (
              <Card className="p-4 my-2 w-3xs">{plan}</Card>
            ))}
          </Stack>
        </Box>
        <h2 className="text-xl font-bold">Contact Information</h2>
        <p>
          <PublicIcon /> {data.contactInfo.website}
        </p>
        <p>
          <a href={data.contactInfo.email}>
            <EmailOutlinedIcon /> {data.contactInfo.email}
          </a>
        </p>
        <h2 className="text-xl font-bold">
          Public Notice ({data.publicNotice.length})
        </h2>
        <Card className="p-4 my-2">
          {data.publicNotice.length > 0
            ? 'Some concerns here...'
            : 'No known concerns to the public'}
        </Card>
        <h2 className="text-xl font-bold">Where to find this provider</h2>
        {data.locations
          .filter(
            (location) => location.type.toLowerCase() === 'primary location'
          )
          .map((location) => (
            <Card className="p-4 my-2">
              <h3 className="font-bold mb-2">Primary Location</h3>
              <p>
                <RoomOutlinedIcon /> {location.name}
              </p>
              <p>{location.address}</p>
              <p>{location.phone}</p>
              <p>Office Hours</p>
              <p>{location.hours}</p>
              {location.accessibility && (
                <Chip
                  className="mt-2"
                  label="Accessible Facility"
                  icon={<AccessibleForwardOutlinedIcon />}
                />
              )}
            </Card>
          ))}
        {data.locations
          .filter(
            (location) => location.type.toLowerCase() === 'secondary location'
          )
          .map((location) => (
            <Card className="p-4 my-2">
              <h3 className="font-bold mb-2">Secondary Location</h3>
              <p>
                <RoomOutlinedIcon /> {location.name}
              </p>
              <p>{location.address}</p>
              <p>{location.phone}</p>
              <p>Office Hours</p>
              <p>{location.hours}</p>
              {location.accessibility && (
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
              Specialty ({data.specialtyDetails.count})
            </h2>
          </AccordionSummary>
          <AccordionDetails>
            <p>{data.specialtyDetails.description}</p>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
            <h2 className="text-lg font-bold">
              Language and Accessibility ({data.languageAccessibility.count})
            </h2>
          </AccordionSummary>
          <AccordionDetails>
            <p>{data.languageAccessibility.description}</p>
          </AccordionDetails>
        </Accordion>
        <Card className="p-4 my-2">{data.npiNumber}</Card>
      </Box>
    </Suspense>
  );
}
