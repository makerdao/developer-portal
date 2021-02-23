import { Container, Box, Heading, Text, Flex, Grid, Link as ThemeLink } from 'theme-ui';
import EditLink from '../components/EditLink';
import { InlineTextarea } from 'react-tinacms-inline';
import { Icon } from '@makerdao/dai-ui-icons';

const AboutThisSite = () => {
  return (
    <Container>
      <Grid columns={[1, 2]}>
        <Flex sx={{ flexDirection: 'column', alignSelf: 'end' }}>
          <Heading
            variant="megaHeading"
            sx={{
              color: 'onBackgroundMuted',
            }}
          >
            About
          </Heading>
          <Heading variant="megaHeading">This Site</Heading>
        </Flex>
        <Heading sx={{ alignSelf: 'end', pb: 3 }}>
          <InlineTextarea name="aboutThisSiteSubheading" />
        </Heading>
      </Grid>
      <Flex>
        <Text
          sx={{
            py: [0, 4],
            color: 'onBackgroundMuted',
            columns: '2 200px',
          }}
        >
          <InlineTextarea name="aboutThisSiteSubtext" />
        </Text>
      </Flex>
      <Flex sx={{ width: '100%', justifyContent: 'center' }}>
        <Flex sx={{ flexDirection: 'column', pt: 2, justifyContent: 'center' }}>
          <Box
            sx={{
              ml: [0, 'auto'],
              px: [0, 4],
              py: [3, 3, 4],
            }}
          >
            <EditLink />
          </Box>
          <ThemeLink href={'/'} target="_blank">
            <Flex sx={{ alignItems: 'center', justifyContent: 'center' }}>
              <Icon sx={{ mr: 2 }} color="primary" name="github"></Icon>
              <Text sx={{ color: 'text', cursor: 'pointer' }}>Edit on Github</Text>
            </Flex>
          </ThemeLink>
        </Flex>
      </Flex>
    </Container>
  );
};

export default AboutThisSite;
