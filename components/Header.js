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
  Button,
} from 'theme-ui';
import Link from 'next/link';
import { Icon } from '@makerdao/dai-ui-icons';
import MenuPopup from 'components/MenuPopup';

const LINKS = [
  { url: '/', name: 'Technology' },
  { url: '/', name: 'Modules' },
  { url: '/resources/guides/tutorials', name: 'Resources' },
  { url: '/community', name: 'Community' },
];

const NavLinks = ({ opened, setMobileOpened, setPopupState, query }) =>
  LINKS.map(({ name, url }) => (
    <>
      {opened ? (
        <Link href={{ pathname: url, query }} passHref key={url}>
          <>
            <NavLink
              sx={{ '&:last-child': { pr: [null, 0] } }}
              onClick={() => setMobileOpened(false)}
              variant="links.nav"
            >
              {name}
            </NavLink>
          </>
        </Link>
      ) : (
        <NavLink
          sx={{
            '&:last-child': { pr: [null, 0] },
          }}
          onClick={e => {
            const targetRect = e.target.getBoundingClientRect();
            setPopupState({
              name,
              show: true,
              left: targetRect.left - targetRect.width / 2,
              top: targetRect.bottom,
            });
          }}
          variant="links.nav"
        >
          {name}
        </NavLink>
      )}
    </>
  ));

const Header = ({ query }) => {
  const [opened, setMobileOpened] = useState(false);
  const [popupState, setPopupState] = useState({ show: false });
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
            <NavLinks {...{ opened, setMobileOpened, setPopupState, query }} />
            <MenuPopup setState={setPopupState} state={popupState} />
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
            onClick={() => setMobileOpened(!opened)}
          />
        </Flex>
      </Flex>
    </Container>
  );
};

export default Header;
