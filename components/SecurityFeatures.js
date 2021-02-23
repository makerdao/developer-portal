/** @jsx jsx */
import { jsx, Container, Heading, Text, Flex, Grid } from 'theme-ui';
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
            mt: 5,
          }}
        >
          <Grid columns={[1, '1fr 2fr']}>
            <Icon color="textMuted" name="security" size={7} sx={{ ml: 4 }} />
            <Flex
              sx={{
                flexDirection: 'column',
                width: ['100%', '80%', '100%'],
                p: 0,
                ml: [0, 5, 0],
              }}
            >
              <Heading variant="mediumHeading" sx={{ pb: 3 }}>
                Security details
              </Heading>
              <Text sx={{ pb: 3, fontSize: [4, 5], color: 'onBackgroundMuted' }}>
                <InlineTextarea name="securitySubtext" />
              </Text>
              <Link href="/security">
                <Flex sx={{ alignItems: 'center' }}>
                  <Icon sx={{ mr: 2 }} color="primary" name={'arrow_right'}></Icon>
                  <Text sx={{ cursor: 'pointer' }}>Learn more about Security</Text>
                </Flex>
              </Link>
            </Flex>
          </Grid>
        </Flex>
      </Flex>
    </Container>
  );
};

export default SecurityFeatures;
