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

const MobileMenu = ({ close, query }) => {
  return (
    <Container mt={2} sx={{ bg: 'background', width: '100vw', height: '100vh', position: 'fixed' }}>
      <Flex sx={{ justifyContent: 'space-between', mb: [0, 3] }}>
        <Link href="/" passHref>
          <ThemeLink>
            <Icon name="maker" color="text" size={4} />
          </ThemeLink>
        </Link>
        <IconButton>
          <Icon
            name={'dp_close'}
            size="auto"
            color="text"
            sx={{
              display: ['block', 'none'],
              cursor: 'pointer',
              position: 'relative',
              zIndex: 1,
              height: 20,
              width: 20,
            }}
            onClick={close}
          />
        </IconButton>
      </Flex>
      <Flex sx={{ flexDirection: 'column', alignItems: 'center' }}>
        {LINKS.map(({ name, url }) => (
          <Link href={{ pathname: url, query }} passHref key={name}>
            <NavLink
              key={name}
              sx={{
                fontSize: 6,
                fontWeight: 'bold',
                py: 4,
              }}
              variant="links.nav"
            >
              {name}
            </NavLink>
          </Link>
        ))}
      </Flex>
    </Container>
  );
};

const Header = ({ query, subnav }) => {
  const [mobileOpened, setMobileOpened] = useState(false);
  return (
    <>
      {mobileOpened ? (
        <MobileMenu close={() => setMobileOpened(false)} />
      ) : (
        <Container as="header" mt={2}>
          <Flex
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: [0, 3],
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
                {LINKS.map(({ name, url }) => (
                  <Link href={{ pathname: url, query }} passHref key={name}>
                    <NavLink
                      key={name}
                      sx={{
                        display: ['none', 'block'], //TODO don't need this
                        pr: 4,
                        '&:last-child': { pr: [null, 0] },
                      }}
                      variant="links.nav"
                    >
                      {name}
                    </NavLink>
                  </Link>
                ))}
                <ColorModeToggle />
              </Flex>
              <IconButton>
                <Icon
                  name="dp_menu"
                  size="auto"
                  color="text"
                  sx={{
                    display: ['block', 'none'],
                    cursor: 'pointer',
                    position: 'relative',
                    height: 24,
                    width: 19,
                  }}
                  onClick={() => setMobileOpened(!mobileOpened)}
                />
              </IconButton>
            </Flex>
          </Flex>
        </Container>
      )}
      {subnav ?? null}
    </>
  );
};

export default Header;
