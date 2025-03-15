import { Suspense } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function Profile() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Box className="max-w-3xl mx-auto gap-4 mt-12 mb-8 flex flex-col">
        <Accordion>
          <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
            <h2 className="text-lg font-bold">Professional Credentials</h2>
          </AccordionSummary>
          <AccordionDetails>
            <p>Professional credentials will go here.</p>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
            <h2 className="text-lg font-bold">Specialty</h2>
          </AccordionSummary>
          <AccordionDetails>
            <p>Specialty details will go here.</p>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
            <h2 className="text-lg font-bold">Language and Accessibility</h2>
          </AccordionSummary>
          <AccordionDetails>
            <p>Language and accessibility details will go here.</p>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Suspense>
  );
}
