/** @jsx jsx */
import { Container, jsx, NavLink, Flex, Box } from 'theme-ui';
import Link from 'next/link';
import useStore from '../stores/store';

const SubNav = ({ links, query }) => {
  const activeGroup = useStore((state) => state.activeGroup);
  return (
    <Box
      sx={{
        border: 'light',
        borderColor: 'mutedAlt',
        borderWidth: '1px 0 1px 0',
        '::-webkit-scrollbar': {
          width: '0px',
        },
        scrollbarWidth: 'none',
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
          {links.map(({ name, url, slug }) => (
            <Link href={{ pathname: url, query }} passHref key={name}>
              <NavLink
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
