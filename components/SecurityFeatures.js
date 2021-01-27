/** @jsx jsx */
import { jsx, Container, Heading, Text, Flex } from 'theme-ui';
import Link from 'next/link';
import { Icon } from '@makerdao/dai-ui-icons';
import { InlineTextarea } from 'react-tinacms-inline';

const SecurityFeatures = () => {
  return (
    <Container>
      <Flex
        sx={{
          flexDirection: 'column',
        }}
      >
        <Heading variant="largeHeading">Security Features</Heading>
        <Flex
          sx={{
            alignItems: 'center',
            mt: 4,
            flexWrap: 'wrap',
          }}
        >
          <Icon color="textMuted" name="security" size={7} sx={{ ml: 4 }} />
          <Flex sx={{ flexDirection: 'column', width: ['100%', '66%'], p: 5, ml: 4 }}>
            <Heading variant="mediumHeading" sx={{ pb: 3 }}>
              Security details
            </Heading>
            <Text sx={{ pb: 3, fontSize: 5 }}>
              <InlineTextarea name="securitySubtext" />
            </Text>
            <Link href="/security">
              <Flex sx={{ alignItems: 'center' }}>
                <Icon sx={{ mr: 2 }} color="primary" name={'arrow_right'}></Icon>
                <Text sx={{ cursor: 'pointer' }}>Learn more about Security</Text>
              </Flex>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};

export default SecurityFeatures;
