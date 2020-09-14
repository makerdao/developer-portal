/** @jsx jsx */
import {
  jsx,
  Card,
  Heading,
  Text,
  Box,
  Flex,
  Grid,
  Container,
  Input,
  Link as ThemeLink,
} from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';

const NewsletterSignup = () => {
  const placeholder = 'We saved a slot for your email';
  return (
    <Grid
      columns={2}
      sx={{
        px: 6,
      }}
    >
      <Box>
        <Heading variant="microHeading">Want Maker dev updates dripping into your mailbox?</Heading>
      </Box>
      <Flex sx={{ justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ width: '100%' }}>
          <Input placeholder={placeholder}></Input>
        </Box>
      </Flex>
    </Grid>
  );
};

const CommunitySection = () => {
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
      <Card sx={{ mb: 6 }}>
        <Grid sx={{ p: 4, rowGap: 4 }}>
          <Flex sx={{ justifyContent: 'center' }}>
            <Heading variant="mediumHeading">Join the Developer Community</Heading>
          </Flex>

          <Grid columns={3}>
            {ctaContent.map(({ title, link, text }) => (
              <Card sx={{ p: 4, bg: 'onBackground' }} key={title}>
                <Grid>
                  <Heading sx={{ color: 'background' }} variant="microHeading">
                    {title}
                  </Heading>
                  <ThemeLink href={link} target="_blank">
                    <Flex sx={{ alignItems: 'center' }}>
                      <Text sx={{ color: 'background' }}>{text}</Text>
                      <Icon name="increase"></Icon>
                    </Flex>
                  </ThemeLink>
                </Grid>
              </Card>
            ))}
          </Grid>

          <NewsletterSignup />
        </Grid>
      </Card>
    </Container>
  );
};

export default CommunitySection;
