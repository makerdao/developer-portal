/** @jsx jsx */
import { jsx, Card, Heading, Text, Box, Flex } from 'theme-ui';
import Link from 'next/link';

const GuideList = ({ guides, title = 'Guides', subtitle = 'See our featured guides' }) => {
  return (
    <Flex
      sx={{
        mb: 6,
      }}
    >
      <Box>
        <Heading>{title}</Heading>
        <Text>{subtitle}</Text>
        <Flex>
          {guides.map(
            ({
              data: {
                frontmatter: { title, slug, description },
              },
            }) => {
              return (
                <Card
                  key={title}
                  sx={{
                    mr: 3,
                  }}
                >
                  <Link key={title} href={`/guides/${slug}/`}>
                    <Heading as="a" sx={{ cursor: 'pointer' }}>
                      {title}
                    </Heading>
                  </Link>
                  <Text>{description}</Text>
                </Card>
              );
            }
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

export default GuideList;
