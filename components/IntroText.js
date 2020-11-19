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
import Link from 'next/link';
import { InlineForm, InlineText, InlineTextarea } from 'react-tinacms-inline';
import { Icon } from '@makerdao/dai-ui-icons';

const IntroText = () => {
  return (
    <Container>
      <Flex
        sx={{
          alignItems: 'center',
        }}
      >
        <Heading
          variant="largeHeading"
          pb="4"
          sx={{
            minWidth: 400,
          }}
        >
          About <br />
          Maker Protocol
        </Heading>

        <Heading
          sx={{
            pb: 4,
          }}
        >
          <InlineTextarea name="aboutSubheading" />
        </Heading>
      </Flex>
      <Text
        sx={{
          pb: 4,
          color: 'onBackgroundMuted',
          columns: '2 200px',
        }}
      >
        The Maker Foundation and the MakerDAO community believe that a decentralized stablecoin is
        required to have any business or individual realize the advantages of digital money. Second,
        there is MKR, a governance token that is used by stakeholders to maintain the system and
        manage Dai. MKR token holders are the decision-makers of the Maker Protocol, supported by
        the larger public community and various other external parties. Maker is unlocking the power
        of decentralized finance for everyone by creating an inclusive platform for economic
        empowerment; enabling everyone with equal access to the global financial marketplace.
      </Text>

      <Link href="/technology">
        <Flex sx={{ alignItems: 'center' }}>
          <Icon sx={{ mr: 2 }} color="primary" name={'arrow_right'}></Icon>
          <Text sx={{ cursor: 'pointer' }}>Learn more about the technology.</Text>
        </Flex>
      </Link>
    </Container>
  );
};

export default IntroText;
