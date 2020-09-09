/** @jsx jsx */
import { jsx, Card, Heading, Text, Box, Flex, Grid, Container, Input } from 'theme-ui';

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
    { title: 'Join our dev community', link: '', text: 'Join our chat' },
    { title: 'Join the conversation', link: '', text: 'Join our forum' },
    { title: 'Be a contributor', link: '', text: 'Github' },
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
                  <Text sx={{ color: 'background' }}>→ {text}</Text>
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
