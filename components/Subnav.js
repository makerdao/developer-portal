/** @jsx jsx */
import { Container, jsx, NavLink, Flex } from 'theme-ui';
import Link from 'next/link';

const Subheader = ({ links, query }) => {
  return (
    <Container sx={{ px: 0 }}>
      <Flex
        as="nav"
        sx={{
          alignItems: 'center',
          justifyContent: 'flex-end',
          mb: [2, 4],
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
  );
};

export default Subheader;
