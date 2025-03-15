import { AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router';

export default function Header() {
  return (
    <AppBar
      position="static"
      className="bg-white text-black text-lg font-bold shadow-none"
    >
      <Toolbar>
        <Link to="/" className="text-black no-underline">
          CAQH
        </Link>
      </Toolbar>
    </AppBar>
  );
}
