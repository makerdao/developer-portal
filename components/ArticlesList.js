/** @jsx jsx */
import { jsx, Card, Heading, Text, Container, Flex, Grid } from 'theme-ui';
import Link from 'next/link';
import { Icon } from '@makerdao/dai-ui-icons';

const ListItem = ({ title, type, link, linkText, description }) => (
  <Card px={4}>
    <Link href={link} passHref>
      <Grid columns={'1fr 1fr auto'}>
        <Flex sx={{ flexDirection: 'column' }}>
          <Heading variant="microHeading">{title}</Heading>
          <Text>{description}</Text>
        </Flex>

        <Flex sx={{ alignItems: 'center' }}>
          <Text>{type}</Text>
        </Flex>

        <Flex sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
          <Text sx={{ variant: 'smallText' }} pr={2}>
            {linkText}
          </Text>
          <Icon name="increase" />
        </Flex>
      </Grid>
    </Link>
  </Card>
);

const ArticlesList = ({ resources, title, path }) => {
  // console.log(resources, 'lere');
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
                frontmatter: { parent, title, slug, description },
              },
            }) => {
              return (
                <ListItem
                  key={title}
                  title={title}
                  type={parent}
                  description={description}
                  link={`/${path}/${slug}/`}
                  linkText={'Read'}
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
