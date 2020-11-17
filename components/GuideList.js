/** @jsx jsx */
import { jsx, Heading, Text, Box, Flex, Grid, Container, Card, Link as ThemeLink } from 'theme-ui';
import Link from 'next/link';
import { Icon } from '@makerdao/dai-ui-icons';

const GuideList = ({ guides, title, columns = [2, 3], path }) => {
  return (
    // <Container>
    <Flex>
      <Box>
        <Container>
          <Flex sx={{ mb: 4, alignItems: 'center' }}>
            <Heading sx={{ textAlign: 'center', variant: 'text.largeHeading' }}>{title}</Heading>

            <Link href={'/guides'} passHref>
              <Flex sx={{ ml: 3, alignItems: 'center' }}>
                <Icon sx={{ mr: 2 }} color="primary" name={'arrow_right'}></Icon>
                <ThemeLink sx={{ color: 'text', cursor: 'pointer' }}>View All</ThemeLink>
              </Flex>
            </Link>
          </Flex>
        </Container>

        <Grid
          // columns={columns}
          sx={{
            gridAutoFlow: 'column',
            gridTemplateRows: 'auto auto',
            overflowX: 'auto',
            pl: 'calc(50% - 1140px / 2)',
            // left: '-500px',
          }}
        >
          {guides.map(
            (
              {
                data: {
                  frontmatter: { title, description, slug, group },
                },
              },
              i
            ) => {
              return (
                <Card
                  key={slug}
                  sx={{
                    flexDirection: 'column',
                    minWidth: 300,

                    // minHeight: i % 3 ? '60%' : '40%',
                    pr: 4,
                    pb: 5,
                    gridColumn: i % 4 ? 'span 2' : '',
                    '&:hover': {
                      bg: 'primary',
                    },
                    // gridRow: i % 7 ? 'span 3' : '',
                  }}
                >
                  <Flex sx={{ flexDirection: 'column', mb: 2 }}>
                    <Text variant="caps" sx={{ color: 'primary' }}>
                      {group}
                    </Text>
                  </Flex>

                  <Link key={title} href={`/${path}/${slug}/`}>
                    <Flex sx={{ flexDirection: 'column' }}>
                      <Heading as="a" sx={{ cursor: 'pointer', mb: 2 }}>
                        {title}
                      </Heading>
                      {/* <Text>{description}</Text> */}
                    </Flex>
                  </Link>
                </Card>
              );
            }
          )}
        </Grid>
      </Box>
    </Flex>
    // </Container>
  );
};

export default GuideList;
