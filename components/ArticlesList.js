/** @jsx jsx */
import { jsx, Card, Heading, Text, Container, Flex, Grid } from 'theme-ui';
import Link from 'next/link';
import { Icon } from '@makerdao/dai-ui-icons';

export const articles = [
  { title: 'title', author: 'author', link: 'www.com', linkText: 'linktext' },
  { title: 'title', author: 'author', link: 'www.com', linkText: 'linktext' },
  { title: 'title', author: 'author', link: 'www.com', linkText: 'linktext' },
  { title: 'title', author: 'author', link: 'www.com', linkText: 'linktext' },
];

const ListItem = ({ title, author, link, linkText }) => (
  <Card px={4}>
    <Grid columns={3}>
      <Flex sx={{ flexDirection: 'column' }}>
        <Heading variant="smallHeader">{title}</Heading>
        <Text variant="smallText">by {author}</Text>
      </Flex>
      <Link href={link}>
        <Flex sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
          <Text sx={{ fontFamily: 'heading', fontSize: [4, 5], mr: 2 }}>{linkText}</Text>
        </Flex>
      </Link>
      <Flex sx={{ alignItems: 'center' }}>
        <Icon sx={{ ml: 'auto' }} name="increase" />
      </Flex>
    </Grid>
  </Card>
);

const ArticlesList = ({ title = 'Articles', cta = '→ View All' }) => {
  return (
    <Container>
      <Flex
        sx={{
          flexDirection: 'column',
          mb: 6,
        }}
      >
        <Flex>
          <Heading>{title}</Heading>
          <Text>{cta}</Text>
        </Flex>
        <Grid sx={{ width: '100%' }}>
          {articles.map(({ title, author, link, linkText }) => {
            return (
              <ListItem key={title} title={title} author={author} link={link} linkText={linkText} />
            );
          })}
        </Grid>
      </Flex>
    </Container>
  );
};

export default ArticlesList;
