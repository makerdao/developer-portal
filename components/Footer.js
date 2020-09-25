/** @jsx jsx */
import { jsx, Grid, Flex, NavLink, Text, Container } from 'theme-ui';
import Link from 'next/link';
import footerContent from '../data/footer.json';
import EmailSignup from './EmailSignup';

const Footer = () => {
  return (
    <Container as="footer">
      <Flex sx={{ justifyContent: 'space-between' }}>
        {footerContent.map(({ title, items }) => {
          return (
            <Grid as="nav" sx={{ GridDirection: 'column' }} key={title}>
              <Text sx={{ fontWeight: 'heading', fontFamily: 'heading' }}>{title}</Text>
              {items.map(({ name }) => {
                return (
                  <Text
                    sx={{
                      fontFamily: 'heading',
                    }}
                    key={name}
                  >
                    {name}
                  </Text>
                );
              })}
            </Grid>
          );
        })}
        <Flex sx={{ flexDirection: 'column' }}>
          <Text sx={{ fontWeight: 'heading', fontFamily: 'heading' }}>
            Signup for our newsletter
          </Text>
          <EmailSignup placeholder="Enter your email address" />
        </Flex>
      </Flex>
    </Container>
  );
};

export default Footer;
