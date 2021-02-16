/** @jsx jsx */
import { jsx, Card, Heading, Text, Flex, Grid, Container, Link as ThemeLink } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';
import { InlineTextarea } from 'react-tinacms-inline';

const CommunitySection = ({ mobile }) => {
  const ctaContent = [
    {
      title: 'Join our dev community',
      link: 'https://chat.makerdao.com/channel/dev',
      text: 'Join our chat',
    },
    {
      title: 'Join the conversation',
      link: 'https://forum.makerdao.com/c/devs/19',
      text: 'Join our forum',
    },
    {
      title: 'Be a contributor',
      link: 'https://github.com/makerdao/developer-portal',
      text: 'Github',
    },
  ];

  return (
    <Container>
      <Card sx={{ p: 0, display: 'flex', width: '100%', position: 'relative', zIndex: -1 }}>
        <Icon
          color="textMuted"
          name="tri_1"
          size="150px"
          sx={{
            position: 'absolute',
            top: '-70px',
            left: '60px',
            transform: mobile ? 'scale(0.5, 0.5)' : undefined,
          }}
        />
        <Icon
          color="textMuted"
          name="tri_2"
          size="250px"
          sx={{
            position: 'absolute',
            alignSelf: 'flex-end',
            right: '-20px',
            top: '-120px',
            transform: mobile ? 'scale(0.5, 0.5)' : undefined,
          }}
        />
        <Icon
          color="textMuted"
          name="tri_3"
          size="240px"
          sx={{
            position: 'absolute',
            left: '-130px',
            top: '240px',
          }}
        />
        <Icon
          color="textMuted"
          name="tri_4"
          size="90px"
          sx={{
            position: 'absolute',
            alignSelf: 'flex-end',
            right: '60px',
            bottom: '-50px',
          }}
        />
        <Grid sx={{ p: 4, rowGap: 4 }}>
          <Flex sx={{ justifyContent: 'center' }}>
            <Heading variant="largeHeading">Join the Developer Community</Heading>
          </Flex>

          <Grid columns={[1, 3]} sx={{ py: 4 }}>
            {ctaContent.map(({ title, link, text }) => (
              <Card sx={{ p: 4, bg: 'onBackground' }} key={title}>
                <Grid>
                  <Heading sx={{ color: 'background' }}>{title}</Heading>
                  <ThemeLink href={link} target="_blank">
                    <Flex sx={{ alignItems: 'center' }}>
                      <Icon name="increase"></Icon>
                      <Text variant="largeText" sx={{ color: 'background', px: 2 }}>
                        {text}
                      </Text>
                    </Flex>
                  </ThemeLink>
                </Grid>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Card>
      <Flex
        sx={{
          justifyContent: mobile ? 'space-between' : 'center',
          alignItems: 'center',
          px: [0, 4],
          py: [5, 4],
        }}
      >
        <Icon color="textMuted" name="smiley" size={6} />
        <Flex sx={{ width: '50%', p: [0, 4] }}>
          <Heading>
            <InlineTextarea name="communityCallout" />
          </Heading>
        </Flex>
      </Flex>
    </Container>
  );
};

export default CommunitySection;
