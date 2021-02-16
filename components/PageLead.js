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
import { InlineText, InlineTextarea } from 'react-tinacms-inline';
import Link from 'next/link';
import { Icon } from '@makerdao/dai-ui-icons';

const PageLead = ({ cta }) => {
  return (
    <Container>
      <Flex sx={{ py: [4, 6], flexDirection: 'column' }}>
        <Heading variant="megaHeading">
          <InlineText name="primaryNavHeader" />
        </Heading>
        <Heading sx={{ color: 'onBackgroundMuted' }} variant="megaHeading">
          <InlineText name="secondaryNavHeader" />
        </Heading>
        <Flex sx={{ flexDirection: 'column', pl: [5, 7], mt: 3, width: ['100%', '75%'] }}>
          <Text
            className="subtext"
            sx={{
              color: 'onBackgroundMuted',
              mb: 2,
            }}
          >
            <InlineText name="subtext" />
          </Text>
          <Link href="/technology">
            <Flex sx={{ alignItems: 'center' }}>
              <Icon sx={{ mr: 2 }} color="primary" name={'arrow_right'}></Icon>
              <Text sx={{ cursor: 'pointer' }}>{cta}</Text>
            </Flex>
          </Link>
        </Flex>
      </Flex>
    </Container>
  );
};

export default PageLead;
