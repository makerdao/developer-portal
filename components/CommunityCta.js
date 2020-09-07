/** @jsx jsx */
import { jsx, Card, Heading, Text, Box, Flex, Grid, Container } from 'theme-ui';

const ctaContent = [
  { title: 'Join our dev community', link: '', text: 'Join our chat' },
  { title: 'Join the conversation', link: '', text: 'Join our forum' },
  { title: 'Be a contributor', link: '', text: 'Github' },
];

const CommunityCta = () => {
  return (
    <Container>
      <Card sx={{ mb: 6 }}>
        <Flex sx={{ p: 4, flexDirection: 'column' }}>
          <Flex sx={{ mb: 4, justifyContent: 'center' }}>
            <Heading variant="mediumHeading">Join the Developer Community</Heading>
          </Flex>
          <Grid columns={3}>
            {ctaContent.map(({ title, link, text }) => (
              <Card sx={{ p: 4, bg: 'onBackground' }} key={title}>
                <Grid>
                  <Heading sx={{ color: 'background' }}>{title}</Heading>
                  <Text sx={{ color: 'background' }}>{text}</Text>
                </Grid>
              </Card>
            ))}
          </Grid>
        </Flex>
      </Card>
    </Container>
  );
};

export default CommunityCta;
