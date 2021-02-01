/** @jsx jsx */
import { useState } from 'react';
import {
  Container,
  jsx,
  Link as ThemeLink,
  NavLink,
  Flex,
  Text,
  Card,
  Grid,
  useColorMode,
  Button,
  IconButton,
  Input,
  Box,
} from 'theme-ui';
import Link from 'next/link';
import { Icon } from '@makerdao/dai-ui-icons';
import { Fragment } from 'react';

const ColorModeToggle = (props) => {
  const [mode, setMode] = useColorMode();
  return (
    <Icon
      name={'moon'}
      color="text"
      size={3}
      onClick={(e) => {
        const next = mode === 'dark' ? 'light' : 'dark';
        setMode(next);
      }}
    />
  );
};

const LINKS = [
  { url: '/documentation', name: 'Documentation' },
  { url: '/guides', name: 'Guides' },
  { url: '/security', name: 'Security' },
];

const NavLinks = ({ query }) =>
  LINKS.map(({ name, url }) => (
    <Link href={{ pathname: url, query }} passHref key={name}>
      <NavLink
        key={name}
        sx={{
          pr: 4,
          '&:last-child': { pr: [null, 0] },
        }}
        variant="links.nav"
      >
        {name}
      </NavLink>
    </Link>
  ));

const Header = ({ query, subnav }) => {
  const [mobileOpened, setMobileOpened] = useState(false);
  return (
    <>
      <Container
        as="header"
        sx={{ position: [mobileOpened ? 'fixed' : 'initial', 'initial'] }}
        mt={2}
      >
        <Flex
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3,
          }}
        >
          <Link href="/" passHref>
            <ThemeLink>
              <Icon name="maker" color="text" size={4} />
            </ThemeLink>
          </Link>
          <Flex sx={{ alignItems: 'center' }}>
            <Flex
              as="nav"
              sx={{
                alignItems: 'center',
              }}
            >
              <NavLinks {...{ mobileOpened, setMobileOpened, query }} />
              <ColorModeToggle />
            </Flex>
            <Icon
              name={mobileOpened ? 'close' : 'menu'}
              size={4}
              color="text"
              sx={{
                display: ['block', 'none'],
                cursor: 'pointer',
                position: 'relative',
                zIndex: 1,
              }}
              onClick={() => setMobileOpened(!mobileOpened)}
            />
          </Flex>
        </Flex>
      </Container>
      {subnav ?? null}
    </>
  );
};

export default Header;
