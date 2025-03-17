import { AppBar, Box, Toolbar } from '@mui/material';
import { Link } from 'react-router';
import Logo from '../../assets/caqh-logo.svg?react';

export default function Header() {
  return (
    <AppBar
      position="static"
      className="bg-white text-black text-lg font-bold shadow-none"
    >
      <Toolbar>
        <Link
          to="/"
          className="text-black no-underline flex flex-row items-center leading-0"
        >
          <Logo className="h-[1rem] w-[78px]" />
          <span className="text-[1.25rem] font-medium ml-2">NOVA</span>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
