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
import Portal from './Portal';

const LINKS = [
  { url: '/', name: 'Technology' },
  { url: '/', name: 'Modules' },
  { url: '/resources/guides/tutorials', name: 'Resources' },
  { url: '/contribute', name: 'Contribute' },
];

// const NavLinks = ({ setOpened, show, query }) =>
//   LINKS.map(({ url, name }) => (
//     <Link href={{ pathname: url, query }} passHref key={url}>
//       <>
//         <NavLink
//           sx={{ '&:last-child': { pr: [null, 0] } }}
//           onClick={() => setOpened(false)}
//           variant="links.nav"
//         >
//           {name}
//         </NavLink>
//         <Bubble show={show} />
//       </>
//     </Link>
//   ));

const Bubble = ({ setState, state }) => {
  const { show, left, top } = state;
  return show ? (
    <Portal selector="#portal">
      <Card
        onMouseLeave={() => setState({ ...state, show: false })}
        sx={{
          top: top,
          left: left,
          width: 7,
          zIndex: 100,
          position: 'fixed',
        }}
      >
        <Grid columns={['1fr 1fr']}>
          {[
            'first',
            'second',
            'third',
            'fourth',
            'fifth',
            'sixth',
            'seventh',
            'eighth',
          ].map(link => {
            return <Text key={link}>{link}</Text>;
          })}
        </Grid>
      </Card>
    </Portal>
  ) : null;
};

const NavLinks = ({ setPopupState }) =>
  LINKS.map(({ name, offset }) => (
    <>
      <NavLink
        sx={{ '&:last-child': { pr: [null, 0] } }}
        onClick={e => {
          const targetRect = e.target.getBoundingClientRect();
          setPopupState({
            name,
            offset,
            show: true,
            left: targetRect.left - targetRect.width / 2,
            top: targetRect.bottom,
          });
        }}
        variant="links.nav"
      >
        {name}
      </NavLink>
    </>
  ));

const Header = ({ query }) => {
  const [opened, setOpened] = useState(false);
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
            <NavLinks {...{ setOpened, setPopupState, query }} />
            <Bubble setState={setPopupState} state={popupState} />
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
        </Flex>
      </Flex>
    </Container>
  );
};

export default Header;
