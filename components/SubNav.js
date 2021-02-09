/** @jsx jsx */
import { useMemo, createRef, useEffect } from 'react';
import { Container, jsx, NavLink, Flex, Box } from 'theme-ui';
import Link from 'next/link';
import useStore from '../stores/store';

const SubNav = ({ links, query, router }) => {
  const activeGroup = useStore((state) => state.activeGroup);
  const activeLink = links.find((link) => link.slug === activeGroup);
  const refs = useMemo(() => Array.from({ length: links.length }).map(() => createRef()), [
    links.length,
  ]);

  useEffect(() => {
    setTimeout(() => {
      const idx = links.indexOf(activeLink);
      refs[idx]?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }, 200);
  }, [activeLink, links, refs, router?.asPath]);

  return (
    <Box
      sx={{
        border: 'light',
        borderColor: 'muted',
        borderWidth: '1px 0 1px 0',
        '::-webkit-scrollbar': {
          width: '0px',
        },
        scrollbarWidth: 'none',
        bg: 'background',
      }}
    >
      <Container sx={{ mt: 2 }}>
        <Flex
          as="nav"
          sx={{
            alignItems: 'center',
            pb: 2,
            overflow: 'auto',
          }}
        >
          {links.map(({ name, url, slug }, i) => (
            <Link href={{ pathname: url, query }} passHref key={name}>
              <NavLink
                ref={refs[i]}
                sx={{
                  color: slug === activeGroup ? 'primary' : undefined,
                  minWidth: 'max-content',
                  pl: 2,
                  pr: 4,
                  '&:first-of-type': { pl: 0 },
                }}
              >
                {name}
              </NavLink>
            </Link>
          ))}
        </Flex>
      </Container>
    </Box>
  );
};

export default SubNav;
