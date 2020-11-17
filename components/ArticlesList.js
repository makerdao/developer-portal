/** @jsx jsx */
import { jsx, Card, Heading, Text, Container, Flex, Grid } from 'theme-ui';
import Link from 'next/link';
import { Icon } from '@makerdao/dai-ui-icons';
import { useBreakpointIndex } from '@theme-ui/match-media';

const ListItem = ({ title, type, link, linkText, description, isMobile }) => {
  return (
    <Card px={4}>
      <Link href={link} passHref>
        <Grid columns={['1fr auto', '1fr 1fr auto']}>
          <Flex sx={{ flexDirection: 'column' }}>
            <Heading sx={{ cursor: 'pointer' }} variant="microHeading">
              {title}
            </Heading>
            <Text sx={{ cursor: 'pointer' }}>{description}</Text>
          </Flex>

          {!isMobile && (
            <Flex sx={{ alignItems: 'center' }}>
              <Text>{type}</Text>
            </Flex>
          )}

          <Flex sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
            <Text sx={{ variant: 'smallText', cursor: 'pointer' }} pr={2}>
              {linkText}
            </Text>
            <Icon name="increase" />
          </Flex>
        </Grid>
      </Link>
    </Card>
  );
};

const ArticlesList = ({ resources, title, path }) => {
  const bpi = useBreakpointIndex({ defaultIndex: 2 });
  return (
    <Container>
      <Flex
        sx={{
          flexDirection: 'column',
        }}
      >
        <Flex
          sx={{
            pb: 4,
            alignItems: 'center',
          }}
        >
          <Heading pr={3}>{title}</Heading>
        </Flex>
        <Grid sx={{ width: '100%' }}>
          {resources.map(
            ({
              data: {
                frontmatter: { group, title, slug, description },
              },
            }) => {
              return (
                <ListItem
                  key={title}
                  title={title}
                  type={group}
                  description={description}
                  link={`/${path}/${slug}/`}
                  linkText={'Read'}
                  isMobile={bpi === 0}
                />
              );
            }
          )}
        </Grid>
      </Flex>
    </Container>
  );
};

export default ArticlesList;
