/** @jsx jsx */
import { Container, jsx, NavLink, Flex, Box } from 'theme-ui';
import Link from 'next/link';

const Subheader = ({ links, query }) => {
  return (
    <Box
      sx={{
        border: 'light',
        borderColor: 'onBackgroundMuted',
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
          {links.map(({ name, url }) => (
            <Link href={{ pathname: url, query }} passHref key={name}>
              <NavLink
                sx={{
                  minWidth: 'max-content',
                  pl: 2,
                  pr: 4,
                  '&:first-child': { pl: 0 },
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

export default Subheader;
