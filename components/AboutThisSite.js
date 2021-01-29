import { Container, Box, Heading, Text, Flex } from 'theme-ui';
import EditLink from '../components/EditLink';
import { InlineTextarea } from 'react-tinacms-inline';

const AboutThisSite = () => {
  return (
    <Container>
      <Flex
        sx={{
          pb: 3,
          flexWrap: 'wrap',
        }}
      >
        <Box
          sx={{
            maxWidth: ['100%', '60%'],
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
            ml: [0, 'auto'],
            px: [0, 4],
            py: 4,
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
