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
  Input,
  Box,
} from 'theme-ui';
import Link from 'next/link';
import { Icon } from '@makerdao/dai-ui-icons';
import { Fragment } from 'react';

const LINKS = [
  { url: '/technology', name: 'Technology' },
  { url: '/governance', name: 'Modules' },
  { url: '/resources', name: 'Resources', type: 'menu', popup: true },
  { url: '/', name: 'Community' },
];

const NavLinks = ({ mobileOpened, setMobileOpened, setPopupState, query }) =>
  LINKS.map(({ name, url, type, popup }) => (
    <Fragment key={name}>
      {type === 'menu' ? (
        mobileOpened ? null : (
          <Text
            key={name}
            variant="links.nav"
            onMouseEnter={
              popup &&
              ((e) => {
                const targetRect = e.target.getBoundingClientRect();
                setPopupState({
                  name,
                  show: true,
                  left: targetRect.left - targetRect.width / 2,
                  top: targetRect.bottom,
                });
              })
            }
          >
            {name}
          </Text>
        )
      ) : (
        <Link href={{ pathname: url, query }} passHref key={name}>
          {mobileOpened ? (
            <NavLink
              sx={{ '&:last-child': { pr: [null, 0] } }}
              onClick={() => setMobileOpened(false)}
              variant="links.nav"
            >
              {name}
            </NavLink>
          ) : (
            <NavLink
              key={name}
              sx={{
                '&:last-child': { pr: [null, 0] },
              }}
              onMouseEnter={
                popup &&
                ((e) => {
                  const targetRect = e.target.getBoundingClientRect();
                  setPopupState({
                    name,
                    show: true,
                    left: targetRect.left - targetRect.width / 2,
                    top: targetRect.bottom,
                  });
                })
              }
              variant="links.nav"
            >
              {name}
            </NavLink>
          )}
        </Link>
      )}
    </Fragment>
  ));

const Header = ({ query, subnav }) => {
  const [mobileOpened, setMobileOpened] = useState(false);
  const [popupState, setPopupState] = useState({ show: false });
  const { show, left, top, name } = popupState;
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
                display: [mobileOpened ? 'flex' : 'none', 'flex'],
                ...(mobileOpened && {
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
              <NavLinks {...{ mobileOpened, setMobileOpened, setPopupState, query }} />
              {/* <MenuPopup setState={setPopupState} show={show} left={left} top={top} name={name} /> */}
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
