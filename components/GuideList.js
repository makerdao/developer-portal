/** @jsx jsx */
import { jsx, Card, Heading, Text, Box, Flex, Grid, Container } from 'theme-ui';
import Link from 'next/link';

const GuideList = ({ guides, title = 'Guides', cta = '→ View All', module = 'governance' }) => {
  guides = [...guides, ...guides];
  return (
    <Container>
      <Flex>
        <Box>
          <Flex>
            <Heading>{title}</Heading>
            <Text>{cta}</Text>
          </Flex>

          <Grid columns={[2, 4]}>
            {guides.map(
              ({
                data: {
                  frontmatter: { parent, title, slug },
                },
              }) => {
                return (
                  <Grid
                    key={title}
                    sx={{
                      mr: 3,
                    }}
                  >
                    <Flex sx={{ flexDirection: 'column' }}>
                      <Box sx={{ height: 6, border: 'light' }}></Box>
                      <Text variant="caps">{module}</Text>
                    </Flex>

                    <Link key={title} href={`/guides/${slug}/`}>
                      <Heading as="a" sx={{ cursor: 'pointer' }}>
                        {title}
                      </Heading>
                    </Link>
                  </Grid>
                );
              }
            )}
          </Grid>
        </Box>
      </Flex>
    </Container>
  );
};

export default GuideList;
