/** @jsx jsx */
import { Container, Button, jsx, Input, Heading, Text, Grid, Flex, Card } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';
import { InlineText, InlineTextarea } from 'react-tinacms-inline';
import useEmailSubscribe from '../hooks/useEmailSubscribe';

const NewsletterCallout = () => {
  const { inputEl, subscribe, loading, success, errorMessage } = useEmailSubscribe();
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', pb: 6 }}>
      <Grid gap={3}>
        <Heading sx={{ display: 'flex', justifyContent: 'center' }} variant="mediumHeading">
          Want Maker dev updates dripping into your inbox?
        </Heading>
        <Flex sx={{ flexDirection: 'column', justifyContent: 'center' }}>
          <Text variant="plainText" sx={{ alignSelf: 'center' }}>
            <InlineTextarea name="devUpdatesSubtext1" />
          </Text>
          <Text sx={{ alignSelf: 'center', pb: 3 }} variant="plainText">
            <InlineTextarea name="devUpdatesSubtext2" />
          </Text>
        </Flex>
        {success ? (
          <Card sx={{ p: 4 }}>
            <Flex sx={{ flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
              <Flex
                sx={{
                  position: 'absolute',
                  top: '-50px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bg: 'primary',
                  size: '40px',
                  borderRadius: 'round',
                  mx: 2,
                }}
              >
                <Icon name="checkmark" size="3" />
              </Flex>
              <Text variant="plainText" sx={{ fontWeight: 'bold', fontSize: 4 }}>
                Thank you for signing up!
              </Text>
              <Text variant="plainText" sx={{ fontSize: 2 }}>
                Stay tuned, you will get dev updates soon.
              </Text>
            </Flex>
          </Card>
        ) : (
          <>
            <Flex sx={{ flexDirection: 'column' }}>
              <Flex sx={{ justifyContent: 'center' }}>
                <Input
                  aria-label="Email for newsletter"
                  ref={inputEl}
                  type="email"
                  placeholder="Email"
                  disabled={loading}
                  sx={{
                    fontFamily: 'heading',
                    fontSize: 5,
                    bg: 'onBackground',
                    borderColor: 'onBackground',
                    borderRadius: (theme) =>
                      `${theme.radii.small}px 0px 0px ${theme.radii.small}px`,
                    pl: 4,
                    '&:focus': {
                      color: 'background',
                    },
                  }}
                ></Input>
                <Button
                  disabled={loading}
                  onClick={subscribe}
                  sx={{
                    borderColor: 'primary',
                    borderRadius: (theme) =>
                      `0px ${theme.radii.small}px ${theme.radii.small}px 0px`,
                    py: 2,
                    width: 7,
                    fontSize: 5,
                  }}
                >
                  Sign up
                </Button>
              </Flex>
              {errorMessage && (
                <Text variant="plainText" sx={{ py: 2, px: 4, fontSize: 1, color: 'primary' }}>
                  {errorMessage}
                </Text>
              )}
            </Flex>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default NewsletterCallout;
