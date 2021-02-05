/** @jsx jsx */
import { useEffect, useState } from 'react';
import { jsx, Box, Container, Link as ThemeLink, NavLink, Flex, IconButton } from 'theme-ui';
import Link from 'next/link';
import { Icon } from '@makerdao/dai-ui-icons';
import Banners from '@components/Banners';

const LINKS = [
  { url: '/documentation', name: 'Documentation' },
  { url: '/guides', name: 'Guides' },
  { url: '/security', name: 'Security' },
];

const MobileMenu = ({ close, query }) => {
  return (
    <Container
      sx={{
        bg: 'background',
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        zIndex: 1,
        pt: 4,
      }}
    >
      <Flex sx={{ justifyContent: 'flex-end', mb: 0 }}>
        <IconButton sx={{ cursor: 'pointer', pt: 3 }}>
          <Icon
            name="dp_close"
            size="auto"
            color="text"
            sx={{
              cursor: 'pointer',
              height: 20,
              width: 20,
            }}
            onClick={close}
          />
        </IconButton>
      </Flex>
      <Flex as="nav" sx={{ flexDirection: 'column', alignItems: 'center' }}>
        {LINKS.map(({ name, url }) => (
          <Link href={{ pathname: url, query }} passHref key={name}>
            <NavLink
              key={name}
              sx={{
                py: 4,
              }}
              variant="links.mobileNav"
            >
              {name}
            </NavLink>
          </Link>
        ))}
      </Flex>
    </Container>
  );
};

const Header = ({ query, subnav, bannerData, mobile, router }) => {
  const [mobileOpened, setMobileOpened] = useState(false);

  useEffect(() => {
    setMobileOpened(false);
  }, [router?.asPath]);
  return (
    <Box sx={{ width: '100%', position: [mobileOpened ? 'fixed' : 'initial', 'initial'] }}>
      {mobileOpened ? (
        <MobileMenu close={() => setMobileOpened(false)} />
      ) : (
        <>
          <Banners bannerData={bannerData} mobile={mobile} />
          <Container as="header" mt={[0, 2]} sx={{ bg: 'background' }}>
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
                          display: ['none', 'block'],
                          pr: 4,
                          '&:last-child': { pr: [null, 0] },
                        }}
                        variant="links.nav"
                      >
                        {name}
                      </NavLink>
                    </Link>
                  ))}
                </Flex>
                <IconButton sx={{ display: ['block', 'none'], cursor: 'pointer' }}>
                  <Icon
                    name="dp_menu"
                    size="auto"
                    color="text"
                    sx={{
                      height: 24,
                      width: 19,
                    }}
                    onClick={() => setMobileOpened(!mobileOpened)}
                  />
                </IconButton>
              </Flex>
            </Flex>
          </Container>
        </>
      )}
      {subnav ?? null}
    </Box>
  );
};

export default Header;
