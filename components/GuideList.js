/** @jsx jsx */
import { jsx, Card, Heading, Text, Box, Flex, Grid, Container } from 'theme-ui';
import Link from 'next/link';

const GuideList = ({ guides, title, smallText, columns = [2, 3], path }) => {
  return (
    <Container>
      <Flex sx={{ mb: 6 }}>
        <Box>
          <Flex sx={{ mb: 3 }}>
            <Heading>{title}</Heading>
          </Flex>

          <Grid columns={columns}>
            {guides.map(
              ({
                data: {
                  frontmatter: { title, description, slug },
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
                      {smallText && <Text variant="caps">{smallText}</Text>}
                    </Flex>

                    <Link key={title} href={`/${path}/${slug}/`}>
                      <Flex sx={{ flexDirection: 'column' }}>
                        <Heading as="a" sx={{ cursor: 'pointer' }}>
                          {title}
                        </Heading>
                        <Text>{description}</Text>
                      </Flex>
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
