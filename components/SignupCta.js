/** @jsx jsx */
import { jsx, Card, Heading, Text, Box, Flex, Grid, Container } from 'theme-ui';
import EmailSignup from '../components/EmailSignup';

const SignupCta = () => {
  const placeholder = 'We saved a slot for your email';
  return (
    <Container>
      <Grid columns={2} sx={{ mb: 6, mx: 5 }}>
        <Box sx={{ p: 5 }}>
          <Heading variant="largeHeading">
            Want Maker dev updates dripping into your mailbox?
          </Heading>
        </Box>
        <Flex sx={{ justifyContent: 'center', alignItems: 'center' }}>
          <EmailSignup placeholder={placeholder} />
        </Flex>
      </Grid>
    </Container>
  );
};

export default SignupCta;
