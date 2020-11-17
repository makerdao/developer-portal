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
            To support the self-sustaining maker vision we want this site to be maintainable
            long-term by the community, so facilitating easy maintenance and upkeep is a priority.
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
        We want to encourage contributors and reduce the friction of making contributions. One of
        the exciting features we built into the site is using a tool called TinaCMS for content
        management. TinaCMS is a an open source content management framework that provides us with
        some flexible features to help ensure ease of maintainability in the future. Using this
        system, we enable the superpower of allowing contributors to create and edit content simply
        by pressing a button on the site. This feature, called "visual open authoring" provides an
        inline editor to make changes on the site itself. Because the site content is fetched from
        Github it requires no additional backend.
      </Text>
    </Container>
  );
};

export default AboutThisSite;
