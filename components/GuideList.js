/** @jsx jsx */
import { jsx, Heading, Text, Box, Flex, Grid, Container, Card, Link as ThemeLink } from 'theme-ui';
import Link from 'next/link';
import { Icon } from '@makerdao/dai-ui-icons';
import Dropdown from '@components/Dropdown';

const GuideList = ({ guides, title, path, options, selected, setSelected }) => {
  const singleRow = guides.length < 5;
  return (
    <Flex>
      <Box sx={{ minWidth: '100vw' }}>
        <Container>
          <Flex
            sx={{
              alignItems: 'center',
            }}
          >
            <Heading sx={{ pb: 1 }} variant="mediumHeading">
              {title}
            </Heading>
            <Dropdown
              sx={{ variant: 'text.mediumHeading' }}
              options={options}
              activeGroup={selected}
              onChange={setSelected}
            />
            <Link href={'/guides'} passHref>
              <Flex sx={{ ml: 'auto', alignItems: 'center' }}>
                <Icon sx={{ mr: 2 }} color="primary" name={'arrow_right'}></Icon>
                <ThemeLink sx={{ color: 'text', cursor: 'pointer' }}>View All</ThemeLink>
              </Flex>
            </Link>
          </Flex>
        </Container>
        <Grid
          sx={{
            gridAutoFlow: 'column',
            gridTemplateRows: singleRow ? 'auto' : 'auto auto',
            overflowX: 'auto',
            // pl: singleRow ? undefined : 'calc(50% - 1140px / 2)',
          }}
        >
          {guides.map(
            (
              {
                data: {
                  frontmatter: { title, description, slug },
                },
              },
              i
            ) => {
              return (
                <Card
                  key={slug}
                  sx={{
                    bg: 'background',
                    width: 8,
                    height: 7,
                    border: 'light',
                    borderColor: 'muted',
                    p: 4,
                    '&:hover': {
                      borderColor: 'primary',
                    },
                    ':nth-of-type(2n)': {
                      transform: singleRow ? undefined : 'translateX(-50%)',
                    },
                  }}
                >
                  <Grid columns={['80px auto']} sx={{ height: '100%', p: 0 }}>
                    <Flex>
                      <Icon name="stamp_1" size={5}></Icon>
                    </Flex>
                    <Link key={title} href={`/${path}/${slug}/`}>
                      <Flex
                        sx={{
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          height: '100%',
                        }}
                      >
                        <Flex sx={{ flexDirection: 'column' }}>
                          <Heading as="a" sx={{ cursor: 'pointer', mb: 2 }}>
                            {title}
                          </Heading>
                          <Text>{description}</Text>
                        </Flex>
                        <Flex
                          sx={{
                            alignItems: 'center',
                            gridColumnStart: 2,
                          }}
                        >
                          <Icon color="primary" sx={{ mr: 2 }} name={'arrow_right'}></Icon>
                          <ThemeLink sx={{ color: 'text', cursor: 'pointer' }}>Read</ThemeLink>
                        </Flex>
                      </Flex>
                    </Link>
                  </Grid>
                </Card>
              );
            }
          )}
        </Grid>
      </Box>
    </Flex>
  );
};

export default GuideList;
