import { Box } from '@mui/material';
import { useLocation } from 'react-router';

export default function Footer() {
  const location = useLocation();
  return (
    <Box className="w-full py-10 bg-neutral-100 mt-10 flex items-center justify-center text-sm">
      &copy; {new Date().getFullYear()} CAQH
    </Box>
  );
}
