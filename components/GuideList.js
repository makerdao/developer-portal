/** @jsx jsx */
import { jsx, Card, Heading, Text, Box, Flex } from 'theme-ui';
import useResourceStore from 'stores/store';
import Link from 'next/link';

const GuideList = ({ topic }) => {
  const setGuidesByTag = useResourceStore(state => state.setGuidesByTag);
  setGuidesByTag(topic);
  const guides = useResourceStore(state => state.guides);

  return (
    <Flex
      sx={{
        mb: 6,
      }}
    >
      <Box>
        <Heading>Guides</Heading>
        <Text>text goes here</Text>
        <Flex>
          {guides.map(({ frontMatter: { title, slug, description } }) => {
            return (
              <Card
                key={title}
                sx={{
                  mr: 3,
                }}
              >
                <Link key={title} href={`/guides/${slug}/`}>
                  <Heading as="a">{title}</Heading>
                </Link>
                <Text>{description}</Text>
              </Card>
            );
          })}
        </Flex>
      </Box>
    </Flex>
  );
};

export default GuideList;
