import { Box, Link, Typography } from '@mui/material';

export function Footer() {
  return (
    <Box
      component="footer"
      className="w-full py-6 px-8 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} NOVA Provider Directory
        </Typography>
        <Box className="flex space-x-4 mt-2 md:mt-0">
          <Link href="#" color="text.secondary">
            Terms of Service
          </Link>
          <Link href="#" color="text.secondary">
            Privacy Policy
          </Link>
          <Link href="#" color="text.secondary">
            Contact
          </Link>
        </Box>
      </div>
    </Box>
  );
}
