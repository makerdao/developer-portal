/** @jsx jsx */
import { jsx, Card, Heading, Text, Box, Flex } from 'theme-ui';
import Link from 'next/link';

const DocumentationList = ({ docs }) => {
  return (
    <Flex
      sx={{
        mb: 6,
      }}
    >
      <Box>
        <Heading>API Documentation</Heading>
        <Box>
          {docs.map(({ frontMatter: { title, slug, parent } }) => {
            return (
              <Box
                key={title}
                sx={{
                  mt: 3,
                }}
              >
                <Link key={title} href={`${parent}/docs/${slug}/`}>
                  <Text as="a">{title} -> </Text>
                </Link>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Flex>
  );
};

export default DocumentationList;
