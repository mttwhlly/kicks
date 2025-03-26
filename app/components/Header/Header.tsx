import * as React from 'react';
import { AppBar, Slide, Toolbar, useScrollTrigger } from '@mui/material';
import { Link } from 'react-router';
import Logo from '../../assets/caqh-logo.svg?react';

interface Props {
  window?: () => Window;
  children?: React.ReactElement<unknown>;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children ?? <div />}
    </Slide>
  );
}

export default function Header() {
  return (
    <HideOnScroll>
      <AppBar

        className="bg-transparent text-black text-lg font-bold shadow-none"
      >
        <Toolbar>
          <Link
            to="/"
            className="text-black no-underline flex flex-row items-center leading-0"
            viewTransition
          >
            <Logo className="h-[1rem] w-[78px]" />
            <span className="text-[1rem] ml-2 pt-0.5">NOVA</span>
          </Link>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}
