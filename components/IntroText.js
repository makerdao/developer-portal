/** @jsx jsx */
import { Container, jsx, Heading, Text, Flex, Grid } from 'theme-ui';
import Link from 'next/link';
import EmailSignup from '@components/EmailSignup';
import { InlineTextarea } from 'react-tinacms-inline';
import { Icon } from '@makerdao/dai-ui-icons';

const IntroText = ({ mobile }) => {
  return (
    <Container>
      <Flex
        sx={{
          alignItems: 'center',
          flexWrap: mobile ? 'wrap' : 'nowrap',
        }}
      >
        <Flex pb="4" sx={{ width: '100%', flexDirection: 'column', minWidth: ['50vw', 600] }}>
          <Heading variant="megaHeading">About</Heading>
          <Heading
            variant="megaHeading"
            sx={{
              color: 'onBackgroundMuted',
            }}
          >
            The Protocol
          </Heading>
        </Flex>

        <Heading
          sx={{
            pb: 4,
            color: 'onBackgroundMuted',
          }}
        >
          <InlineTextarea name="aboutSubheading" />
        </Heading>
      </Flex>
      <Grid columns={[1, 2]}>
        <Flex sx={{ flexDirection: 'column', width: '100%' }}>
          <Text
            sx={{
              pb: 4,
              color: 'onBackgroundMuted',
            }}
          >
            <InlineTextarea name="aboutMakerProtocol" />
          </Text>
          <Link href="/documentation/introduction-to-the-maker-protocol">
            <Flex sx={{ alignItems: 'center', pb: [5, 0] }}>
              <Icon sx={{ mr: 2 }} color="primary" name={'arrow_right'}></Icon>
              <Text sx={{ cursor: 'pointer' }}>Learn more about the Maker Protocol.</Text>
            </Flex>
          </Link>
        </Flex>
        <Flex sx={{ px: 4, flexDirection: 'column' }}>
          <Heading sx={{ pb: 3 }}>
            Want Maker dev updates <br />
            dripping into your inbox?
          </Heading>
          <EmailSignup sx={{ fontSize: 5 }} placeholder="We saved a slot for your email" />
        </Flex>
      </Grid>
    </Container>
  );
};

export default IntroText;
