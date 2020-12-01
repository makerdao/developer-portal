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
        <InlineTextarea name="aboutMakerProtocol" />
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
