import {
  Container,
  jsx,
  Card,
  Box,
  Button,
  Heading,
  Text,
  Grid,
  Flex,
  Link as ThemeLink,
} from 'theme-ui';
import EditLink from '../components/EditLink';
import { InlineForm, InlineText, InlineTextarea } from 'react-tinacms-inline';

const AboutThisSite = () => {
  return (
    <Container>
      <Flex
        sx={{
          pb: 3,
        }}
      >
        <Box
          sx={{
            maxWidth: '60%',
          }}
        >
          <Heading variant="largeHeading" pb={3}>
            About this site
          </Heading>

          <Text>
            <InlineTextarea name="aboutThisSiteSubheading" />
          </Text>
        </Box>
        <Box
          sx={{
            ml: 'auto',
            p: 4,
          }}
        >
          <EditLink />
        </Box>
      </Flex>
      <Text
        sx={{
          pb: 4,
          color: 'onBackgroundMuted',
          columns: '2 200px',
        }}
      >
        <InlineTextarea name="aboutThisSiteSubtext" />
      </Text>
    </Container>
  );
};

export default AboutThisSite;
