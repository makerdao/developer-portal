/** @jsx jsx */
import { jsx, Flex, NavLink, Container } from 'theme-ui';
import Link from 'next/link';

const Footer = () => {
  return (
    <Container>
      <Flex
        as="nav"
        sx={{
          ml: [0, 'auto'],
          mr: [null, 0],
          justifyContent: 'flex-end',
        }}
      >
        <NavLink
          href="https://chat.makerdao.com/channel/help"
          target="_blank"
          variant="footer"
          sx={{
            px: [2, 3],
          }}
        >
          Chat
        </NavLink>
        <NavLink
          href="https://forum.makerdao.com/c/devs/19"
          target="_blank"
          variant="footer"
          sx={{
            px: [2, 3],
          }}
        >
          Forums
        </NavLink>
      </Flex>
    </Container>
  );
};

export default Footer;
