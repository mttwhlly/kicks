import { Box } from '@mui/material';

export default function Footer() {
  return (
    <Box className="w-full py-10 bg-white p-8 flex text-sm text-center justify-center">
      &copy; {new Date().getFullYear()} CAQH
    </Box>
  );
}
