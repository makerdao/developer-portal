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
import MenuPopup from 'components/MenuPopup';

const NavLinks = ({
  mobileOpened,
  setMobileOpened,
  setPopupState,
  links,
  query,
}) =>
  links.map(({ name, url, popup }) => (
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
          sx={{
            '&:last-child': { pr: [null, 0] },
          }}
          onMouseEnter={
            popup &&
            (e => {
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
  ));

const Subheader = ({ links, query }) => {
  const [mobileOpened, setMobileOpened] = useState(false);
  const [popupState, setPopupState] = useState({ show: false });
  return (
    <Container
      as="header"
      sx={{
        position: [mobileOpened ? 'fixed' : 'initial', 'initial'],
      }}
    >
      <Flex
        sx={{
          alignItems: 'center',
          justifyContent: 'flex-end',
          mb: [2, 4],
        }}
      >
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
            <NavLinks
              {...{
                mobileOpened,
                setMobileOpened,
                setPopupState,
                links,
                query,
              }}
            />
            <MenuPopup setState={setPopupState} state={popupState} />
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
  );
};

export default Subheader;
