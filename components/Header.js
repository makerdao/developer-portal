/** @jsx jsx */
import { useState } from 'react';
import { Container, jsx, Link as ThemeLink, NavLink, Flex } from 'theme-ui';
import Link from 'next/link';
import { Icon } from '@makerdao/dai-ui-icons';
import AccountConnect from './AccountConnect';

const LINKS = [
  { url: '/', name: 'Home' },
  { url: '/tutorials', name: 'Tutorials' },
  { url: '/about', name: 'About' },
];

const NavLinks = ({ setOpened, query }) =>
  LINKS.map(({ url, name }) => (
    <Link href={{ pathname: url, query }} passHref key={url}>
      <NavLink
        sx={{ '&:last-child': { pr: [null, 0] } }}
        onClick={() => setOpened(false)}
        variant="links.nav"
      >
        {name}
      </NavLink>
    </Link>
  ));

const Header = ({ query }) => {
  const [opened, setOpened] = useState(false);
  return (
    <Container
      as="header"
      sx={{ position: [opened ? 'fixed' : 'initial', 'initial'] }}
      mt={2}
    >
      <Flex
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: [2, 4],
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
              display: [opened ? 'flex' : 'none', 'flex'],
              ...(opened && {
                position: ['fixed', 'initial'],
                top: ['0', 'initial'],
                bottom: ['0', 'initial'],
                left: ['0', 'initial'],
                right: ['0', 'initial'],
                bg: ['surface', 'initial'],
                alignItems: ['center', 'initial'],
                justifyContent: ['flex-start', 'initial'],
                flexDirection: ['column', 'initial'],
                pt: [6, 'initial'],
              }),
            }}
          >
            <NavLinks {...{ setOpened, query }} />
            <NavLink
              href="https://github.com/makerdao/nextjs-daijs-dai-ui-example"
              target="_blank"
              sx={{
                pr: [0, 3],
                pl: [0, 2],
              }}
            >
              GitHub
            </NavLink>
          </Flex>
          <Icon
            name={opened ? 'close' : 'menu'}
            size={4}
            color="text"
            sx={{
              display: ['block', 'none'],
              cursor: 'pointer',
              position: 'relative',
              zIndex: 1,
            }}
            onClick={() => setOpened(!opened)}
          />
          <Flex sx={{ order: [-1, 0] }}>
            <AccountConnect />
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Header;
