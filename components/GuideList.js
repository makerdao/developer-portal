/** @jsx jsx */
import { useState } from 'react';
import {
  Container,
  jsx,
  Card,
  Heading,
  Text,
  Grid,
  Box,
  Flex,
  Image,
} from 'theme-ui';
import useResourceStore from 'stores/store';

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
          {guides.map(({ frontMatter: { title } }) => {
            return (
              <Card
                key={title}
                sx={{
                  mr: 3,
                }}
              >
                <Heading>{title}</Heading>
                <Text>description</Text>
              </Card>
            );
          })}
        </Flex>
      </Box>
    </Flex>
  );
};

export default GuideList;
