/** @jsx jsx */
import { Container, jsx, NavLink, Flex, Box } from 'theme-ui';
import Link from 'next/link';

const Subheader = ({ links, query }) => {
  return (
    <Box
      sx={{
        border: 'solid',
        borderColor: 'onBackgroundMuted',
        borderWidth: '1px 0 1px 0',
      }}
    >
      <Container sx={{ px: 0, mt: 2 }}>
        <Flex
          as="nav"
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3,
            mr: 0,
          }}
        >
          {links.map(({ name, url }) => (
            <Link href={{ pathname: url, query }} passHref key={name}>
              <NavLink
                sx={{
                  '&:last-child': { pr: 0 },
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
