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
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Box className="max-w-3xl mx-auto gap-4 mt-12 mb-8 flex flex-col">
        <Link to="/plan" className="p-3 border-1 w-fit border-gray-300 rounded">
          <ArrowBackIosIcon /> Back to Search
        </Link>
        <h1 className="text-2xl font-bold">Dr. Alice Auburn</h1>
        <p>She, Her, Hers</p>
        <p>Orthopedic Surgeon</p>
        <p>New York, NY</p>
        <h2 className="font-bold">Health Plan Network (12)</h2>
        <Box className="flex flex-row gap-4 overflow-x-scroll">
          <Stack direction="row" spacing={2}>
            <Card className="p-4 my-2 w-3xs">Insurance 1</Card>
            <Card className="p-4 my-2 w-3xs">Insurance 2</Card>
            <Card className="p-4 my-2 w-3xs">Insurance 3</Card>
            <Card className="p-4 my-2 w-3xs">Insurance 4</Card>
            <Card className="p-4 my-2 w-3xs">Insurance 5</Card>
            <Card className="p-4 my-2 w-3xs">Insurance 6</Card>
            <Card className="p-4 my-2 w-3xs">Insurance 7</Card>
            <Card className="p-4 my-2 w-3xs">Insurance 8</Card>
            <Card className="p-4 my-2 w-3xs">Insurance 9</Card>
            <Card className="p-4 my-2 w-3xs">Insurance 10</Card>
            <Card className="p-4 my-2 w-3xs">Insurance 11</Card>
            <Card className="p-4 my-2 w-3xs">Insurance 12</Card>
          </Stack>
        </Box>
        <h2 className="font-bold">Contact Information</h2>
        <p>
          <PublicIcon /> DocAuburnCare.com
        </p>
        <p>
          <a href="mailto:docauburncare@nypresbyterianhospital.com">
            <EmailOutlinedIcon /> DocAuburnCare@nypresbyterianhospital.com
          </a>
        </p>
        <h2 className="font-bold">Public Notice (0)</h2>
        <Card className="p-4 my-2">No known concerns to the public</Card>
        <h2 className="font-bold">Where to find this provider</h2>
        <Card className="p-4 my-2">
          <p>Primary Location</p>
          <p>
            <RoomOutlinedIcon /> New York Presbyterian Hospital
          </p>
          <p>123 Main St, New York, NY 10001</p>
          <p>(123) 456-7890</p>
          <p>Office Hours</p>
          <p>Monday - Friday: 9am - 5pm</p>
          <p>Saturday - Sunday: Closed</p>
          <Chip
            label="Accessible Facility"
            icon={<AccessibleForwardOutlinedIcon />}
          />
        </Card>
        <Card className="p-4 my-2">
          <p>Secondary Location</p>
          <p>
            <RoomOutlinedIcon /> Mount Sinai Hospital
          </p>
          <p>456 Elm St, New York, NY 10002</p>
          <p>(987) 654-3210</p>
          <p>Office Hours</p>
          <p>Monday - Friday: 9am - 5pm</p>
          <p>Saturday - Sunday: Closed</p>
          <Chip
            label="Accessible Facility"
            icon={<AccessibleForwardOutlinedIcon />}
          />
        </Card>
        <Accordion>
          <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
            <h2 className="text-lg font-bold">Professional Credentials (4)</h2>
          </AccordionSummary>
          <AccordionDetails>
            <p>Professional credentials will go here.</p>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
            <h2 className="text-lg font-bold">Specialty (2)</h2>
          </AccordionSummary>
          <AccordionDetails>
            <p>Specialty details will go here.</p>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
            <h2 className="text-lg font-bold">
              Language and Accessibility (2)
            </h2>
          </AccordionSummary>
          <AccordionDetails>
            <p>Language and accessibility details will go here.</p>
          </AccordionDetails>
        </Accordion>
        <Card className="p-4 my-2">NPI Number</Card>
      </Box>
    </Suspense>
  );
}
